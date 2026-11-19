"use client";

import { useCharacterMotion } from "../useCharacterMotion";
import { AnimalEyes } from "./AnimalEyes";

// ISTJ 거북이: 실제 거북이처럼 넓고 둥근 등딱지가 몸의 중심이고, 앞쪽으로 머리가 뻗어 나온 4족 형태
export function TurtleCharacter() {
  const { rootRef, headRef, leftEyeRef, rightEyeRef, triggerJump } =
    useCharacterMotion("ISTJ");

  return (
    <group
      ref={rootRef}
      onClick={(e) => {
        e.stopPropagation();
        triggerJump();
      }}
    >
      {/* 둥글고 단단한 거북이 등딱지 (앞에서 봐도 양옆으로 넓게 보이도록 크게 배치) */}
      <mesh position={[0, -0.1, -0.12]} scale={[1.48, 0.96, 1.32]} castShadow receiveShadow>
        <sphereGeometry args={[0.68, 20, 20]} />
        <meshStandardMaterial color="#3d8c5a" roughness={0.42} />
      </mesh>
      {/* 등딱지 테두리 */}
      <mesh position={[0, -0.32, -0.12]} scale={[1.56, 0.3, 1.38]}>
        <sphereGeometry args={[0.68, 20, 20]} />
        <meshStandardMaterial color="#d8f3dc" roughness={0.45} />
      </mesh>
      {/* 등딱지 위 육각 무늬 느낌의 포인트 */}
      {[
        [0, 0.44, -0.12],
        [-0.46, 0.2, -0.12],
        [0.46, 0.2, -0.12],
        [0, 0.24, -0.48],
      ].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]} scale={[1.15, 0.48, 1]}>
          <sphereGeometry args={[0.18, 12, 12]} />
          <meshStandardMaterial color="#2b6b43" roughness={0.45} />
        </mesh>
      ))}
      {/* 연한 배딱지 */}
      <mesh position={[0, -0.44, -0.08]} scale={[1.32, 0.35, 1.2]}>
        <sphereGeometry args={[0.62, 16, 16]} />
        <meshStandardMaterial color="#f2e8cf" roughness={0.48} />
      </mesh>

      {/* 앞쪽으로 뻗은 목과 둥근 거북이 머리 (귀 없음) */}
      <group ref={headRef} position={[0, -0.05, 0.72]}>
        <mesh position={[0, -0.12, -0.22]} rotation={[0.55, 0, 0]}>
          <capsuleGeometry args={[0.18, 0.28, 8, 12]} />
          <meshStandardMaterial color="#8fd1a6" roughness={0.38} />
        </mesh>
        <mesh position={[0, 0.06, 0.08]} scale={[1.02, 0.95, 1.08]} castShadow>
          <sphereGeometry args={[0.38, 18, 18]} />
          <meshStandardMaterial color="#8fd1a6" roughness={0.38} />
        </mesh>
        <AnimalEyes
          leftEyeRef={leftEyeRef}
          rightEyeRef={rightEyeRef}
          leftPos={[-0.16, 0.1, 0.44]}
          rightPos={[0.16, 0.1, 0.44]}
          radius={0.07}
        />
        {/* 볼터치 */}
        {[-0.24, 0.24].map((x) => (
          <mesh key={x} position={[x, -0.02, 0.39]} scale={[1.1, 0.8, 0.4]}>
            <sphereGeometry args={[0.055, 10, 10]} />
            <meshStandardMaterial color="#ffb3c6" roughness={0.45} />
          </mesh>
        ))}
        {/* 미소 입 */}
        <mesh position={[0, -0.06, 0.47]} scale={[1.4, 0.5, 0.5]}>
          <sphereGeometry args={[0.05, 10, 10]} />
          <meshStandardMaterial color="#2f593f" roughness={0.4} />
        </mesh>
      </group>

      {/* 4개의 짧고 뭉툭한 거북이 다리(지느러미발) */}
      {[
        [-0.58, -0.58, 0.34, 0.3],
        [0.58, -0.58, 0.34, -0.3],
        [-0.54, -0.58, -0.44, 0.2],
        [0.54, -0.58, -0.44, -0.2],
      ].map(([x, y, z, rz], i) => (
        <mesh key={i} position={[x, y, z]} rotation={[0, 0, rz]} castShadow>
          <capsuleGeometry args={[0.14, 0.22, 8, 12]} />
          <meshStandardMaterial color="#76bf91" roughness={0.4} />
        </mesh>
      ))}

      {/* 뒤쪽 작은 거북이 꼬리 */}
      <mesh position={[0, -0.46, -0.92]} rotation={[-1.1, 0, 0]}>
        <coneGeometry args={[0.08, 0.24, 10]} />
        <meshStandardMaterial color="#76bf91" roughness={0.4} />
      </mesh>
    </group>
  );
}

// ISTP 고슴도치: 낮고 둥근 물방울 몸체 위에 빽빽한 밤색 가시 돔이 덮이고, 앞쪽으로 뾰족한 주둥이가 나온 형태
export function HedgehogCharacter() {
  const { rootRef, headRef, leftEyeRef, rightEyeRef, triggerJump } =
    useCharacterMotion("ISTP");

  return (
    <group
      ref={rootRef}
      onClick={(e) => {
        e.stopPropagation();
        triggerJump();
      }}
    >
      {/* 복슬한 크림색 배와 몸통 */}
      <mesh position={[0, -0.24, 0.14]} scale={[1.05, 0.85, 1.15]} castShadow receiveShadow>
        <sphereGeometry args={[0.62, 20, 20]} />
        <meshStandardMaterial color="#fff1e0" roughness={0.45} />
      </mesh>

      {/* 등과 머리 위를 감싸는 갈색 가시 돔 */}
      <mesh position={[0, -0.05, -0.14]} scale={[1.12, 1.02, 1.18]} castShadow>
        <sphereGeometry args={[0.68, 20, 20]} />
        <meshStandardMaterial color="#7d614d" roughness={0.55} />
      </mesh>

      {/* 사방으로 삐죽삐죽 돋아난 가시 원뿔들 (정면 실루엣에서도 뚜렷함) */}
      {[
        [0, 0.68, -0.05, -0.2, 0],
        [-0.36, 0.58, -0.05, -0.2, 0.55],
        [0.36, 0.58, -0.05, -0.2, -0.55],
        [-0.66, 0.28, -0.05, -0.1, 1.05],
        [0.66, 0.28, -0.05, -0.1, -1.05],
        [-0.72, -0.08, -0.08, 0, 1.35],
        [0.72, -0.08, -0.08, 0, -1.35],
        [0, 0.5, -0.45, -0.75, 0],
        [-0.42, 0.36, -0.42, -0.7, 0.5],
        [0.42, 0.36, -0.42, -0.7, -0.5],
      ].map(([x, y, z, rx, rz], i) => (
        <mesh key={i} position={[x, y, z]} rotation={[rx, 0, rz]} castShadow>
          <coneGeometry args={[0.13, 0.38, 10]} />
          <meshStandardMaterial color="#614837" roughness={0.5} />
        </mesh>
      ))}

      {/* 앞쪽으로 뾰족하게 나온 고슴도치 얼굴과 코 */}
      <group ref={headRef} position={[0, -0.12, 0.54]}>
        <mesh scale={[1.0, 0.85, 1.05]}>
          <sphereGeometry args={[0.38, 18, 18]} />
          <meshStandardMaterial color="#fff1e0" roughness={0.42} />
        </mesh>
        {/* 뾰족한 주둥이 */}
        <mesh position={[0, -0.05, 0.36]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.16, 0.3, 14]} />
          <meshStandardMaterial color="#fff1e0" roughness={0.42} />
        </mesh>
        {/* 까만 코 끝 */}
        <mesh position={[0, -0.05, 0.51]}>
          <sphereGeometry args={[0.058, 12, 12]} />
          <meshStandardMaterial color="#2c221e" roughness={0.2} />
        </mesh>
        {/* 작은 둥근 귀 */}
        {[-0.32, 0.32].map((x) => (
          <mesh key={x} position={[x, 0.24, -0.06]}>
            <sphereGeometry args={[0.1, 12, 12]} />
            <meshStandardMaterial color="#f2d5be" roughness={0.45} />
          </mesh>
        ))}
        <AnimalEyes
          leftEyeRef={leftEyeRef}
          rightEyeRef={rightEyeRef}
          leftPos={[-0.17, 0.08, 0.32]}
          rightPos={[0.17, 0.08, 0.32]}
          radius={0.062}
        />
      </group>

      {/* 작은 발 4개 */}
      {[
        [-0.3, -0.78, 0.4],
        [0.3, -0.78, 0.4],
        [-0.32, -0.78, -0.2],
        [0.32, -0.78, -0.2],
      ].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]} scale={[1, 0.65, 1.3]} castShadow>
          <sphereGeometry args={[0.11, 10, 10]} />
          <meshStandardMaterial color="#d4b8a0" roughness={0.45} />
        </mesh>
      ))}
    </group>
  );
}

// ESFJ 양: 구름처럼 몽글몽글 뭉친 하얀 양털 몸통에 갸름한 크림색 얼굴, 옆으로 처진 귀, 가느다란 발굽 다리
export function SheepCharacter() {
  const { rootRef, headRef, leftEyeRef, rightEyeRef, triggerJump } =
    useCharacterMotion("ESFJ");

  return (
    <group
      ref={rootRef}
      onClick={(e) => {
        e.stopPropagation();
        triggerJump();
      }}
    >
      {/* 구름 모양 몽글몽글 양털 몸통 (여러 개의 포근한 구 조합) */}
      <group position={[0, -0.32, -0.04]}>
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[0.56, 18, 18]} />
          <meshStandardMaterial color="#fffaf4" roughness={0.62} />
        </mesh>
        {[
          [-0.38, 0.14, 0.14],
          [0.38, 0.14, 0.14],
          [-0.38, -0.14, 0.12],
          [0.38, -0.14, 0.12],
          [0, 0.24, 0.26],
          [0, -0.18, 0.28],
          [0, 0.06, -0.38],
          [-0.3, -0.1, -0.28],
          [0.3, -0.1, -0.28],
        ].map(([x, y, z], i) => (
          <mesh key={i} position={[x, y, z]} castShadow>
            <sphereGeometry args={[0.3, 14, 14]} />
            <meshStandardMaterial color="#fffaf4" roughness={0.62} />
          </mesh>
        ))}
      </group>

      {/* 가느다란 다리와 어두운 발굽 4개 */}
      {[
        [-0.24, -0.84, 0.22],
        [0.24, -0.84, 0.22],
        [-0.24, -0.84, -0.24],
        [0.24, -0.84, -0.24],
      ].map(([x, y, z], i) => (
        <group key={i} position={[x, y, z]}>
          <mesh castShadow>
            <capsuleGeometry args={[0.075, 0.22, 8, 12]} />
            <meshStandardMaterial color="#f4d9c6" roughness={0.45} />
          </mesh>
          <mesh position={[0, -0.14, 0]}>
            <cylinderGeometry args={[0.075, 0.085, 0.09, 12]} />
            <meshStandardMaterial color="#594740" roughness={0.4} />
          </mesh>
        </group>
      ))}

      {/* 크림색 양 머리와 정수리 몽실 털 */}
      <group ref={headRef} position={[0, 0.34, 0.22]}>
        <mesh scale={[0.92, 0.96, 1.08]} castShadow>
          <sphereGeometry args={[0.48, 18, 18]} />
          <meshStandardMaterial color="#fbe4d2" roughness={0.42} />
        </mesh>
        {/* 정수리 털 뭉치 3개 */}
        {[
          [0, 0.46, 0.06],
          [-0.2, 0.42, 0.06],
          [0.2, 0.42, 0.06],
        ].map(([x, y, z], i) => (
          <mesh key={i} position={[x, y, z]} castShadow>
            <sphereGeometry args={[0.2, 14, 14]} />
            <meshStandardMaterial color="#fffaf4" roughness={0.62} />
          </mesh>
        ))}
        {/* 양옆으로 뻗은 부드러운 양 귀 */}
        {[-0.48, 0.48].map((x, idx) => (
          <mesh
            key={x}
            position={[x, 0.08, -0.02]}
            rotation={[0, 0, idx === 0 ? 1.15 : -1.15]}
            castShadow
          >
            <capsuleGeometry args={[0.08, 0.22, 8, 12]} />
            <meshStandardMaterial color="#f2b8c6" roughness={0.45} />
          </mesh>
        ))}
        <AnimalEyes
          leftEyeRef={leftEyeRef}
          rightEyeRef={rightEyeRef}
          leftPos={[-0.19, 0.05, 0.45]}
          rightPos={[0.19, 0.05, 0.45]}
          radius={0.07}
        />
        {/* 분홍 코 */}
        <mesh position={[0, -0.09, 0.5]} scale={[1.25, 0.85, 0.8]}>
          <sphereGeometry args={[0.058, 12, 12]} />
          <meshStandardMaterial color="#f28ca8" roughness={0.3} />
        </mesh>
      </group>
    </group>
  );
}

// INFJ 사슴: 우아한 목선과 날씬한 사슴 몸통, 갈라진 뿔, 하얀 앞가슴과 몸통 점박이, 가느다란 다리
export function DeerCharacter() {
  const { rootRef, headRef, leftEyeRef, rightEyeRef, triggerJump } =
    useCharacterMotion("INFJ");

  return (
    <group
      ref={rootRef}
      onClick={(e) => {
        e.stopPropagation();
        triggerJump();
      }}
    >
      {/* 날씬한 아기 사슴 몸통 */}
      <mesh position={[0, -0.38, -0.06]} scale={[0.78, 0.88, 1.12]} castShadow receiveShadow>
        <sphereGeometry args={[0.5, 20, 20]} />
        <meshStandardMaterial color="#d9b088" roughness={0.42} />
      </mesh>
      {/* 하얀 앞가슴 털 */}
      <mesh position={[0, -0.28, 0.34]} scale={[0.68, 0.85, 0.5]}>
        <sphereGeometry args={[0.32, 14, 14]} />
        <meshStandardMaterial color="#fff7ec" roughness={0.45} />
      </mesh>

      {/* 어깨·옆구리·등에 난 하얀 사슴 점 */}
      {[
        [-0.28, -0.28, 0.28],
        [0.28, -0.28, 0.28],
        [-0.36, -0.44, 0.04],
        [0.36, -0.44, 0.04],
        [-0.16, -0.24, -0.44],
        [0.16, -0.36, -0.46],
      ].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]}>
          <sphereGeometry args={[0.055, 10, 10]} />
          <meshStandardMaterial color="#fffaf2" roughness={0.45} />
        </mesh>
      ))}

      {/* 날씬한 사슴 목 */}
      <mesh position={[0, 0.08, 0.14]} rotation={[0.18, 0, 0]} castShadow>
        <capsuleGeometry args={[0.17, 0.34, 10, 14]} />
        <meshStandardMaterial color="#d9b088" roughness={0.42} />
      </mesh>

      {/* 가느다란 다리와 발굽 4개 */}
      {[
        [-0.2, -0.84, 0.22],
        [0.2, -0.84, 0.22],
        [-0.2, -0.84, -0.32],
        [0.2, -0.84, -0.32],
      ].map(([x, y, z], i) => (
        <group key={i} position={[x, y, z]}>
          <mesh castShadow>
            <capsuleGeometry args={[0.065, 0.28, 8, 12]} />
            <meshStandardMaterial color="#d9b088" roughness={0.42} />
          </mesh>
          <mesh position={[0, -0.17, 0]}>
            <cylinderGeometry args={[0.065, 0.075, 0.08, 10]} />
            <meshStandardMaterial color="#5c4033" roughness={0.35} />
          </mesh>
        </group>
      ))}

      {/* 하얀 꼬리 */}
      <mesh position={[0, -0.34, -0.62]} rotation={[0.4, 0, 0]}>
        <coneGeometry args={[0.09, 0.22, 10]} />
        <meshStandardMaterial color="#fff7ec" roughness={0.45} />
      </mesh>

      {/* 사슴 머리 (앞으로 살짝 나온 주둥이 + 가지 모양 뿔) */}
      <group ref={headRef} position={[0, 0.44, 0.2]}>
        <mesh scale={[0.92, 0.9, 1.05]} castShadow>
          <sphereGeometry args={[0.45, 18, 18]} />
          <meshStandardMaterial color="#d9b088" roughness={0.42} />
        </mesh>
        {/* 앞으로 살짝 나온 사슴 주둥이 */}
        <mesh position={[0, -0.1, 0.4]} scale={[0.95, 0.8, 1.05]}>
          <sphereGeometry args={[0.18, 14, 14]} />
          <meshStandardMaterial color="#fff4e4" roughness={0.42} />
        </mesh>
        <mesh position={[0, -0.05, 0.56]}>
          <sphereGeometry args={[0.055, 12, 12]} />
          <meshStandardMaterial color="#3d271d" roughness={0.25} />
        </mesh>
        {/* 가지 모양 뿔 2개 */}
        {[-0.24, 0.24].map((x, idx) => {
          const dir = idx === 0 ? -1 : 1;
          return (
            <group key={x} position={[x, 0.48, -0.02]} rotation={[0, 0, -dir * 0.22]}>
              <mesh castShadow>
                <capsuleGeometry args={[0.04, 0.38, 8, 10]} />
                <meshStandardMaterial color="#8c6244" roughness={0.45} />
              </mesh>
              <mesh position={[dir * 0.1, 0.08, 0]} rotation={[0, 0, -dir * 0.7]}>
                <capsuleGeometry args={[0.032, 0.18, 8, 10]} />
                <meshStandardMaterial color="#8c6244" roughness={0.45} />
              </mesh>
            </group>
          );
        })}
        {/* 옆으로 뻗은 사슴 귀 2개 */}
        {[-0.44, 0.44].map((x, idx) => (
          <mesh
            key={x}
            position={[x, 0.2, -0.06]}
            rotation={[0, 0, idx === 0 ? 0.75 : -0.75]}
          >
            <capsuleGeometry args={[0.075, 0.2, 8, 12]} />
            <meshStandardMaterial color="#d9b088" roughness={0.42} />
          </mesh>
        ))}
        <AnimalEyes
          leftEyeRef={leftEyeRef}
          rightEyeRef={rightEyeRef}
          leftPos={[-0.19, 0.05, 0.41]}
          rightPos={[0.19, 0.05, 0.41]}
          radius={0.07}
        />
      </group>
    </group>
  );
}
