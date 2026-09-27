import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { clone as skeletonClone } from 'three/examples/jsm/utils/SkeletonUtils.js';

/**
 * 3D Avatar Người Mô Phỏng Chân Thực (GLTF 3D Human Model) Mặc Cổ Phục Việt
 * - Mô hình 3D thực tế với đầy đủ khuôn mặt, mái tóc, bàn tay và đường cong cơ thể
 * - Nhuộm màu di sản (costumeColor, pantColor) trực tiếp lên chất liệu vải
 * - Cổ đứng Lập Lĩnh, khuy ngọc cài lệch và khăn đóng truyền thống
 * - Phản hồi mượt mà theo các thanh trượt Chiều cao, Vai, Ngực, Eo, Hông, Tay
 */
export default function AvatarMannequin({
  bodyMeasurements = {
    height: 170,
    shoulder: 40,
    chest: 86,
    waist: 68,
    hip: 92,
    arm: 60
  },
  costumeColor = '#8C1D18',
  pantColor = '#F3EFE6',
  costumeType = 'ao_ngu_than_tay_chen',
  selectedAccessories = []
}) {
  const groupRef = useRef();
  const fanGroupRef = useRef();
  const frontFlapRef = useRef();
  const backFlapRef = useRef();

  // Tải mô hình người 3D độ phân giải cao
  const { scene } = useGLTF('/avatar_human.glb');

  // Clone khung xương nhân vật
  const clonedScene = useMemo(() => {
    return skeletonClone(scene);
  }, [scene]);

  // Hệ số co giãn theo thanh trượt slider
  const scaleHeight = (bodyMeasurements.height || 170) / 170;
  const scaleShoulder = (bodyMeasurements.shoulder || 40) / 40;
  const scaleChest = (bodyMeasurements.chest || 86) / 86;
  const scaleWaist = (bodyMeasurements.waist || 68) / 68;
  const scaleHip = (bodyMeasurements.hip || 92) / 92;
  const scaleArm = (bodyMeasurements.arm || 60) / 60;

  // Trạng thái phụ kiện
  const hasKhanDong = selectedAccessories.some(a => a.id === 'khan_dong');
  const hasKinhRam = selectedAccessories.some(a => a.id === 'kinh_ram_hiphop');
  const hasSneaker = selectedAccessories.some(a => a.id === 'sneaker_chunky');
  const hasQuat = selectedAccessories.some(a => a.id === 'quat_tram_huong');
  const hasNgocBoi = selectedAccessories.some(a => a.id === 'ngoc_boi_trieu_dinh');

  const isAoNguThan = costumeType === 'ao_ngu_than_tay_chen';
  const isWideSleeve = costumeType === 'ao_tac_tay_thung';
  const isNhatBinh = costumeType === 'ao_nhat_binh';
  const isAoDai = costumeType === 'ao_dai_truyen_thong';
  const isTuThan = costumeType === 'ao_tu_than';
  const isGiaoLinh = costumeType === 'ao_giao_linh';
  const isDoiKham = costumeType === 'ao_doi_kham';

  // Chất liệu viền vàng kim cao cấp
  const goldTrimMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#D4AF37'),
      roughness: 0.22,
      metalness: 0.85
    });
  }, []);

  // Lụa tơ tằm hai mặt cho tà áo buông rủ
  const silkFlapMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(costumeColor),
      roughness: 0.38,
      metalness: 0.12,
      side: THREE.DoubleSide
    });
  }, [costumeColor]);

  // Nhuộm màu trang phục lên quần áo người thật mà vẫn giữ nguyên nếp gấp và chi tiết vải
  useEffect(() => {
    if (!clonedScene) return;

    clonedScene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        // Áo trên: Áo ngũ thân / Áo dài nhuộm màu di sản
        if (child.name === 'Wolf3D_Outfit_Top') {
          child.material = child.material.clone();
          child.material.color = new THREE.Color(costumeColor);
          child.material.roughness = 0.42;
          child.material.metalness = 0.15;
          child.material.needsUpdate = true;
        }

        // Quần lụa: Quần thụng lụa trắng ngà hoặc đen
        if (child.name === 'Wolf3D_Outfit_Bottom') {
          child.material = child.material.clone();
          child.material.color = new THREE.Color(pantColor);
          child.material.roughness = 0.52;
          child.material.needsUpdate = true;
        }

        // Giày dép: Giày hài nhung hoặc Sneaker
        if (child.name === 'Wolf3D_Outfit_Footwear') {
          child.material = child.material.clone();
          if (hasSneaker) {
            child.material.color = new THREE.Color('#FFFFFF');
          } else {
            child.material.color = new THREE.Color(costumeColor === '#8C1D18' ? '#3B0A08' : '#141722');
          }
          child.material.needsUpdate = true;
        }
      }
    });
  }, [clonedScene, costumeColor, pantColor, hasSneaker]);

  // Chuyển động nhịp thở và tà áo mềm mại
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.y = -0.9 + Math.sin(t * 1.6) * 0.006;
    }
    // Tà trước đung đưa mềm mại theo gió
    if (frontFlapRef.current) {
      frontFlapRef.current.rotation.x = Math.sin(t * 1.5) * 0.04 + 0.02;
    }
    // Tà sau bay nhẹ
    if (backFlapRef.current) {
      backFlapRef.current.rotation.x = -Math.cos(t * 1.4) * 0.03 - 0.02;
    }
    if (fanGroupRef.current) {
      fanGroupRef.current.rotation.z = -0.2 + Math.sin(t * 2) * 0.04;
    }
  });

  return (
    <group
      ref={groupRef}
      position={[0, -0.9, 0]}
      scale={[scaleShoulder, scaleHeight, (scaleChest + scaleWaist) / 2]}
    >
      {/* 1. MÔ HÌNH 3D NGƯỜI MÔ PHỎNG (GLTF Human Model) */}
      <primitive object={clonedScene} />

      {/* 2. CỔ ÁO ĐẶC TRƯNG TỪNG LOẠI CỔ PHỤC */}
      {/* Cổ Lập Lĩnh (Áo Ngũ Thân & Áo Tấc & Áo Dài) */}
      {(isAoNguThan || isWideSleeve || isAoDai) && (
        <group position={[0, 1.45, 0.02]}>
          <mesh material={goldTrimMaterial}>
            <torusGeometry args={[0.068, 0.004, 12, 32]} />
          </mesh>
          <mesh position={[0.035, -0.04, 0.08]} material={goldTrimMaterial}>
            <sphereGeometry args={[0.007, 12, 12]} />
          </mesh>
          <mesh position={[0.042, -0.08, 0.075]} material={goldTrimMaterial}>
            <sphereGeometry args={[0.007, 12, 12]} />
          </mesh>
          <mesh position={[0.048, -0.13, 0.068]} material={goldTrimMaterial}>
            <sphereGeometry args={[0.007, 12, 12]} />
          </mesh>
        </group>
      )}

      {/* Cổ Chữ Nhật Nhật Bình & Dải Ngũ Sắc Triều Nguyễn */}
      {isNhatBinh && (
        <group position={[0, 1.34, 0.09]}>
          {/* Cổ viền chữ nhật to bản vàng kim */}
          <mesh material={goldTrimMaterial}>
            <boxGeometry args={[0.16, 0.22, 0.006]} />
          </mesh>
          {/* Dải ngũ sắc trước ngực (Kim, Mộc, Thủy, Hỏa, Thổ) */}
          <group position={[0, -0.12, 0.004]}>
            <mesh position={[-0.04, 0, 0]}>
              <boxGeometry args={[0.016, 0.24, 0.002]} />
              <meshBasicMaterial color="#3182CE" />
            </mesh>
            <mesh position={[-0.02, 0, 0]}>
              <boxGeometry args={[0.016, 0.24, 0.002]} />
              <meshBasicMaterial color="#E53E3E" />
            </mesh>
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.016, 0.24, 0.002]} />
              <meshBasicMaterial color="#ECC94B" />
            </mesh>
            <mesh position={[0.02, 0, 0]}>
              <boxGeometry args={[0.016, 0.24, 0.002]} />
              <meshBasicMaterial color="#F7FAFC" />
            </mesh>
            <mesh position={[0.04, 0, 0]}>
              <boxGeometry args={[0.016, 0.24, 0.002]} />
              <meshBasicMaterial color="#2B6CB0" />
            </mesh>
          </group>
        </group>
      )}

      {/* Cổ Giao Lĩnh (Vạt Chéo Phải Đè Trái Thời Lý - Trần - Lê) */}
      {isGiaoLinh && (
        <group position={[0, 1.36, 0.08]}>
          {/* Vạt chéo trái */}
          <mesh position={[-0.04, 0.04, 0]} rotation={[0, 0, -0.42]} material={goldTrimMaterial}>
            <boxGeometry args={[0.018, 0.2, 0.004]} />
          </mesh>
          {/* Vạt chéo phải đè lên */}
          <mesh position={[0.04, 0.04, 0.004]} rotation={[0, 0, 0.42]} material={goldTrimMaterial}>
            <boxGeometry args={[0.018, 0.2, 0.004]} />
          </mesh>
          {/* Đai thắt lưng to bản (Đại Đái) */}
          <mesh position={[0, -0.22, 0.01]} material={goldTrimMaterial}>
            <boxGeometry args={[0.26 * scaleWaist, 0.05, 0.01]} />
          </mesh>
        </group>
      )}

      {/* Áo Đối Khâm (Hai Vạt Song Song Mở Ngực) */}
      {isDoiKham && (
        <group position={[0, 1.28, 0.09]}>
          <mesh position={[-0.07, 0, 0]} material={goldTrimMaterial}>
            <boxGeometry args={[0.022, 0.38, 0.004]} />
          </mesh>
          <mesh position={[0.07, 0, 0]} material={goldTrimMaterial}>
            <boxGeometry args={[0.022, 0.38, 0.004]} />
          </mesh>
        </group>
      )}

      {/* Áo Tứ Thân (Yếm Đào Lộ Cổ & Thắt Lưng Lụa Đào Thắt Nút) */}
      {isTuThan && (
        <group position={[0, 1.35, 0.085]}>
          {/* Yếm đào hồng thắm */}
          <mesh position={[0, 0.04, -0.005]}>
            <planeGeometry args={[0.13, 0.14]} />
            <meshStandardMaterial color="#E53E3E" roughness={0.35} />
          </mesh>
          {/* Thắt lưng lụa đào xanh/hồng buộc vạt trước bụng */}
          <mesh position={[0, -0.2, 0.01]}>
            <boxGeometry args={[0.24 * scaleWaist, 0.045, 0.012]} />
            <meshStandardMaterial color="#ED8936" roughness={0.4} />
          </mesh>
          {/* Dải thắt lưng rủ xuống */}
          <mesh position={[-0.03, -0.32, 0.015]} rotation={[0, 0, 0.1]}>
            <boxGeometry args={[0.03, 0.22, 0.004]} />
            <meshStandardMaterial color="#ED8936" roughness={0.4} />
          </mesh>
          <mesh position={[0.02, -0.34, 0.015]} rotation={[0, 0, -0.1]}>
            <boxGeometry args={[0.03, 0.26, 0.004]} />
            <meshStandardMaterial color="#E53E3E" roughness={0.4} />
          </mesh>
        </group>
      )}

      {/* 3. TÀ ÁO TRƯỚC VÀ SAU XẺ HÔNG CHUẨN TRUYỀN THỐNG */}
      <group
        ref={frontFlapRef}
        position={[0, 0.96, 0.12]}
        scale={[scaleWaist, 1, 1]}
      >
        <mesh material={silkFlapMaterial} castShadow>
          <planeGeometry args={[0.28 * scaleWaist, isAoDai ? 0.76 : isTuThan ? 0.58 : 0.64, 8, 8]} />
        </mesh>
        <mesh
          position={[0, -(isAoDai ? 0.38 : isTuThan ? 0.29 : 0.32), 0.002]}
          material={goldTrimMaterial}
        >
          <boxGeometry args={[0.28 * scaleWaist, 0.008, 0.002]} />
        </mesh>
      </group>

      <group
        ref={backFlapRef}
        position={[0, 0.96, -0.12]}
        scale={[scaleWaist, 1, 1]}
        rotation={[0, Math.PI, 0]}
      >
        <mesh material={silkFlapMaterial} castShadow>
          <planeGeometry args={[0.28 * scaleWaist, isAoDai ? 0.76 : 0.64, 8, 8]} />
        </mesh>
        <mesh
          position={[0, -(isAoDai ? 0.38 : 0.32), 0.002]}
          material={goldTrimMaterial}
        >
          <boxGeometry args={[0.28 * scaleWaist, 0.008, 0.002]} />
        </mesh>
      </group>

      {/* 4. ỐNG TAY THỤNG ĐẠI LỄ KHI CHỌN ÁO TẤC HOẶC GIAO LĨNH / ĐỐI KHÂM */}
      {(isWideSleeve || isGiaoLinh || isDoiKham) && (
        <group position={[0, 1.25, 0]}>
          <mesh
            position={[0.27 * scaleShoulder, -0.16, 0]}
            rotation={[0, 0, -0.14]}
            material={silkFlapMaterial}
            castShadow
          >
            <boxGeometry args={[0.2 * scaleArm, 0.42, 0.02]} />
          </mesh>
          <mesh
            position={[-0.27 * scaleShoulder, -0.16, 0]}
            rotation={[0, 0, 0.14]}
            material={silkFlapMaterial}
            castShadow
          >
            <boxGeometry args={[0.2 * scaleArm, 0.42, 0.02]} />
          </mesh>
        </group>
      )}

      {/* 5. PHỤ KIỆN ĐẦU (Khăn Đóng Cung Đình hoặc Kính Râm) */}
      <group position={[0, 1.68, 0]}>
        {hasKhanDong && (
          <group position={[0, 0.05, -0.015]}>
            <mesh castShadow>
              <torusGeometry args={[0.096, 0.026, 16, 48]} />
              <meshStandardMaterial
                color={costumeColor === '#8C1D18' ? '#4A0E0B' : '#181C26'}
                roughness={0.4}
              />
            </mesh>
            <mesh position={[0, 0.018, 0]} castShadow>
              <torusGeometry args={[0.092, 0.022, 16, 48]} />
              <meshStandardMaterial
                color={costumeColor === '#8C1D18' ? '#6B1410' : '#252936'}
                roughness={0.4}
              />
            </mesh>
            <mesh position={[0, 0.035, 0.098]} material={goldTrimMaterial}>
              <sphereGeometry args={[0.01, 16, 16]} />
            </mesh>
          </group>
        )}

        {hasKinhRam && (
          <group position={[0, -0.01, 0.102]}>
            <mesh castShadow>
              <boxGeometry args={[0.13, 0.026, 0.015]} />
              <meshStandardMaterial color="#0A0A0A" metalness={0.9} roughness={0.1} />
            </mesh>
          </group>
        )}
      </group>

      {/* 6. PHỤ KIỆN CẦM TAY & SƯỜN ÁO */}
      {hasQuat && (
        <group
          ref={fanGroupRef}
          position={[-0.3 * scaleShoulder, 0.95, 0.06]}
          rotation={[0.35, 0.2, -0.45]}
        >
          <mesh castShadow>
            <coneGeometry args={[0.14, 0.2, 16, 1, false, 0, Math.PI * 0.85]} />
            <meshStandardMaterial
              color="#B89047"
              roughness={0.3}
              metalness={0.4}
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh position={[0, -0.04, 0]} material={goldTrimMaterial}>
            <cylinderGeometry args={[0.004, 0.004, 0.1, 8]} />
          </mesh>
        </group>
      )}

      {hasNgocBoi && (
        <group position={[0.14 * scaleShoulder, 0.94, 0.08]}>
          <mesh material={goldTrimMaterial}>
            <cylinderGeometry args={[0.02, 0.02, 0.006, 24]} />
          </mesh>
          <mesh position={[0, -0.07, 0]}>
            <cylinderGeometry args={[0.004, 0.012, 0.12, 16]} />
            <meshStandardMaterial color="#D4AF37" roughness={0.4} />
          </mesh>
        </group>
      )}
    </group>
  );
}

useGLTF.preload('/avatar_human.glb');
