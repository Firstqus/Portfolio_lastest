"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, Line } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";

function NeuralNetwork({ mouse }) {
  const group = useRef();
  const nodesCount = 20;
  const introProgress = useRef(0);

  // Generate random nodes
  const nodes = useMemo(() => {
    return Array.from({ length: nodesCount }, () => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 5
      ),
      speed: Math.random() * 0.4 + 0.2,
      offset: Math.random() * Math.PI * 2,
    }));
  }, []);

  // Find connections (indices)
  const connections = useMemo(() => {
    const conns = [];
    for (let i = 0; i < nodes.length; i++) {
      let localCount = 0;
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].position.distanceTo(nodes[j].position) < 3.5 && localCount < 2) {
          conns.push(i, j);
          localCount++;
        }
      }
    }
    return new Int32Array(conns);
  }, [nodes]);

  const nodeRefs = useRef([]);
  const linesGeomRef = useRef();

  useFrame((state, delta) => {
    if (!group.current) return;

    // Intro Animation
    introProgress.current = Math.min(1, introProgress.current + delta / 2);
    const eased = 1 - Math.pow(1 - introProgress.current, 4);
    group.current.scale.setScalar(0.4 + 0.6 * eased);

    // Mouse Follow
    const targetX = mouse.current.x * 0.4;
    const targetY = mouse.current.y * 0.4;
    group.current.rotation.y += (targetX - group.current.rotation.y) * 3 * delta;
    group.current.rotation.x += (targetY - group.current.rotation.x) * 3 * delta;

    const time = state.clock.getElapsedTime();
    const linePositions = linesGeomRef.current.attributes.position.array;

    // Update Nodes
    nodes.forEach((node, i) => {
      if (nodeRefs.current[i]) {
        const yOffset = Math.sin(time * node.speed + node.offset) * 0.15;
        const xOffset = Math.cos(time * node.speed * 0.5 + node.offset) * 0.1;
        nodeRefs.current[i].position.copy(node.position).add(new THREE.Vector3(xOffset, yOffset, 0));
      }
    });

    // Update Lines to match Nodes
    for (let i = 0; i < connections.length; i++) {
      const nodeIndex = connections[i];
      const pos = nodeRefs.current[nodeIndex].position;
      linePositions[i * 3] = pos.x;
      linePositions[i * 3 + 1] = pos.y;
      linePositions[i * 3 + 2] = pos.z;
    }
    linesGeomRef.current.attributes.position.needsUpdate = true;
  });

  return (
    <group ref={group}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        {/* Nodes */}
        {nodes.map((node, i) => (
          <Sphere
            key={i}
            ref={(el) => (nodeRefs.current[i] = el)}
            args={[0.07, 12, 12]}
            position={node.position}
          >
            <meshStandardMaterial
              emissive="#22d3ee"
              emissiveIntensity={2}
              color="#0891b2"
              toneMapped={false}
            />
          </Sphere>
        ))}

        {/* Connections */}
        <lineSegments>
          <bufferGeometry ref={linesGeomRef}>
            <bufferAttribute
              attach="attributes-position"
              count={connections.length}
              array={new Float32Array(connections.length * 3)}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#22d3ee" transparent opacity={0.3} linewidth={1} />
        </lineSegments>
      </Float>
    </group>
  );
}

export default function HeroModel() {
  const mouse = useRef({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handlePointerMove = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    mouse.current = {
      x: px * 2 - 1,
      y: py * 2 - 1,
    };
  };

  if (!mounted) {
    return (
      <div className="flex h-[420px] items-center justify-center rounded-3xl bg-zinc-900/40">
        <span className="text-xs text-zinc-500">Initializing Neural Network...</span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      onPointerMove={handlePointerMove}
      className="relative h-[420px] w-full rounded-3xl bg-transparent"
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#22d3ee" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#60a5fa" />
        
        <NeuralNetwork mouse={mouse} />
      </Canvas>
    </motion.div>
  );
}