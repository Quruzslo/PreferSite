"use client";
import { useEffect, useRef, useCallback } from "react";

// --- GLSL Shaderek ---
const VERT = `
  attribute vec2 a_pos;
  varying vec2 v_uv;
  void main() {
    v_uv = vec2(a_pos.x * 0.5 + 0.5, 0.5 - a_pos.y * 0.5);
    gl_Position = vec4(a_pos, 0.0, 1.0);
  }
`;

const FRAG = `
  precision highp float;
  varying vec2 v_uv;
  uniform sampler2D u_from;
  uniform sampler2D u_to;
  uniform sampler2D u_disp;
  uniform float u_progress;
  uniform float u_intensity;
  
  uniform vec2 u_res;
  uniform vec2 u_imgRes;

  void main() {
    vec2 ratio = vec2(
      min((u_res.x / u_res.y) / (u_imgRes.x / u_imgRes.y), 1.0),
      min((u_res.y / u_res.x) / (u_imgRes.y / u_imgRes.x), 1.0)
    );
    vec2 cover_uv = vec2(
      v_uv.x * ratio.x + (1.0 - ratio.x) * 0.5,
      v_uv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );

    vec4 dv = texture2D(u_disp, v_uv);
    vec2 disp = vec2(dv.r - 0.5, dv.g - 0.5) * 2.0;

    float t = u_progress;
    float ease = t < 0.5 ? 4.0 * t * t * t : 1.0 - pow(-2.0 * t + 2.0, 3.0) / 2.0;
    float str = sin(ease * 3.14159265) * u_intensity;

    vec2 uv0 = clamp(cover_uv + disp * str, 0.0, 1.0);
    vec2 uv1 = clamp(cover_uv - disp * str, 0.0, 1.0);

    vec4 c0 = texture2D(u_from, uv0);
    vec4 c1 = texture2D(u_to,   uv1);

    gl_FragColor = mix(c0, c1, ease);
  }
`;

// --- Perlin Noise ---
const PERM = [
  151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140,
  36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234,
  75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237,
  149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48,
  27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105,
  92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73,
  209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86,
  164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38,
  147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189,
  28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101,
  155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232,
  178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12,
  191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31,
  181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254,
  138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215,
  61, 156, 180,
];
const p = new Array(512).fill(0).map((_, i) => PERM[i % 256]);
function fade(t) {
  return t * t * t * (t * (t * 6 - 15) + 10);
}
function lerp(t, a, b) {
  return a + t * (b - a);
}
function grad(hash, x, y) {
  const h = hash & 3;
  return (
    (h & 1 ? -(h < 2 ? x : y) : h < 2 ? x : y) +
    (h & 2 ? -(h < 2 ? y : x) : h < 2 ? y : x)
  );
}
function noise2d(x, y) {
  const X = Math.floor(x) & 255,
    Y = Math.floor(y) & 255;
  x -= Math.floor(x);
  y -= Math.floor(y);
  const u = fade(x),
    v = fade(y);
  const a = p[X] + Y,
    b = p[X + 1] + Y;
  return lerp(
    v,
    lerp(u, grad(p[a], x, y), grad(p[b], x - 1, y)),
    lerp(u, grad(p[a + 1], x, y - 1), grad(p[b + 1], x - 1, y - 1)),
  );
}

// --- WebGL Segédek ---
function buildProgram(gl) {
  const compile = (type, src) => {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return s;
  };
  const prog = gl.createProgram();
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(prog);
  return prog;
}
function uploadImageTexture(gl, img) {
  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  return tex;
}
function buildDispMap(w, h, scale = 3) {
  const d = new Uint8Array(w * h * 4);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      d[i] =
        ((noise2d((x / w) * scale, (y / h) * scale) * 0.5 + 0.5) * 255) | 0;
      d[i + 1] =
        ((noise2d((x / w) * scale + 31.4, (y / h) * scale + 27.2) * 0.5 + 0.5) *
          255) |
        0;
      d[i + 2] = 128;
      d[i + 3] = 255;
    }
  }
  return d;
}

export default function LiquidSliderBg({ src, intensity = 0.3, speed = 0.6 }) {
  const canvasRef = useRef(null);
  const currentSrcRef = useRef(null);
  const isDestroyed = useRef(false);
  const stateRef = useRef({
    gl: null,
    prog: null,
    tex0: null,
    tex1: null,
    dispTex: null,
    uniforms: {},
    progress: 1,
    target: 1,
    raf: null,
    imgRes: [1, 1],
    width: 1,
    height: 1,
  });

  // 1. WebGL Alapok beállítása
  useEffect(() => {
    isDestroyed.current = false;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { alpha: true });
    if (!gl) return;

    const prog = buildProgram(gl);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const ap = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(ap);
    gl.vertexAttribPointer(ap, 2, gl.FLOAT, false, 0, 0);

    const uniforms = {
      from: gl.getUniformLocation(prog, "u_from"),
      to: gl.getUniformLocation(prog, "u_to"),
      disp: gl.getUniformLocation(prog, "u_disp"),
      progress: gl.getUniformLocation(prog, "u_progress"),
      intensity: gl.getUniformLocation(prog, "u_intensity"),
      res: gl.getUniformLocation(prog, "u_res"),
      imgRes: gl.getUniformLocation(prog, "u_imgRes"),
    };
    gl.uniform1i(uniforms.from, 0);
    gl.uniform1i(uniforms.to, 1);
    gl.uniform1i(uniforms.disp, 2);

    const texDisp = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texDisp);
    const dispData = buildDispMap(256, 256, 3);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      256,
      256,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      dispData,
    );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

    Object.assign(stateRef.current, { gl, prog, dispTex: texDisp, uniforms });

    const resize = () => {
      if (isDestroyed.current) return;
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      canvas.width = rect.width;
      canvas.height = rect.height;
      stateRef.current.width = rect.width;
      stateRef.current.height = rect.height;
      gl.viewport(0, 0, rect.width, rect.height);
      if (stateRef.current.tex1) renderFrame(stateRef.current.progress);
    };
    window.addEventListener("resize", resize);
    setTimeout(resize, 0);

    return () => {
      isDestroyed.current = true;
      window.removeEventListener("resize", resize);
      const s = stateRef.current;

      if (s.raf) {
        cancelAnimationFrame(s.raf);
        s.raf = null;
      }

      if (s.gl) {
        if (s.tex0) {
          s.gl.deleteTexture(s.tex0);
        }
        if (s.tex1 && s.tex1 !== s.tex0) {
          s.gl.deleteTexture(s.tex1);
        }
        s.tex0 = null;
        s.tex1 = null;

        if (s.dispTex) {
          s.gl.deleteTexture(s.dispTex);
          s.dispTex = null;
        }
        if (s.prog) {
          s.gl.deleteProgram(s.prog);
          s.prog = null;
        }
        s.gl = null;
      }

      currentSrcRef.current = null;
    };
  }, []);

  const renderFrame = useCallback(
    (prog_val) => {
      if (isDestroyed.current) return;
      const s = stateRef.current;

      if (!s.gl || !s.prog || !s.dispTex) return;
      if (!s.tex0 && !s.tex1) return;

      try {
        s.gl.activeTexture(s.gl.TEXTURE0);
        s.gl.bindTexture(s.gl.TEXTURE_2D, s.tex0 || s.tex1);

        s.gl.activeTexture(s.gl.TEXTURE1);
        s.gl.bindTexture(s.gl.TEXTURE_2D, s.tex1 || s.tex0);

        s.gl.activeTexture(s.gl.TEXTURE2);
        s.gl.bindTexture(s.gl.TEXTURE_2D, s.dispTex);

        s.gl.uniform1f(s.uniforms.progress, prog_val);
        s.gl.uniform1f(s.uniforms.intensity, intensity);
        s.gl.uniform2f(s.uniforms.res, s.width, s.height);
        s.gl.uniform2f(s.uniforms.imgRes, s.imgRes[0], s.imgRes[1]);

        s.gl.drawArrays(s.gl.TRIANGLE_STRIP, 0, 4);
      } catch (e) {
        // Csak hogy elnyomjuk a Strict Mode ideiglenes hibáit
      }
    },
    [intensity],
  );

  const animate = useCallback(() => {
    if (isDestroyed.current) return;
    const s = stateRef.current;
    if (!s.gl) return;

    const diff = s.target - s.progress;

    if (Math.abs(diff) < 0.005) {
      s.progress = s.target;
      renderFrame(s.progress);
      s.raf = null;
      return;
    }

    s.progress += diff * (1 / 60 / speed) * 4;
    renderFrame(s.progress);
    s.raf = requestAnimationFrame(animate);
  }, [renderFrame, speed]);

  // Új kép betöltése
  useEffect(() => {
    if (!src || currentSrcRef.current === src) return;
    currentSrcRef.current = src;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      if (isDestroyed.current || currentSrcRef.current !== src) return;

      const s = stateRef.current;
      if (!s.gl) return;

      const newTex = uploadImageTexture(s.gl, img);
      s.imgRes = [img.width, img.height];

      if (s.tex1) {
        if (s.tex0 && s.tex0 !== s.tex1) {
          s.gl.deleteTexture(s.tex0);
        }
        s.tex0 = s.tex1;
        s.tex1 = newTex;
        s.progress = 0;
      } else {
        s.tex0 = newTex;
        s.tex1 = newTex;
        s.progress = 1;
      }

      s.target = 1;
      if (!s.raf) s.raf = requestAnimationFrame(animate);
    };
    img.src = src;
  }, [src, animate]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full block object-contain md:object-cover"
    />
  );
}
