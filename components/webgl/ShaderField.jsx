"use client";

import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle, Vec2, Vec3 } from "ogl";

/**
 * Full-bleed animated WebGL gradient field.
 * Flowing FBM noise blending ink → wine ash → turquoise, with a soft
 * pointer-reactive light. Used behind hero / CSR / vision sections.
 */
export default function ShaderField({
  className = "",
  colorA = [0.023, 0.023, 0.031], // ink
  colorB = [0.196, 0.16, 0.184], // wine ash
  colorC = [0.204, 0.89, 0.804], // turquoise
  speed = 0.16,
  intensity = 1,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const renderer = new Renderer({
      dpr: Math.min(window.devicePixelRatio, 1.75),
      alpha: true,
      antialias: true,
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    el.appendChild(gl.canvas);
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";
    gl.canvas.style.display = "block";

    const geometry = new Triangle(gl);

    const vertex = /* glsl */ `
      attribute vec2 uv;
      attribute vec2 position;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragment = /* glsl */ `
      precision highp float;
      varying vec2 vUv;
      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec2 uMouse;
      uniform vec3 uColorA;
      uniform vec3 uColorB;
      uniform vec3 uColorC;
      uniform float uIntensity;

      // hash + value noise
      vec2 hash22(vec2 p){
        p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
        return fract(sin(p) * 43758.5453) * 2.0 - 1.0;
      }
      float noise(vec2 p){
        vec2 i = floor(p); vec2 f = fract(p);
        vec2 u = f*f*(3.0-2.0*f);
        return mix(
          mix(dot(hash22(i+vec2(0.0,0.0)), f-vec2(0.0,0.0)),
              dot(hash22(i+vec2(1.0,0.0)), f-vec2(1.0,0.0)), u.x),
          mix(dot(hash22(i+vec2(0.0,1.0)), f-vec2(0.0,1.0)),
              dot(hash22(i+vec2(1.0,1.0)), f-vec2(1.0,1.0)), u.x), u.y);
      }
      float fbm(vec2 p){
        float v = 0.0; float a = 0.5;
        for(int i=0;i<5;i++){ v += a*noise(p); p *= 2.02; a *= 0.5; }
        return v;
      }

      void main(){
        vec2 uv = vUv;
        float aspect = uResolution.x / uResolution.y;
        vec2 p = uv; p.x *= aspect;

        float t = uTime;
        vec2 q = vec2(fbm(p + t*0.10), fbm(p + vec2(5.2,1.3) - t*0.08));
        vec2 r = vec2(fbm(p + q*1.6 + vec2(1.7,9.2) + t*0.06),
                      fbm(p + q*1.6 + vec2(8.3,2.8) - t*0.05));
        float f = fbm(p + r*1.4);
        f = smoothstep(-0.4, 0.9, f);

        // pointer light
        vec2 m = uMouse; m.x *= aspect;
        float d = distance(p, m);
        float light = smoothstep(0.85, 0.0, d);

        vec3 col = mix(uColorA, uColorB, clamp(f*1.25, 0.0, 1.0));
        float turqBand = smoothstep(0.55, 0.95, f + r.x*0.35);
        col = mix(col, uColorC, turqBand * 0.85 * uIntensity);
        col += uColorC * light * 0.22 * uIntensity;

        // subtle vignette
        float vig = smoothstep(1.25, 0.25, distance(uv, vec2(0.5)));
        col *= mix(0.7, 1.05, vig);

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new Vec2(1, 1) },
        uMouse: { value: new Vec2(0.5, 0.5) },
        uColorA: { value: new Vec3(...colorA) },
        uColorB: { value: new Vec3(...colorB) },
        uColorC: { value: new Vec3(...colorC) },
        uIntensity: { value: intensity },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = el;
      renderer.setSize(w, h);
      program.uniforms.uResolution.value.set(w, h);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    const target = new Vec2(0.5, 0.5);
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      target.set(
        (e.clientX - rect.left) / rect.width,
        1 - (e.clientY - rect.top) / rect.height
      );
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let raf;
    let visible = true;
    const io = new IntersectionObserver(
      ([entry]) => (visible = entry.isIntersecting),
      { threshold: 0 }
    );
    io.observe(el);

    const start = performance.now();
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      program.uniforms.uTime.value = ((performance.now() - start) / 1000) * speed;
      const mu = program.uniforms.uMouse.value;
      mu.x += (target.x - mu.x) * 0.05;
      mu.y += (target.y - mu.y) * 0.05;
      renderer.render({ scene: mesh });
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      el.contains(gl.canvas) && el.removeChild(gl.canvas);
      const ext = gl.getExtension("WEBGL_lose_context");
      ext && ext.loseContext();
    };
  }, [colorA, colorB, colorC, speed, intensity]);

  return <div ref={ref} className={className} aria-hidden="true" />;
}
