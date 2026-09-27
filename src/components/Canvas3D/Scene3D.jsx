import React, { useRef, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import AvatarMannequin from './AvatarMannequin';
import LightingStudio from './LightingStudio';
import styles from './Scene3D.module.css';

function ModelLoader() {
  return (
    <mesh position={[0, 0.45, 0]}>
      <torusGeometry args={[0.25, 0.015, 16, 32]} />
      <meshStandardMaterial color="#D4AF37" wireframe />
    </mesh>
  );
}

/**
 * Không gian 3D tương tác với R3F, OrbitControls, Camera và Ánh sáng Studio
 */
export default function Scene3D({
  bodyMeasurements,
  costumeColor,
  pantColor,
  costumeType,
  selectedAccessories
}) {
  const controlsRef = useRef();
  const [cameraView, setCameraView] = useState('front');

  // Đổi góc nhìn camera linh hoạt
  const handleViewChange = (viewType) => {
    setCameraView(viewType);
    if (!controlsRef.current) return;

    if (viewType === 'front') {
      controlsRef.current.setAzimuthalAngle(0);
      controlsRef.current.setPolarAngle(Math.PI / 2.05);
      controlsRef.current.target.set(0, 0.45, 0);
    } else if (viewType === 'perspective') {
      controlsRef.current.setAzimuthalAngle(Math.PI / 4.5);
      controlsRef.current.setPolarAngle(Math.PI / 2.1);
      controlsRef.current.target.set(0, 0.45, 0);
    } else if (viewType === 'closeup') {
      controlsRef.current.setAzimuthalAngle(0);
      controlsRef.current.setPolarAngle(Math.PI / 2.15);
      controlsRef.current.target.set(0, 0.72, 0);
    }
    controlsRef.current.update();
  };

  return (
    <div className={styles.canvasContainer}>
      {/* Thanh công cụ 3D nổi */}
      <div className={styles.floatingToolbar}>
        <div className={styles.badge3D}>
          <span className={styles.dotPulse} />
          <span>3D HERITAGE AVATAR</span>
        </div>

        <div className={styles.cameraControlsGroup}>
          <button
            className={`${styles.camBtn} ${cameraView === 'front' ? styles.camBtnActive : ''}`}
            onClick={() => handleViewChange('front')}
            title="Góc nhìn chính diện"
          >
            Trực diện
          </button>
          <button
            className={`${styles.camBtn} ${cameraView === 'perspective' ? styles.camBtnActive : ''}`}
            onClick={() => handleViewChange('perspective')}
            title="Góc nghiêng 45 độ"
          >
            Nghiêng 45°
          </button>
          <button
            className={`${styles.camBtn} ${cameraView === 'closeup' ? styles.camBtnActive : ''}`}
            onClick={() => handleViewChange('closeup')}
            title="Cận cảnh khuôn mặt"
          >
            Cận cảnh
          </button>
        </div>
      </div>

      {/* R3F Canvas */}
      <div className={styles.canvasInner}>
        <Canvas
          shadows
          camera={{ position: [0, 0.6, 2.7], fov: 40 }}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={<ModelLoader />}>
            <LightingStudio />

            <AvatarMannequin
              bodyMeasurements={bodyMeasurements}
              costumeColor={costumeColor}
              pantColor={pantColor}
              costumeType={costumeType}
              selectedAccessories={selectedAccessories}
            />

            {/* Bóng đổ tiếp xúc chân thực */}
            <ContactShadows
              position={[0, -0.9, 0]}
              opacity={0.65}
              scale={3.2}
              blur={1.8}
              far={1.5}
            />

            <OrbitControls
              ref={controlsRef}
              enablePan={true}
              enableZoom={true}
              minDistance={1.2}
              maxDistance={4.2}
              minPolarAngle={Math.PI / 4}
              maxPolarAngle={Math.PI / 1.95}
              target={[0, 0.45, 0]}
              dampingFactor={0.05}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Gợi ý điều khiển bên dưới */}
      <div className={styles.bottomHint}>
        <span>✦ Kéo chuột để xoay 360° • Lăn chuột để phóng to / thu nhỏ chi tiết</span>
      </div>
    </div>
  );
}
