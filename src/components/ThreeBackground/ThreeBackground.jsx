import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './ThreeBackground.css';

const ThreeBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const width = mount.clientWidth;
    const height = mount.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 80;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Particle Field ──
    const particleCount = 1800;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

  const colorOptions = [
  new THREE.Color(0x3AAFA9),  // muted teal-cyan
  new THREE.Color(0x6D5DF6),  // soft deep purple
  new THREE.Color(0xC77DFF),  // muted violet-pink
];
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200;

      const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = Math.random() * 1.5 + 0.5;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particleGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const particleMat = new THREE.PointsMaterial({
      size: 0.6,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ── Floating Geometric Shapes ──
    const shapes = [];

    // Wireframe icosahedron
    const icosaGeo = new THREE.IcosahedronGeometry(15, 1);
    const icosaMat = new THREE.MeshBasicMaterial({
      color: 0x00f5ff,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const icosa = new THREE.Mesh(icosaGeo, icosaMat);
    icosa.position.set(80, 20, -40);
    scene.add(icosa);
    shapes.push({ mesh: icosa, rotX: 0.003, rotY: 0.005 });

    // Wireframe octahedron
    const octaGeo = new THREE.OctahedronGeometry(8, 0);
    const octaMat = new THREE.MeshBasicMaterial({
      color: 0x7c3aed,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const octa = new THREE.Mesh(octaGeo, octaMat);
    octa.position.set(40, -15, -30);
    scene.add(octa);
    shapes.push({ mesh: octa, rotX: 0.006, rotY: 0.003 });

    // Torus knot
    const torusGeo = new THREE.TorusKnotGeometry(9, 1.5, 80, 12);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0xf72585,
      wireframe: true,
      transparent: true,
      opacity: 0.1,
    });
    const torus = new THREE.Mesh(torusGeo, torusMat);
    torus.position.set(-90, 30, -50);
    scene.add(torus);
    shapes.push({ mesh: torus, rotX: 0.004, rotY: 0.007 });

    // ── Mouse Interaction ──
    const mouse = { x: 0, y: 0 };
    const handleMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // ── Animation Loop ──
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Rotate particles
      particles.rotation.y = elapsed * 0.03;
      particles.rotation.x = elapsed * 0.01;

      // Mouse parallax
      camera.position.x += (mouse.x * 8 - camera.position.x) * 0.04;
      camera.position.y += (mouse.y * 5 - camera.position.y) * 0.04;
      camera.lookAt(scene.position);

      // Rotate shapes
      shapes.forEach(({ mesh, rotX, rotY }) => {
        mesh.rotation.x += rotX;
        mesh.rotation.y += rotY;
      });

      // Pulse particle opacity
      particleMat.opacity = 0.55 + Math.sin(elapsed * 0.5) * 0.15;

      renderer.render(scene, camera);
    };
    animate();

    // ── Resize Handler ──
    const handleResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div className="three-bg" ref={mountRef} />;
};

export default ThreeBackground;
