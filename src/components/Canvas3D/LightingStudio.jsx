import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Hệ thống ánh sáng Studio thời trang di sản cao cấp
 * Tôn vinh vẻ đẹp tự nhiên của khuôn mặt, làn da và chất liệu gấm lụa
 */
export default function LightingStudio({ lightingMode = 'museum' }) {
  const particlesRef = useRef();

  // 60 hạt bụi vàng bay lơ lửng
  const particleCount = 60;
  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const sc = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 3.5;
      pos[i * 3 + 1] = Math.random() * 2.8 - 0.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 3.5;
      sc[i] = Math.random() * 0.02 + 0.008;
    }
    return [pos, sc];
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (particlesRef.current) {
      const positionsArr = particlesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        positionsArr[i * 3 + 1] += Math.sin(t + i) * 0.0015;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <>
      {/* 1. ĐÈN RỌI MẶT & TRANG PHỤC TRỰC DIỆN (Front Studio Light) */}
      <directionalLight
        position={[0, 1.8, 3.2]}
        intensity={1.8}
        color="#FFF9F2"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={0.5}
        shadow-camera-far={8}
      />

      {/* 2. ÁNH SÁNG CHÍNH TỪ GÓC PHẢI (Key Light) */}
      <directionalLight
        position={[2.5, 3.5, 2.5]}
        intensity={1.4}
        color={lightingMode === 'golden_hour' ? '#FFAA44' : '#FFF6E6'}
      />

      {/* 3. ÁNH SÁNG BÙ DỊU MẮT TỪ GÓC TRÁI (Fill Light) */}
      <directionalLight
        position={[-2.5, 2.5, 2]}
        intensity={1.1}
        color="#E0EAF5"
      />

      {/* 4. VIỀN SÁNG VÀNG HOÀNG GIA PHÍA SAU (Golden Rim Light) */}
      <spotLight
        position={[0, 3.5, -2.8]}
        intensity={2.6}
        color="#D4AF37"
        angle={0.65}
        penumbra={0.8}
      />

      {/* 5. ÁNH SÁNG MÔI TRƯỜNG DỊU ẤM (Warm Ambient) */}
      <ambientLight intensity={0.95} color="#FFF5EB" />

      {/* 6. BỤI VÀNG BAY (Golden Dust Particles) */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color="#D4AF37"
          transparent
          opacity={0.65}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* 7. BỆ ĐÀI TRÒN HOÀNG CUNG (Imperial Lotus Dais) */}
      <group position={[0, -0.92, 0]}>
        <mesh receiveShadow>
          <cylinderGeometry args={[1.2, 1.35, 0.06, 48]} />
          <meshStandardMaterial
            color="#141722"
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>

        <mesh position={[0, 0.032, 0]}>
          <ringGeometry args={[1.15, 1.2, 48]} />
          <meshStandardMaterial
            color="#D4AF37"
            metalness={0.9}
            roughness={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>

        <mesh position={[0, 0.033, 0]}>
          <ringGeometry args={[0.7, 0.72, 32]} />
          <meshBasicMaterial color="#D4AF37" transparent opacity={0.4} />
        </mesh>
      </group>
    </>
  );
}
