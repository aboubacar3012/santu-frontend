'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Mise en place de la scène Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(300, 300);
    containerRef.current.appendChild(renderer.domElement);

    // Création d'un groupe pour les objets 3D
    const group = new THREE.Group();
    scene.add(group);

    // Créer plusieurs cubes stylisés pour former un "404" visuel
    const cubeSize = 0.5;
    const cubeGap = 0.15;
    const createCube = (x: number, y: number) => {
      const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
      const material = new THREE.MeshNormalMaterial();
      const cube = new THREE.Mesh(geometry, material);
      cube.position.set(x, y, 0);
      group.add(cube);

      // Animation individuelle pour chaque cube
      gsap.to(cube.rotation, {
        x: Math.PI * 2,
        y: Math.PI * 2,
        duration: 3 + Math.random() * 2,
        repeat: -1,
        ease: 'power1.inOut',
        delay: Math.random(),
      });

      return cube;
    };

    // Créer une grille de cubes pour former un "404"
    // Digit 4
    [
      [0, 2],
      [1, 2],
      [1, 1],
      [1, 0],
      [0, 0],
      [2, 0],
      [2, 1],
      [2, 2],
      [2, -1],
    ].forEach(([x, y]) => createCube(x - 4, y));

    // Digit 0
    [
      [0, 2],
      [1, 2],
      [2, 2],
      [0, 1],
      [2, 1],
      [0, 0],
      [0, -1],
      [1, -1],
      [2, -1],
      [2, 0],
    ].forEach(([x, y]) => createCube(x, y));

    // Digit 4
    [
      [0, 2],
      [1, 2],
      [1, 1],
      [1, 0],
      [0, 0],
      [2, 0],
      [2, 1],
      [2, 2],
      [2, -1],
    ].forEach(([x, y]) => createCube(x + 4, y));

    // Ajuster la position du groupe
    group.position.y = 0.5;
    group.position.x = -0.5;

    // Animation du groupe entier
    gsap.to(group.position, {
      y: 0.7,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    camera.position.z = 10;

    // Fonction d'animation
    const animate = () => {
      requestAnimationFrame(animate);
      group.rotation.y += 0.002; // Légère rotation continue
      renderer.render(scene, camera);
    };

    animate();

    // Nettoyage
    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="flex max-w-full items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 to-gray-700 p-5 font-sans">
      <div className="flex flex-col items-center max-w-xl text-center text-white bg-black/30 rounded-2xl p-10 shadow-lg backdrop-blur-md">
        <div
          className="w-[300px] h-[300px] mb-5 flex justify-center items-center"
          ref={containerRef}
        ></div>
        <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-pink-300 to-red-200 bg-clip-text text-transparent">
          Page non trouvée
        </h1>
        <p className="text-xl mb-8 opacity-90">
          La ressource demandée n'existe pas ou a été déplacée.
        </p>
        <Link
          href="/dashboard"
          className="inline-block bg-gradient-to-r from-pink-300 to-red-200 text-gray-800 px-8 py-3 rounded-full font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg shadow-md"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
