"use client";

import type { RefObject } from "react";
import type { Group } from "three";

// 눈 깜빡임이 적용되는 반짝이는 동물 눈 한 쌍 컴포넌트
export function AnimalEyes({
  leftEyeRef,
  rightEyeRef,
  leftPos = [-0.24, 0.06, 0.62],
  rightPos = [0.24, 0.06, 0.62],
  radius = 0.08,
  irisColor = "#1f1b2e",
}: {
  leftEyeRef: RefObject<Group | null>;
  rightEyeRef: RefObject<Group | null>;
  leftPos?: [number, number, number];
  rightPos?: [number, number, number];
  radius?: number;
  irisColor?: string;
}) {
  return (
    <>
      <group ref={leftEyeRef} position={leftPos}>
        <mesh>
          <sphereGeometry args={[radius, 12, 12]} />
          <meshStandardMaterial color={irisColor} roughness={0.15} metalness={0.1} />
        </mesh>
        <mesh position={[-radius * 0.3, radius * 0.36, radius * 0.8]}>
          <sphereGeometry args={[radius * 0.3, 8, 8]} />
          <meshStandardMaterial color="#ffffff" roughness={0.1} />
        </mesh>
      </group>

      <group ref={rightEyeRef} position={rightPos}>
        <mesh>
          <sphereGeometry args={[radius, 12, 12]} />
          <meshStandardMaterial color={irisColor} roughness={0.15} metalness={0.1} />
        </mesh>
        <mesh position={[-radius * 0.3, radius * 0.36, radius * 0.8]}>
          <sphereGeometry args={[radius * 0.3, 8, 8]} />
          <meshStandardMaterial color="#ffffff" roughness={0.1} />
        </mesh>
      </group>
    </>
  );
}
