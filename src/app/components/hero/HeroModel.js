"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Stage, useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";

function SharkModel({ mouse }) {
  const group = useRef();
  const { scene } = useGLTF("/cyber_samurai.glb");

  useFrame((_, delta) => {
    if (!group.current) return;

    // Smooth follow: target rotations derived from normalized mouse coordinates.
    const targetX = mouse.current.x * 0.35;
    const targetY = mouse.current.y * 0.35;

    group.current.rotation.y +=
      (targetX - group.current.rotation.y) * 4.5 * delta;
    group.current.rotation.x +=
      (targetY - group.current.rotation.x) * 4.5 * delta;
  });

  return <primitive ref={group} object={scene} dispose={null} />;
}

useGLTF.preload("/cyber_samurai.glb");

export default function HeroModel() {
  const mouse = useRef({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    queueMicrotask(() => setMounted(true));
  }, []);

  const handlePointerMove = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1
    mouse.current = {
      x: px * 2 - 1, // -1..1
      y: py * 2 - 1, // -1..1
    };
  };

  const canvasStyle = useMemo(
    () => ({ width: "110%", height: "110%" }),
    []
  );

  if (!mounted) {
    return (
      <div
        className="flex h-[360px] items-center justify-center rounded-3xl bg-zinc-900/40"
        aria-label="Loading 3D model"
      >
        <span className="text-xs text-zinc-500">Loading 3D model…</span>
      </div>
    );
  }

  return (
    <div
      onPointerMove={handlePointerMove}
      className="relative h-[420px] w-full rounded-3xl bg-transparent"
    >
      <Canvas
        style={{ ...canvasStyle, background: "transparent" }}
        camera={{ position: [0, 0.4, 4], fov: 40 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true, physicallyCorrectLights: true }}
        onCreated={({ gl }) => {
          // Make sure the canvas does not paint an opaque black background.
          gl.setClearColor(0x000000, 0)
        }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight
          position={[6, 6, 4]}
          intensity={2.2}
          color={0x67e8f9} /* sky/cyan */
        />
        <directionalLight
          position={[-5, 2, -6]}
          intensity={1.0}
          color={0x60a5fa} /* blue */
        />

        <Stage environment={null} intensity={1.35} shadows={false}>
          <SharkModel mouse={mouse} />
        </Stage>
      </Canvas>
    </div>
  );
}
