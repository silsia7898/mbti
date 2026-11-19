"use client";

import { Canvas } from "@react-three/fiber";
import { ContactShadows, OrbitControls } from "@react-three/drei";
import type { MbtiCode } from "@/data/types";
import MbtiCharacter from "./MbtiCharacter";

// 브라우저에서 3D 캔버스, 코드 기반 조명, 바닥 그림자, 회전 컨트롤을 렌더링하는 컴포넌트
export default function CharacterCanvas({
  typeCode = "ISFJ",
}: {
  typeCode?: MbtiCode;
}) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      // 배경을 투명하게 설정해 페이지의 파스텔 배경색이 그대로 비치게 합니다.
      gl={{ alpha: true, antialias: true }}
      camera={{ position: [0, 0.22, 4.35], fov: 38 }}
      className="h-full w-full touch-pan-y"
    >
      {/* 외부 환경맵(HDR) 없이 코드로만 만든 부드러운 조명 */}
      <ambientLight intensity={0.85} color="#fff9f5" />
      <hemisphereLight args={["#ffffff", "#d8f3ea", 0.65]} />
      <directionalLight
        position={[3, 5, 4]}
        intensity={1.1}
        color="#fff6ec"
        castShadow
      />
      <directionalLight
        position={[-3, 2, -2]}
        intensity={0.45}
        color="#e0f2fe"
      />

      {/* 선택된 유형의 3D 동물 캐릭터 */}
      <MbtiCharacter typeCode={typeCode} />

      {/* 캐릭터 아래 부드러운 바닥 그림자 (모바일 성능을 위해 해상도를 256으로 가볍게 유지) */}
      <ContactShadows
        position={[0, -1.24, 0]}
        opacity={0.35}
        scale={4.5}
        blur={2.4}
        far={2.5}
        resolution={256}
        color="#3b5e54"
      />

      {/* 드래그/터치로 캐릭터를 돌려 볼 수 있게 하고 확대/축소와 이동은 막습니다. */}
      <OrbitControls
        target={[0, 0.22, 0]}
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.85}
      />
    </Canvas>
  );
}
