import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './ThreeBackground.css';

// ─────────────────────────────────────────────────────────────────────────────
// Logo draw functions (canvas 2D)
// ─────────────────────────────────────────────────────────────────────────────

function drawReact(ctx, sz) {
  const cx = sz / 2, cy = sz / 2;
  ctx.clearRect(0, 0, sz, sz);
  // Glow halo
  const grd = ctx.createRadialGradient(cx, cy, 2, cx, cy, sz * 0.48);
  grd.addColorStop(0, 'rgba(97,218,251,0.25)');
  grd.addColorStop(1, 'transparent');
  ctx.fillStyle = grd;
  ctx.beginPath(); ctx.arc(cx, cy, sz * 0.48, 0, Math.PI * 2); ctx.fill();
  // 3 orbit ellipses
  ctx.save();
  ctx.translate(cx, cy);
  ctx.strokeStyle = '#61DAFB';
  ctx.lineWidth = sz * 0.04;
  ctx.shadowColor = '#61DAFB';
  ctx.shadowBlur = sz * 0.15;
  for (let i = 0; i < 3; i++) {
    ctx.save();
    ctx.rotate((i * Math.PI) / 3);
    ctx.beginPath();
    ctx.ellipse(0, 0, sz * 0.42, sz * 0.155, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }
  // Center nucleus
  ctx.fillStyle = '#61DAFB';
  ctx.shadowBlur = sz * 0.2;
  ctx.beginPath(); ctx.arc(0, 0, sz * 0.075, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
}

function drawGithub(ctx, sz) {
  const cx = sz / 2;
  const cy = sz / 2;

  ctx.clearRect(0, 0, sz, sz);

  // Glow
  const grd = ctx.createRadialGradient(cx, cy, 2, cx, cy, sz * 0.48);
  grd.addColorStop(0, 'rgba(255,255,255,0.15)');
  grd.addColorStop(1, 'transparent');
  ctx.fillStyle = grd;
  ctx.beginPath();
  ctx.arc(cx, cy, sz * 0.48, 0, Math.PI * 2);
  ctx.fill();

  // Draw REAL GitHub shape using SVG path
  const path = new Path2D(`
    M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38
    0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94
    -.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53
    .63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66
    .07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95
    0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12
    0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27
    s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82
    .44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15
    0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48
    0 1.07-.01 1.93-.01 2.2
    0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8
    c0-4.42-3.58-8-8-8z
  `);

  ctx.save();
  ctx.translate(cx - sz * 0.25, cy - sz * 0.25);
  ctx.scale(sz / 16 * 0.5, sz / 16 * 0.5);

  ctx.fillStyle = '#ffffff';
  ctx.shadowColor = '#a0a0ff';
  ctx.shadowBlur = sz * 0.12;

  ctx.fill(path);
  ctx.restore();
}

function drawAI(ctx, sz) {
  const cx = sz / 2, cy = sz / 2;
  ctx.clearRect(0, 0, sz, sz);
  const grd = ctx.createRadialGradient(cx, cy, 2, cx, cy, sz * 0.48);
  grd.addColorStop(0, 'rgba(167,139,250,0.25)');
  grd.addColorStop(1, 'transparent');
  ctx.fillStyle = grd; ctx.beginPath(); ctx.arc(cx, cy, sz * 0.48, 0, Math.PI * 2); ctx.fill();
  const nodes = [
    [cx,           cy - sz * 0.29],
    [cx - sz*0.23, cy - sz*0.05],
    [cx + sz*0.23, cy - sz*0.05],
    [cx - sz*0.14, cy + sz*0.23],
    [cx + sz*0.14, cy + sz*0.23],
    [cx,           cy + sz*0.08],
  ];
  const edges = [[0,1],[0,2],[1,2],[1,3],[2,4],[3,4],[1,5],[2,5],[3,5],[4,5],[0,5]];
  ctx.shadowColor = '#7c3aed';
  ctx.shadowBlur = sz * 0.08;
  ctx.strokeStyle = 'rgba(167,139,250,0.55)';
  ctx.lineWidth = sz * 0.022;
  edges.forEach(([a, b]) => {
    ctx.beginPath(); ctx.moveTo(nodes[a][0], nodes[a][1]); ctx.lineTo(nodes[b][0], nodes[b][1]); ctx.stroke();
  });
  nodes.forEach(([nx, ny], i) => {
    ctx.fillStyle = i === 0 ? '#c4b5fd' : '#a78bfa';
    ctx.shadowBlur = sz * 0.14;
    ctx.beginPath(); ctx.arc(nx, ny, (i === 0 ? 0.072 : 0.048) * sz, 0, Math.PI * 2); ctx.fill();
  });
  ctx.shadowBlur = 0;
  ctx.fillStyle = 'rgba(196,181,253,0.75)';
  ctx.font = `bold ${Math.floor(sz * 0.17)}px monospace`;
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('AI', cx, cy + sz * 0.08);
}

function drawML(ctx, sz) {
  const cx = sz / 2, cy = sz / 2;
  ctx.clearRect(0, 0, sz, sz);
  const grd = ctx.createRadialGradient(cx, cy, 2, cx, cy, sz * 0.48);
  grd.addColorStop(0, 'rgba(249,115,22,0.22)');
  grd.addColorStop(1, 'transparent');
  ctx.fillStyle = grd; ctx.beginPath(); ctx.arc(cx, cy, sz * 0.48, 0, Math.PI * 2); ctx.fill();
  const pts = [
    [cx-sz*0.25, cy+sz*0.22,0.9],[cx-sz*0.15,cy+sz*0.1,0.8],
    [cx-sz*0.05,cy-sz*0.05,1.0],[cx+sz*0.08,cy-sz*0.15,0.9],
    [cx+sz*0.2, cy-sz*0.26,0.85],[cx-sz*0.28,cy+sz*0.08,0.7],
    [cx+sz*0.04,cy+sz*0.14,0.75],[cx+sz*0.22,cy-sz*0.04,0.8],
  ];
  ctx.shadowColor = '#f97316';
  pts.forEach(([px,py,sc]) => {
    ctx.shadowBlur = sz*0.08; ctx.fillStyle = `rgba(249,115,22,${sc})`;
    ctx.beginPath(); ctx.arc(px,py,sz*0.038,0,Math.PI*2); ctx.fill();
  });
  ctx.shadowBlur = sz*0.1; ctx.strokeStyle = '#fb923c';
  ctx.lineWidth = sz*0.032; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(cx-sz*0.3,cy+sz*0.27); ctx.lineTo(cx+sz*0.3,cy-sz*0.3); ctx.stroke();
  ctx.shadowBlur = 0; ctx.fillStyle = 'rgba(251,146,60,0.85)';
  ctx.font = `bold ${Math.floor(sz*0.17)}px monospace`;
  ctx.textAlign='center'; ctx.textBaseline='middle';
  ctx.fillText('ML', cx, cy+sz*0.06);
}

// ─────────────────────────────────────────────────────────────────────────────
// Build one glow-card logo mesh group
// ─────────────────────────────────────────────────────────────────────────────
function buildLogoGroup(scene, drawFn, glowHex) {
  const TEX_SIZE = 192;
  const canvas = document.createElement('canvas');
  canvas.width = TEX_SIZE; canvas.height = TEX_SIZE;
  drawFn(canvas.getContext('2d'), TEX_SIZE);
  const tex = new THREE.CanvasTexture(canvas);

  // Face plane
  const faceMat = new THREE.MeshBasicMaterial({
    map: tex, transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide,
  });
  const face = new THREE.Mesh(new THREE.PlaneGeometry(13, 13), faceMat);

  // Glowing border edges
  // const edgeGeo = new THREE.EdgesGeometry(new THREE.BoxGeometry(14.2, 14.2, 0.25));
  // const edgeMat = new THREE.LineBasicMaterial({
  //   color: new THREE.Color(glowHex), transparent: true, opacity: 0,
  // });
  // const edges = new THREE.LineSegments(edgeGeo, edgeMat);

  // Soft back-glow disc
  const glowCvs = document.createElement('canvas');
  glowCvs.width = 64; glowCvs.height = 64;
  const gc = glowCvs.getContext('2d');
  const gg = gc.createRadialGradient(32,32,1,32,32,31);
  gg.addColorStop(0, glowHex + '44'); gg.addColorStop(1, 'transparent');
  gc.fillStyle = gg; gc.beginPath(); gc.arc(32,32,31,0,Math.PI*2); gc.fill();
  const glowMat = new THREE.MeshBasicMaterial({
    map: new THREE.CanvasTexture(glowCvs), transparent: true, opacity: 0,
    depthWrite: false, side: THREE.DoubleSide,
  });
  const glowDisc = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), glowMat);
  glowDisc.position.z = -0.8;

  const group = new THREE.Group();
  group.add(glowDisc); // [0]
  group.add(face);     // [1]
  // group.add(edges);    // [2]
  scene.add(group);

  return { group, faceMat, glowMat };
}


function buildImageLogoGroup(scene, imagePath, glowHex) {
  const textureLoader = new THREE.TextureLoader();
  const tex = textureLoader.load(imagePath);

  // Face plane (PNG)
  const faceMat = new THREE.MeshBasicMaterial({
    map: tex,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const face = new THREE.Mesh(new THREE.PlaneGeometry(13, 13), faceMat);

  // Glowing border edges
  // const edgeGeo = new THREE.EdgesGeometry(new THREE.BoxGeometry(14.2, 14.2, 0.25));
  // const edgeMat = new THREE.LineBasicMaterial({
  //   color: new THREE.Color(glowHex),
  //   transparent: true,
  //   opacity: 0,
  // });

  // const edges = new THREE.LineSegments(edgeGeo, edgeMat);

  // Glow background
  const glowCvs = document.createElement('canvas');
  glowCvs.width = 64;
  glowCvs.height = 64;

  const gc = glowCvs.getContext('2d');
  const gg = gc.createRadialGradient(32, 32, 1, 32, 32, 31);
  gg.addColorStop(0, glowHex + '44');
  gg.addColorStop(1, 'transparent');

  gc.fillStyle = gg;
  gc.beginPath();
  gc.arc(32, 32, 31, 0, Math.PI * 2);
  gc.fill();

  const glowMat = new THREE.MeshBasicMaterial({
    map: new THREE.CanvasTexture(glowCvs),
    transparent: true,
    opacity: 0,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const glowDisc = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), glowMat);
  glowDisc.position.z = -0.8;

  const group = new THREE.Group();
  group.add(glowDisc);
  group.add(face);
  // group.add(edges);

  scene.add(group);

  return { group, faceMat, glowMat };
}

// ─────────────────────────────────────────────────────────────────────────────
// Fade helper (no external dependency)
// ─────────────────────────────────────────────────────────────────────────────
function fadeTo(mat, prop, target, durationMs, delayMs) {
  const start = performance.now() + delayMs;
  const from  = mat[prop];
  const tick  = (now) => {
    if (now < start) { requestAnimationFrame(tick); return; }
    const t = Math.min((now - start) / durationMs, 1);
    const ease = 1 - Math.pow(1 - t, 3);
    mat[prop] = from + (target - from) * ease;
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────
const ThreeBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const width  = mount.clientWidth;
    const height = mount.clientHeight;

    // ── Scene / Camera / Renderer (ORIGINAL — untouched) ──────────────────
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 80;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Particle Field (ORIGINAL — untouched) ─────────────────────────────
    const particleCount = 1800;
    const positions = new Float32Array(particleCount * 3);
    const colors    = new Float32Array(particleCount * 3);
    const sizes     = new Float32Array(particleCount);

    const colorOptions = [
      new THREE.Color(0x3AAFA9),
      new THREE.Color(0x6D5DF6),
      new THREE.Color(0xC77DFF),
    ];
    for (let i = 0; i < particleCount; i++) {
      positions[i*3]   = (Math.random()-0.5)*200;
      positions[i*3+1] = (Math.random()-0.5)*200;
      positions[i*3+2] = (Math.random()-0.5)*200;
      const c = colorOptions[Math.floor(Math.random()*colorOptions.length)];
      colors[i*3]=c.r; colors[i*3+1]=c.g; colors[i*3+2]=c.b;
      sizes[i] = Math.random()*1.5+0.5;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions,3));
    particleGeo.setAttribute('color',    new THREE.BufferAttribute(colors,3));
    particleGeo.setAttribute('size',     new THREE.BufferAttribute(sizes,1));
    const particleMat = new THREE.PointsMaterial({
      size:0.6, vertexColors:true, transparent:true, opacity:0.7,
      sizeAttenuation:true, blending:THREE.AdditiveBlending, depthWrite:false,
    });
    scene.add(new THREE.Points(particleGeo, particleMat));

    // ── Geometric Shapes (ORIGINAL — untouched) ───────────────────────────
    const shapes = [];

    const icosa = new THREE.Mesh(
      new THREE.IcosahedronGeometry(15,1),
      new THREE.MeshBasicMaterial({color:0x00f5ff,wireframe:true,transparent:true,opacity:0.12})
    );
    // icosa.position.set(80,20,-40); scene.add(icosa);
    // shapes.push({mesh:icosa,rotX:0.003,rotY:0.005});

    const octa = new THREE.Mesh(
      new THREE.OctahedronGeometry(8,0),
      new THREE.MeshBasicMaterial({color:0x7c3aed,wireframe:true,transparent:true,opacity:0.18})
    );
    // octa.position.set(40,-15,-30); scene.add(octa);
    // shapes.push({mesh:octa,rotX:0.006,rotY:0.003});

    const torus = new THREE.Mesh(
      new THREE.TorusKnotGeometry(9,1.5,80,12),
      new THREE.MeshBasicMaterial({color:0xf72585,wireframe:true,transparent:true,opacity:0.1})
    );
    // torus.position.set(-90,30,-50); scene.add(torus);
    // shapes.push({mesh:torus,rotX:0.004,rotY:0.007});

    // ── 4-Corner Logo Setup ───────────────────────────────────────────────
    //
    // We compute corner positions using the camera's FOV so the logos
    // sit precisely in the 4 screen corners regardless of window size.
    //
    // Visible half-heights at z=0:  halfH = tan(fov/2) * camZ
    // Visible half-widths  at z=0:  halfW = halfH * aspect
    //
    const LOGO_Z     = -5;   // depth (slightly behind hero content)
    const MARGIN     = 0.25; // fraction of screen to inset from edge (11%)

    const computeCorners = () => {
      const fovRad  = THREE.MathUtils.degToRad(camera.fov);
      const dist    = camera.position.z - LOGO_Z;       // effective distance
      const halfH   = Math.tan(fovRad / 2) * dist;
      const halfW   = halfH * camera.aspect;
      const insetX  = halfW  * MARGIN * 0.9;            // slightly more on X
      const insetY  = halfH  * MARGIN * 1.8;
      return [
        { x: -halfW + insetX,  y:  halfH - insetY  },  // top-left     [0] React
        { x:  halfW - insetX,  y:  halfH - insetY  },  // top-right    [1] GitHub
        { x: -halfW + insetX,  y: -halfH + insetY  },  // bottom-left  [2] AI
        { x:  halfW - insetX,  y: -halfH + insetY  },  // bottom-right [3] ML
      ];
    };

    const LOGO_DEFS = [
      { image: "/images/react.png",  glow: '#61DAFB', label: 'React'  },
      { image: "/images/ai2.png",     glow: '#a78bfa', label: 'AI'     },
      { image: "/images/ai.png",  glow: '#a78bfa', label: 'ML'  },
      {  image: "/images/github.png", glow: '#a0a0ff', label: 'GitHub' },
      // { drawFn: drawAI,     glow: '#a78bfa', label: 'AI'     },
      // { drawFn: drawML,     glow: '#f97316', label: 'ML'     },
    ];

    const corners  = computeCorners();
const logos = LOGO_DEFS.map((def, i) => {

  let built;

  if (def.image) {
    built = buildImageLogoGroup(scene, def.image, def.glow);
  } else {
    built = buildLogoGroup(scene, def.drawFn, def.glow);
  }

  const { group, faceMat, glowMat } = built;

      group.position.set(corners[i].x, corners[i].y, LOGO_Z);

      // Staggered fade-in
      const d = 600 + i * 280;
      fadeTo(faceMat, 'opacity', 0.90, 1100, d);
      // fadeTo(edgeMat, 'opacity', 0.50, 1100, d + 150);
      fadeTo(glowMat, 'opacity', 0.45, 1300, d + 80);

      return {
        group, faceMat, glowMat,
        cornerX: corners[i].x,
        cornerY: corners[i].y,
        pulseOff: Math.random() * Math.PI * 2,
        // Each logo gets its own rotation axis combo for variety
        spinY: 0,   // main coin-flip spin
        spinX: 0,    // slight tilt wobble
      };
    });

    // ── Mouse ─────────────────────────────────────────────────────────────
    const mouse = { x: 0, y: 0 };
    const handleMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // ── Animation Loop ────────────────────────────────────────────────────
    let animId;
    const clock = new THREE.Clock();
    const particles = scene.children.find(c => c instanceof THREE.Points);

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // ORIGINAL: particle rotation
      if (particles) {
        particles.rotation.y = t * 0.03;
        particles.rotation.x = t * 0.01;
      }

      // ORIGINAL: mouse parallax on camera
      camera.position.x += (mouse.x * 8 - camera.position.x) * 0.04;
      camera.position.y += (mouse.y * 5 - camera.position.y) * 0.04;
      camera.lookAt(scene.position);

      // ORIGINAL: shape rotation
      shapes.forEach(({ mesh, rotX, rotY }) => {
        mesh.rotation.x += rotX;
        mesh.rotation.y += rotY;
      });

      // ORIGINAL: particle opacity pulse
      particleMat.opacity = 0.55 + Math.sin(t * 0.5) * 0.15;

      // ── Corner logos ──────────────────────────────────────────────────
      logos.forEach(({ group, edgeMat, cornerX, cornerY, pulseOff, spinY, spinX }, idx) => {

        // Keep anchored to corner — add tiny floating drift (±1.2 units max)
        // so they feel alive but never drift into the center content
        const driftX = Math.sin(t * 0.28 + pulseOff)       * 1.2;
        const driftY = Math.cos(t * 0.22 + pulseOff + 1.2) * 1.0;
        group.position.x = cornerX + driftX;
        group.position.y = cornerY + driftY;

        // Spin: primary Y-axis rotation (coin flip) + gentle X tilt
        group.rotation.y += spinY;
        group.rotation.x += spinX * 0.4;

        // Subtle Z sway
        group.rotation.z = Math.sin(t * 0.18 + pulseOff) * 0.08;

        // Breathing scale
        const breathe = 1 + Math.sin(t * 0.6 + pulseOff) * 0.04;
        group.scale.setScalar(breathe);

        // Edge shimmer pulse
        // edgeMat.opacity = 0.28 + Math.abs(Math.sin(t * 0.55 + pulseOff + idx * 0.9)) * 0.42;
      });

      renderer.render(scene, camera);
    };
    animate();

    // ── Resize (ORIGINAL + recalculate corners) ───────────────────────────
    const handleResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);

      // Re-anchor logos to new corner positions
      const newCorners = computeCorners();
      logos.forEach((logo, i) => {
        logo.cornerX = newCorners[i].x;
        logo.cornerY = newCorners[i].y;
      });
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div className="three-bg" ref={mountRef} />;
};

export default ThreeBackground;