"use client";

import { useCharacterMotion } from "../useCharacterMotion";
import { AnimalEyes } from "./AnimalEyes";

// INTJ 부엉이: 넓적한 얼굴 원반, 큰 금빛 눈테, 뾰족한 귀깃, 짧은 갈고리 부리, 계란형 몸통과 접힌 날개
export function OwlCharacter() {
  const { rootRef, headRef, leftEyeRef, rightEyeRef, triggerJump } =
    useCharacterMotion("INTJ");

  return (
    <group
      ref={rootRef}
      onClick={(e) => {
        e.stopPropagation();
        triggerJump();
      }}
    >
      {/* 둥글고 통통한 새 몸통 */}
      <mesh position={[0, -0.34, 0]} scale={[1.02, 1.18, 0.92]} castShadow receiveShadow>
        <sphereGeometry args={[0.56, 20, 20]} />
        <meshStandardMaterial color="#8d79cc" roughness={0.42} />
      </mesh>
      {/* 가슴 배 무늬 */}
      <mesh position={[0, -0.38, 0.25]} scale={[0.82, 0.95, 0.72]}>
        <sphereGeometry args={[0.42, 16, 16]} />
        <meshStandardMaterial color="#f2edff" roughness={0.48} />
      </mesh>
      {/* 배 위 작은 깃털 점 */}
      {[
        [-0.14, -0.28, 0.52],
        [0.14, -0.28, 0.52],
        [0, -0.44, 0.54],
      ].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]} scale={[1.3, 0.7, 0.4]}>
          <sphereGeometry args={[0.045, 8, 8]} />
          <meshStandardMaterial color="#b4a4e6" roughness={0.45} />
        </mesh>
      ))}

      {/* 양옆 접힌 날개 */}
      {[-0.56, 0.56].map((x, idx) => (
        <mesh
          key={x}
          position={[x, -0.36, 0.02]}
          rotation={[0.08, 0, idx === 0 ? 0.22 : -0.22]}
          scale={[0.38, 0.95, 0.75]}
          castShadow
        >
          <sphereGeometry args={[0.45, 16, 16]} />
          <meshStandardMaterial color="#6e5aad" roughness={0.42} />
        </mesh>
      ))}

      {/* 주황색 새 발가락 2쌍 */}
      {[-0.22, 0.22].map((x) => (
        <group key={x} position={[x, -0.98, 0.14]}>
          <mesh rotation={[Math.PI / 2, 0, -0.2]}>
            <capsuleGeometry args={[0.045, 0.18, 6, 10]} />
            <meshStandardMaterial color="#ffb347" roughness={0.35} />
          </mesh>
          <mesh position={[0.06, 0, 0]} rotation={[Math.PI / 2, 0, 0.2]}>
            <capsuleGeometry args={[0.045, 0.18, 6, 10]} />
            <meshStandardMaterial color="#ffb347" roughness={0.35} />
          </mesh>
        </group>
      ))}

      {/* 넓적한 부엉이 머리 */}
      <group ref={headRef} position={[0, 0.44, 0.02]}>
        <mesh scale={[1.1, 0.92, 0.92]} castShadow>
          <sphereGeometry args={[0.64, 20, 20]} />
          <meshStandardMaterial color="#8d79cc" roughness={0.4} />
        </mesh>
        {/* 뾰족한 귀깃 2개 */}
        <mesh position={[-0.46, 0.54, 0.02]} rotation={[0, 0, 0.42]} castShadow>
          <coneGeometry args={[0.14, 0.36, 12]} />
          <meshStandardMaterial color="#6e5aad" roughness={0.42} />
        </mesh>
        <mesh position={[0.46, 0.54, 0.02]} rotation={[0, 0, -0.42]} castShadow>
          <coneGeometry args={[0.14, 0.36, 12]} />
          <meshStandardMaterial color="#6e5aad" roughness={0.42} />
        </mesh>
        {/* 커다란 부엉이 눈테 2개 */}
        {[-0.26, 0.26].map((x) => (
          <group key={x} position={[x, 0.06, 0.48]}>
            <mesh scale={[1, 1, 0.4]}>
              <sphereGeometry args={[0.24, 16, 16]} />
              <meshStandardMaterial color="#ffffff" roughness={0.4} />
            </mesh>
            <mesh position={[0, 0, 0.04]} scale={[1, 1, 0.4]}>
              <sphereGeometry args={[0.17, 14, 14]} />
              <meshStandardMaterial color="#ffd88a" roughness={0.35} />
            </mesh>
          </group>
        ))}
        <AnimalEyes
          leftEyeRef={leftEyeRef}
          rightEyeRef={rightEyeRef}
          leftPos={[-0.26, 0.06, 0.58]}
          rightPos={[0.26, 0.06, 0.58]}
          radius={0.095}
        />
        {/* 부리 */}
        <mesh position={[0, -0.09, 0.64]} rotation={[Math.PI / 1.75, 0, 0]}>
          <coneGeometry args={[0.085, 0.2, 12]} />
          <meshStandardMaterial color="#ffb347" roughness={0.28} />
        </mesh>
      </group>
    </group>
  );
}

// ESTJ 펭귄: 목 경계 없이 매끈한 달걀형 몸, 검은 등과 하얀 얼굴·배, 납작한 노란 부리와 지느러미 날개
export function PenguinCharacter() {
  const { rootRef, headRef, leftEyeRef, rightEyeRef, triggerJump } =
    useCharacterMotion("ESTJ");

  return (
    <group
      ref={rootRef}
      onClick={(e) => {
        e.stopPropagation();
        triggerJump();
      }}
    >
      {/* 매끈한 달걀형 검은(짙은 네이비) 몸통 전체 */}
      <mesh position={[0, -0.08, 0]} scale={[0.96, 1.38, 0.88]} castShadow receiveShadow>
        <sphereGeometry args={[0.68, 22, 22]} />
        <meshStandardMaterial color="#2f3a52" roughness={0.35} />
      </mesh>

      {/* 하얀 배 */}
      <mesh position={[0, -0.26, 0.22]} scale={[0.85, 1.15, 0.72]}>
        <sphereGeometry args={[0.56, 18, 18]} />
        <meshStandardMaterial color="#ffffff" roughness={0.4} />
      </mesh>

      {/* 하트 모양 하얀 얼굴 패치 */}
      <group ref={headRef} position={[0, 0.44, 0.24]}>
        <mesh position={[-0.16, 0.04, 0.16]} scale={[0.9, 1.0, 0.7]}>
          <sphereGeometry args={[0.28, 16, 16]} />
          <meshStandardMaterial color="#ffffff" roughness={0.4} />
        </mesh>
        <mesh position={[0.16, 0.04, 0.16]} scale={[0.9, 1.0, 0.7]}>
          <sphereGeometry args={[0.28, 16, 16]} />
          <meshStandardMaterial color="#ffffff" roughness={0.4} />
        </mesh>

        <AnimalEyes
          leftEyeRef={leftEyeRef}
          rightEyeRef={rightEyeRef}
          leftPos={[-0.2, 0.07, 0.36]}
          rightPos={[0.2, 0.07, 0.36]}
          radius={0.072}
        />

        {/* 볼터치 */}
        {[-0.32, 0.32].map((x) => (
          <mesh key={x} position={[x, -0.05, 0.3]} scale={[1.2, 0.8, 0.4]}>
            <sphereGeometry args={[0.07, 10, 10]} />
            <meshStandardMaterial color="#ffb3c6" roughness={0.45} />
          </mesh>
        ))}

        {/* 펭귄 주황 부리 */}
        <mesh position={[0, -0.05, 0.44]} rotation={[Math.PI / 2, 0, 0]} scale={[1.25, 0.9, 0.7]}>
          <coneGeometry args={[0.11, 0.22, 14]} />
          <meshStandardMaterial color="#ffa726" roughness={0.3} />
        </mesh>
      </group>

      {/* 납작한 지느러미 날개 2개 */}
      {[-0.64, 0.64].map((x, idx) => (
        <mesh
          key={x}
          position={[x, -0.18, 0.02]}
          rotation={[0.1, 0, idx === 0 ? 0.38 : -0.38]}
          scale={[0.25, 1.1, 0.55]}
          castShadow
        >
          <sphereGeometry args={[0.42, 14, 14]} />
          <meshStandardMaterial color="#2f3a52" roughness={0.35} />
        </mesh>
      ))}

      {/* 납작한 주황색 물갈퀴 발 2개 */}
      {[-0.24, 0.24].map((x, idx) => (
        <mesh
          key={x}
          position={[x, -1.0, 0.2]}
          rotation={[0, idx === 0 ? 0.22 : -0.22, 0]}
          scale={[1.2, 0.38, 1.75]}
          castShadow
        >
          <sphereGeometry args={[0.14, 12, 12]} />
          <meshStandardMaterial color="#ffa726" roughness={0.35} />
        </mesh>
      ))}

      {/* 뒤쪽 짧은 펭귄 꼬리 */}
      <mesh position={[0, -0.78, -0.5]} rotation={[-0.6, 0, 0]}>
        <coneGeometry args={[0.14, 0.3, 12]} />
        <meshStandardMaterial color="#2f3a52" roughness={0.38} />
      </mesh>
    </group>
  );
}

// ESFP 앵무새: 날씬한 열대 새 체형, 알록달록한 깃털(코랄·노랑·민트), 굽은 부리, 머리 위 깃털 벼슬, 긴 꼬리깃
export function ParrotCharacter() {
  const { rootRef, headRef, tailRef, leftEyeRef, rightEyeRef, triggerJump } =
    useCharacterMotion("ESFP");

  return (
    <group
      ref={rootRef}
      onClick={(e) => {
        e.stopPropagation();
        triggerJump();
      }}
    >
      {/* 날씬한 앵무새 몸통 (코랄 레드 + 노란 가슴) */}
      <mesh position={[0, -0.28, 0]} scale={[0.85, 1.25, 0.85]} castShadow receiveShadow>
        <sphereGeometry args={[0.5, 20, 20]} />
        <meshStandardMaterial color="#ff6b7a" roughness={0.36} />
      </mesh>
      <mesh position={[0, -0.3, 0.22]} scale={[0.75, 1.05, 0.65]}>
        <sphereGeometry args={[0.38, 16, 16]} />
        <meshStandardMaterial color="#ffe066" roughness={0.4} />
      </mesh>

      {/* 청록색/민트 날개 2개 */}
      {[-0.46, 0.46].map((x, idx) => (
        <mesh
          key={x}
          position={[x, -0.3, -0.02]}
          rotation={[0.12, 0, idx === 0 ? 0.28 : -0.28]}
          scale={[0.32, 1.08, 0.68]}
          castShadow
        >
          <sphereGeometry args={[0.42, 14, 14]} />
          <meshStandardMaterial color="#38c9b9" roughness={0.38} />
        </mesh>
      ))}

      {/* 아래로 길게 뻗은 화려한 꼬리깃 */}
      <group ref={tailRef} position={[0, -0.78, -0.28]}>
        <mesh rotation={[-0.45, 0, 0]} castShadow>
          <capsuleGeometry args={[0.09, 0.45, 8, 12]} />
          <meshStandardMaterial color="#3b82f6" roughness={0.38} />
        </mesh>
        <mesh position={[-0.1, 0.04, -0.02]} rotation={[-0.45, 0, 0.16]}>
          <capsuleGeometry args={[0.07, 0.36, 8, 12]} />
          <meshStandardMaterial color="#ffe066" roughness={0.38} />
        </mesh>
      </group>

      {/* 발가락 */}
      {[-0.18, 0.18].map((x) => (
        <mesh key={x} position={[x, -0.94, 0.14]} scale={[1, 0.5, 1.5]}>
          <sphereGeometry args={[0.1, 10, 10]} />
          <meshStandardMaterial color="#f6ad55" roughness={0.35} />
        </mesh>
      ))}

      {/* 앵무새 머리 + 하얀 눈 주변 + 굽은 부리 + 머리 위 깃털 벼슬 */}
      <group ref={headRef} position={[0, 0.44, 0.04]}>
        <mesh scale={[0.92, 0.94, 0.94]} castShadow>
          <sphereGeometry args={[0.55, 20, 20]} />
          <meshStandardMaterial color="#ff6b7a" roughness={0.36} />
        </mesh>

        {/* 머리 위 알록달록 깃털 벼슬(보) */}
        <mesh position={[0, 0.62, 0.02]} rotation={[-0.25, 0, 0]} castShadow>
          <capsuleGeometry args={[0.075, 0.24, 8, 12]} />
          <meshStandardMaterial color="#ffe066" roughness={0.35} />
        </mesh>
        <mesh position={[-0.11, 0.58, -0.02]} rotation={[-0.2, 0, 0.35]} castShadow>
          <capsuleGeometry args={[0.065, 0.18, 8, 12]} />
          <meshStandardMaterial color="#38c9b9" roughness={0.35} />
        </mesh>
        <mesh position={[0.11, 0.58, -0.02]} rotation={[-0.2, 0, -0.35]} castShadow>
          <capsuleGeometry args={[0.065, 0.18, 8, 12]} />
          <meshStandardMaterial color="#5aa9ff" roughness={0.35} />
        </mesh>

        {/* 하얀 눈 주변 패치 */}
        {[-0.22, 0.22].map((x) => (
          <mesh key={x} position={[x, 0.06, 0.42]} scale={[1.15, 0.95, 0.4]}>
            <sphereGeometry args={[0.15, 14, 14]} />
            <meshStandardMaterial color="#ffffff" roughness={0.4} />
          </mesh>
        ))}

        <AnimalEyes
          leftEyeRef={leftEyeRef}
          rightEyeRef={rightEyeRef}
          leftPos={[-0.22, 0.06, 0.48]}
          rightPos={[0.22, 0.06, 0.48]}
          radius={0.072}
        />

        {/* 굽은 앵무새 부리 (윗부리 + 아랫부리) */}
        <mesh position={[0, -0.04, 0.58]} rotation={[Math.PI / 1.55, 0, 0]}>
          <coneGeometry args={[0.12, 0.26, 14]} />
          <meshStandardMaterial color="#ffd166" roughness={0.28} />
        </mesh>
        <mesh position={[0, -0.14, 0.54]} rotation={[Math.PI / 2.2, 0, 0]}>
          <coneGeometry args={[0.08, 0.14, 12]} />
          <meshStandardMaterial color="#4a4363" roughness={0.35} />
        </mesh>
      </group>
    </group>
  );
}
