"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Stage, useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion"; // เพิ่มไว้สำหรับ fade-in

function SharkModel({ mouse }) {
  const group = useRef();
  // เปลี่ยนชื่อไฟล์ตามที่คุณใช้ล่าสุด (cyber_samurai.glb)
  const { scene } = useGLTF("/cyber_samurai.glb");
  const introProgress = useRef(0);

  useFrame((_, delta) => {
    if (!group.current) return;

    // --- ส่วนที่ปรับปรุง: Zoom Out Effect ---
    // เพิ่มความเร็วเป็น delta / 1.5 เพื่อให้ซูมออกนุ่มๆ
    introProgress.current = Math.min(1, introProgress.current + delta / 2.5);
    
    // ใช้ easeOutQuart เพื่อให้ตอนจบมันค่อยๆ ช้าลงอย่างนิ่งๆ
    const eased = 1 - Math.pow(1 - introProgress.current, 4);
    
    // เริ่มต้นจาก scale 0.5 (เล็ก/อยู่ไกล) แล้วขยายออกมาที่ 1.0 (สเกลปกติของ Stage)
    const scale = 0.5 + 0.5 * eased;
    group.current.scale.setScalar(scale);

    // Smooth follow
    const targetX = mouse.current.x * 0.35;
    const targetY = mouse.current.y * 0.35;

    group.current.rotation.y += (targetX - group.current.rotation.y) * 4.5 * delta;
    group.current.rotation.x += (targetY - group.current.rotation.x) * 4.5 * delta;
  });

  return <primitive ref={group} object={scene} dispose={null} />;
}

useGLTF.preload("/cyber_samurai.glb");

export default function HeroModel() {
  const mouse = useRef({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // ให้เวลาระบบจัดการ microtask เล็กน้อยก่อนเริ่มเล่น
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

  const canvasStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);

  if (!mounted) {
    return (
      <div className="flex h-[420px] items-center justify-center rounded-3xl bg-zinc-900/40">
        <span className="text-xs text-zinc-500">Loading 3D model…</span>
      </div>
    );
  }

  return (
    // เพิ่ม motion.div เพื่อให้ค่อยๆ จางมา (Fade In) พร้อมกับตอนซูมออก
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      onPointerMove={handlePointerMove}
      className="relative h-[420px] w-full rounded-3xl bg-transparent"
    >
      <Canvas
        style={{ ...canvasStyle, background: "transparent" }}
        camera={{ position: [0, 0.4, 4], fov: 40 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true, physicallyCorrectLights: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[6, 6, 4]} intensity={2.2} color={0x67e8f9} />
        <directionalLight position={[-5, 2, -6]} intensity={1.0} color={0x60a5fa} />

        <Stage environment={null} intensity={1.35} shadows={false}>
          <SharkModel mouse={mouse} />
        </Stage>
      </Canvas>
    </motion.div>
  );
}