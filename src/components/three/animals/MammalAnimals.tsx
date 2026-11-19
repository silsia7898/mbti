"use client";

import { useCharacterMotion } from "../useCharacterMotion";
import { AnimalEyes } from "./AnimalEyes";

// INTP 고양이: 날씬한 앉은 자세, 세모 귀, 수염, 모은 앞발, 옆으로 올라온 S자 고양이 꼬리
export function CatCharacter() {
  const { rootRef, headRef, tailRef, leftEyeRef, rightEyeRef, triggerJump } =
    useCharacterMotion("INTP");

  return (
    <group
      ref={rootRef}
      onClick={(e) => {
        e.stopPropagation();
        triggerJump();
      }}
    >
      {/* 날씬한 앉은 고양이 몸통 */}
      <mesh position={[0, -0.4, -0.04]} scale={[0.82, 1.08, 0.9]} castShadow receiveShadow>
        <sphereGeometry args={[0.48, 18, 18]} />
        <meshStandardMaterial color="#b4cff0" roughness={0.38} />
      </mesh>
      <mesh position={[0, -0.38, 0.25]} scale={[0.68, 0.88, 0.55]}>
        <sphereGeometry args={[0.32, 14, 14]} />
        <meshStandardMaterial color="#ffffff" roughness={0.42} />
      </mesh>

      {/* 앞으로 나란히 모은 앞발 2개 */}
      {[-0.14, 0.14].map((x) => (
        <mesh key={x} position={[x, -0.68, 0.34]} rotation={[0.35, 0, 0]} castShadow>
          <capsuleGeometry args={[0.09, 0.34, 8, 12]} />
          <meshStandardMaterial color="#b4cff0" roughness={0.38} />
        </mesh>
      ))}
      {/* 앉은 뒷다리 2개 */}
      {[-0.28, 0.28].map((x) => (
        <mesh key={x} position={[x, -0.84, 0.08]} scale={[0.9, 0.75, 1.35]} castShadow>
          <sphereGeometry args={[0.16, 12, 12]} />
          <meshStandardMaterial color="#9bbce6" roughness={0.38} />
        </mesh>
      ))}

      {/* 길고 우아하게 올라간 고양이 꼬리 */}
      <group ref={tailRef} position={[0.36, -0.72, -0.14]}>
        <mesh position={[0.14, 0.22, 0]} rotation={[0, 0, -0.55]} castShadow>
          <capsuleGeometry args={[0.055, 0.45, 8, 12]} />
          <meshStandardMaterial color="#9bbce6" roughness={0.38} />
        </mesh>
        <mesh position={[0.26, 0.52, 0]} rotation={[0, 0, 0.25]} castShadow>
          <capsuleGeometry args={[0.055, 0.26, 8, 12]} />
          <meshStandardMaterial color="#9bbce6" roughness={0.38} />
        </mesh>
      </group>

      {/* 고양이 머리: 약간 옆으로 넓은 얼굴 + 세모 귀 + 수염 */}
      <group ref={headRef} position={[0, 0.36, 0.04]}>
        <mesh scale={[1.08, 0.9, 0.94]} castShadow>
          <sphereGeometry args={[0.58, 20, 20]} />
          <meshStandardMaterial color="#b4cff0" roughness={0.38} />
        </mesh>
        {/* 세모 귀 2개 */}
        {[-0.4, 0.4].map((x, idx) => (
          <group
            key={x}
            position={[x, 0.5, -0.02]}
            rotation={[0, 0, idx === 0 ? 0.32 : -0.32]}
          >
            <mesh castShadow>
              <coneGeometry args={[0.18, 0.36, 12]} />
              <meshStandardMaterial color="#b4cff0" roughness={0.38} />
            </mesh>
            <mesh position={[0, -0.02, 0.06]}>
              <coneGeometry args={[0.1, 0.22, 12]} />
              <meshStandardMaterial color="#ff9ebb" roughness={0.45} />
            </mesh>
          </group>
        ))}
        <AnimalEyes
          leftEyeRef={leftEyeRef}
          rightEyeRef={rightEyeRef}
          leftPos={[-0.22, 0.04, 0.5]}
          rightPos={[0.22, 0.04, 0.5]}
          radius={0.075}
        />
        {/* 작은 분홍 코 */}
        <mesh position={[0, -0.07, 0.56]}>
          <sphereGeometry args={[0.05, 10, 10]} />
          <meshStandardMaterial color="#ff8eb3" roughness={0.3} />
        </mesh>
        {/* 수염 4가닥 */}
        {[-1, 1].map((dir) => (
          <group key={dir}>
            <mesh
              position={[dir * 0.42, -0.06, 0.48]}
              rotation={[0, 0, dir * 0.12 + Math.PI / 2]}
            >
              <cylinderGeometry args={[0.011, 0.011, 0.32, 6]} />
              <meshStandardMaterial color="#4a4363" />
            </mesh>
            <mesh
              position={[dir * 0.42, -0.14, 0.47]}
              rotation={[0, 0, -dir * 0.12 + Math.PI / 2]}
            >
              <cylinderGeometry args={[0.011, 0.011, 0.32, 6]} />
              <meshStandardMaterial color="#4a4363" />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

// ENTJ 사자: 당당한 가슴과 굵은 앞다리, 얼굴을 두른 풍성한 갈기, 끝이 뭉실한 꼬리
export function LionCharacter() {
  const { rootRef, headRef, tailRef, leftEyeRef, rightEyeRef, triggerJump } =
    useCharacterMotion("ENTJ");

  return (
    <group
      ref={rootRef}
      onClick={(e) => {
        e.stopPropagation();
        triggerJump();
      }}
    >
      {/* 듬직한 사자 몸통과 가슴 털 */}
      <mesh position={[0, -0.42, -0.04]} scale={[0.96, 1.05, 0.96]} castShadow receiveShadow>
        <sphereGeometry args={[0.5, 18, 18]} />
        <meshStandardMaterial color="#f2b86e" roughness={0.4} />
      </mesh>
      <mesh position={[0, -0.3, 0.24]} scale={[0.85, 0.9, 0.65]}>
        <sphereGeometry args={[0.35, 14, 14]} />
        <meshStandardMaterial color="#fff1d6" roughness={0.45} />
      </mesh>

      {/* 굵직한 앞다리 2개 */}
      {[-0.22, 0.22].map((x) => (
        <mesh key={x} position={[x, -0.68, 0.26]} rotation={[0.2, 0, 0]} castShadow>
          <capsuleGeometry args={[0.12, 0.34, 8, 12]} />
          <meshStandardMaterial color="#f2b86e" roughness={0.4} />
        </mesh>
      ))}
      {/* 앉은 뒷다리 */}
      {[-0.36, 0.36].map((x) => (
        <mesh key={x} position={[x, -0.84, 0.04]} scale={[0.9, 0.75, 1.3]} castShadow>
          <sphereGeometry args={[0.17, 12, 12]} />
          <meshStandardMaterial color="#e0a255" roughness={0.4} />
        </mesh>
      ))}

      {/* 끝에 털 뭉치가 달린 사자 꼬리 */}
      <group ref={tailRef} position={[0.42, -0.68, -0.14]}>
        <mesh position={[0.12, 0.2, 0]} rotation={[0, 0, -0.5]} castShadow>
          <capsuleGeometry args={[0.045, 0.42, 8, 10]} />
          <meshStandardMaterial color="#f2b86e" roughness={0.4} />
        </mesh>
        <mesh position={[0.24, 0.44, 0]} castShadow>
          <sphereGeometry args={[0.12, 12, 12]} />
          <meshStandardMaterial color="#c96e28" roughness={0.5} />
        </mesh>
      </group>

      {/* 사자 머리와 풍성한 갈기 */}
      <group ref={headRef} position={[0, 0.38, 0.04]}>
        {/* 갈기 14조각 */}
        {Array.from({ length: 14 }).map((_, i) => {
          const angle = (i / 14) * Math.PI * 2;
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * 0.58, Math.sin(angle) * 0.58, -0.06]}
              castShadow
            >
              <sphereGeometry args={[0.24, 12, 12]} />
              <meshStandardMaterial color="#d4782e" roughness={0.5} />
            </mesh>
          );
        })}
        <mesh castShadow>
          <sphereGeometry args={[0.56, 18, 18]} />
          <meshStandardMaterial color="#f2b86e" roughness={0.38} />
        </mesh>
        {/* 둥근 귀 2개 */}
        {[-0.44, 0.44].map((x) => (
          <mesh key={x} position={[x, 0.48, 0.06]}>
            <sphereGeometry args={[0.14, 12, 12]} />
            <meshStandardMaterial color="#f2b86e" roughness={0.38} />
          </mesh>
        ))}
        <AnimalEyes
          leftEyeRef={leftEyeRef}
          rightEyeRef={rightEyeRef}
          leftPos={[-0.2, 0.08, 0.49]}
          rightPos={[0.2, 0.08, 0.49]}
          radius={0.072}
        />
        {/* 입체적인 사자 주둥이와 코 */}
        <mesh position={[0, -0.1, 0.52]} scale={[1.25, 0.9, 0.85]}>
          <sphereGeometry args={[0.18, 14, 14]} />
          <meshStandardMaterial color="#fff1d6" roughness={0.42} />
        </mesh>
        <mesh position={[0, -0.04, 0.67]} scale={[1.25, 0.9, 0.8]}>
          <sphereGeometry args={[0.068, 12, 12]} />
          <meshStandardMaterial color="#4a2e1f" roughness={0.25} />
        </mesh>
      </group>
    </group>
  );
}

// ENTP 여우: 날렵한 체형, 큰 뾰족 귀, 뾰족한 주둥이와 하얀 볼 털, 끝이 하얀 풍성한 꼬리
export function FoxCharacter() {
  const { rootRef, headRef, tailRef, leftEyeRef, rightEyeRef, triggerJump } =
    useCharacterMotion("ENTP");

  return (
    <group
      ref={rootRef}
      onClick={(e) => {
        e.stopPropagation();
        triggerJump();
      }}
    >
      {/* 날렵한 여우 몸통 + 하얀 앞가슴 */}
      <mesh position={[0, -0.4, -0.04]} scale={[0.84, 1.06, 0.92]} castShadow receiveShadow>
        <sphereGeometry args={[0.48, 18, 18]} />
        <meshStandardMaterial color="#f48c56" roughness={0.4} />
      </mesh>
      <mesh position={[0, -0.34, 0.24]} scale={[0.72, 0.9, 0.55]}>
        <sphereGeometry args={[0.32, 14, 14]} />
        <meshStandardMaterial color="#fff8f0" roughness={0.45} />
      </mesh>
      {/* 짙은 갈색 앞발 */}
      {[-0.16, 0.16].map((x) => (
        <mesh key={x} position={[x, -0.68, 0.3]} rotation={[0.3, 0, 0]} castShadow>
          <capsuleGeometry args={[0.085, 0.34, 8, 12]} />
          <meshStandardMaterial color="#4a3b32" roughness={0.42} />
        </mesh>
      ))}
      {[-0.28, 0.28].map((x) => (
        <mesh key={x} position={[x, -0.84, 0.08]} scale={[0.9, 0.75, 1.3]} castShadow>
          <sphereGeometry args={[0.15, 12, 12]} />
          <meshStandardMaterial color="#4a3b32" roughness={0.42} />
        </mesh>
      ))}

      {/* 끝이 하얀 크고 풍성한 여우 꼬리 */}
      <group ref={tailRef} position={[0.36, -0.64, -0.18]} rotation={[0.15, 0.4, -0.65]}>
        <mesh position={[0.12, 0.22, -0.08]} castShadow>
          <capsuleGeometry args={[0.17, 0.38, 10, 14]} />
          <meshStandardMaterial color="#f48c56" roughness={0.42} />
        </mesh>
        <mesh position={[0.12, 0.48, -0.08]} castShadow>
          <sphereGeometry args={[0.16, 12, 12]} />
          <meshStandardMaterial color="#fff8f0" roughness={0.45} />
        </mesh>
      </group>

      {/* 여우 머리: 볼이 넓고 앞으로 뾰족한 여우 얼굴 */}
      <group ref={headRef} position={[0, 0.36, 0.04]}>
        <mesh scale={[1.08, 0.88, 0.94]} castShadow>
          <sphereGeometry args={[0.56, 18, 18]} />
          <meshStandardMaterial color="#f48c56" roughness={0.4} />
        </mesh>
        {/* 하얀 볼 털 */}
        {[-0.32, 0.32].map((x) => (
          <mesh key={x} position={[x, -0.14, 0.38]} scale={[1.2, 0.85, 0.7]}>
            <sphereGeometry args={[0.2, 14, 14]} />
            <meshStandardMaterial color="#fff8f0" roughness={0.45} />
          </mesh>
        ))}
        {/* 크고 뾰족한 여우 귀 */}
        {[-0.4, 0.4].map((x, idx) => (
          <group
            key={x}
            position={[x, 0.54, -0.02]}
            rotation={[0, 0, idx === 0 ? 0.26 : -0.26]}
          >
            <mesh castShadow>
              <coneGeometry args={[0.22, 0.46, 14]} />
              <meshStandardMaterial color="#f48c56" roughness={0.4} />
            </mesh>
            <mesh position={[0, 0.14, 0]}>
              <coneGeometry args={[0.1, 0.2, 12]} />
              <meshStandardMaterial color="#4a3b32" roughness={0.4} />
            </mesh>
            <mesh position={[0, -0.04, 0.07]}>
              <coneGeometry args={[0.11, 0.26, 12]} />
              <meshStandardMaterial color="#fff8f0" roughness={0.45} />
            </mesh>
          </group>
        ))}
        <AnimalEyes
          leftEyeRef={leftEyeRef}
          rightEyeRef={rightEyeRef}
          leftPos={[-0.21, 0.05, 0.48]}
          rightPos={[0.21, 0.05, 0.48]}
          radius={0.072}
        />
        {/* 뾰족한 주둥이 + 검은 코 */}
        <mesh position={[0, -0.1, 0.62]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.17, 0.36, 14]} />
          <meshStandardMaterial color="#fff8f0" roughness={0.42} />
        </mesh>
        <mesh position={[0, -0.1, 0.8]}>
          <sphereGeometry args={[0.055, 12, 12]} />
          <meshStandardMaterial color="#3b2f28" roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
}

// INFP 토끼: 포동포동한 배 모양 몸통, 큰 뒷발, 길쭉한 귀(잘리지 않게 설계), 동그란 솜뭉치 꼬리
export function RabbitCharacter() {
  const { rootRef, headRef, leftEyeRef, rightEyeRef, triggerJump } =
    useCharacterMotion("INFP");

  return (
    <group
      ref={rootRef}
      onClick={(e) => {
        e.stopPropagation();
        triggerJump();
      }}
    >
      {/* 둥글고 포동한 토끼 몸통 */}
      <mesh position={[0, -0.4, -0.02]} scale={[0.98, 1.08, 0.96]} castShadow receiveShadow>
        <sphereGeometry args={[0.5, 18, 18]} />
        <meshStandardMaterial color="#ffd6e6" roughness={0.38} />
      </mesh>
      <mesh position={[0, -0.42, 0.24]} scale={[0.84, 0.92, 0.65]}>
        <sphereGeometry args={[0.34, 14, 14]} />
        <meshStandardMaterial color="#ffffff" roughness={0.45} />
      </mesh>

      {/* 짧은 앞발 */}
      {[-0.44, 0.44].map((x, idx) => (
        <mesh
          key={x}
          position={[x, -0.34, 0.14]}
          rotation={[0.2, 0, idx === 0 ? 0.5 : -0.5]}
          castShadow
        >
          <capsuleGeometry args={[0.11, 0.2, 8, 12]} />
          <meshStandardMaterial color="#ffd6e6" roughness={0.38} />
        </mesh>
      ))}
      {/* 앞으로 쭉 뻗은 큰 토끼 뒷발 */}
      {[-0.24, 0.24].map((x) => (
        <mesh key={x} position={[x, -0.88, 0.18]} scale={[0.95, 0.65, 1.55]} castShadow>
          <sphereGeometry args={[0.16, 12, 12]} />
          <meshStandardMaterial color="#ffffff" roughness={0.42} />
        </mesh>
      ))}
      {/* 솜뭉치 꼬리 */}
      <mesh position={[0, -0.66, -0.48]}>
        <sphereGeometry args={[0.16, 12, 12]} />
        <meshStandardMaterial color="#ffffff" roughness={0.5} />
      </mesh>

      {/* 토끼 머리 + 길쭉한 귀 2개 */}
      <group ref={headRef} position={[0, 0.32, 0.04]}>
        <mesh scale={[1.05, 0.94, 0.96]} castShadow>
          <sphereGeometry args={[0.58, 18, 18]} />
          <meshStandardMaterial color="#ffd6e6" roughness={0.38} />
        </mesh>
        {[-0.25, 0.25].map((x, idx) => (
          <group
            key={x}
            position={[x, 0.72, -0.04]}
            rotation={[0, 0, idx === 0 ? 0.14 : -0.14]}
          >
            <mesh castShadow>
              <capsuleGeometry args={[0.13, 0.44, 10, 14]} />
              <meshStandardMaterial color="#ffd6e6" roughness={0.38} />
            </mesh>
            <mesh position={[0, 0, 0.07]}>
              <capsuleGeometry args={[0.068, 0.3, 8, 12]} />
              <meshStandardMaterial color="#ff9ebb" roughness={0.45} />
            </mesh>
          </group>
        ))}
        <AnimalEyes
          leftEyeRef={leftEyeRef}
          rightEyeRef={rightEyeRef}
          leftPos={[-0.22, 0.04, 0.52]}
          rightPos={[0.22, 0.04, 0.52]}
          radius={0.076}
        />
        {[-0.36, 0.36].map((x) => (
          <mesh key={x} position={[x, -0.08, 0.46]} scale={[1.2, 0.85, 0.5]}>
            <sphereGeometry args={[0.08, 10, 10]} />
            <meshStandardMaterial color="#ff9ebb" roughness={0.48} />
          </mesh>
        ))}
        <mesh position={[0, -0.07, 0.58]}>
          <sphereGeometry args={[0.055, 10, 10]} />
          <meshStandardMaterial color="#ff7fa3" roughness={0.3} />
        </mesh>
      </group>
    </group>
  );
}

// ENFJ 강아지: 앉은 강아지 자세, 처진 귀, 뭉툭한 주둥이와 내민 분홍 혀, 흔드는 꼬리
export function DogCharacter() {
  const { rootRef, headRef, tailRef, leftEyeRef, rightEyeRef, triggerJump } =
    useCharacterMotion("ENFJ");

  return (
    <group
      ref={rootRef}
      onClick={(e) => {
        e.stopPropagation();
        triggerJump();
      }}
    >
      {/* 앉은 강아지 몸통 */}
      <mesh position={[0, -0.4, -0.04]} scale={[0.9, 1.06, 0.94]} castShadow receiveShadow>
        <sphereGeometry args={[0.48, 18, 18]} />
        <meshStandardMaterial color="#f2c48d" roughness={0.38} />
      </mesh>
      <mesh position={[0, -0.36, 0.24]} scale={[0.75, 0.88, 0.55]}>
        <sphereGeometry args={[0.32, 14, 14]} />
        <meshStandardMaterial color="#fff6e5" roughness={0.45} />
      </mesh>
      {/* 앞발 2개 */}
      {[-0.18, 0.18].map((x) => (
        <mesh key={x} position={[x, -0.68, 0.3]} rotation={[0.25, 0, 0]} castShadow>
          <capsuleGeometry args={[0.1, 0.34, 8, 12]} />
          <meshStandardMaterial color="#f2c48d" roughness={0.38} />
        </mesh>
      ))}
      {[-0.3, 0.3].map((x) => (
        <mesh key={x} position={[x, -0.84, 0.06]} scale={[0.9, 0.75, 1.3]} castShadow>
          <sphereGeometry args={[0.16, 12, 12]} />
          <meshStandardMaterial color="#e0b077" roughness={0.4} />
        </mesh>
      ))}

      {/* 신나게 흔드는 강아지 꼬리 */}
      <group ref={tailRef} position={[0.36, -0.64, -0.18]}>
        <mesh position={[0.1, 0.16, 0]} rotation={[0, 0, -0.6]} castShadow>
          <capsuleGeometry args={[0.065, 0.3, 8, 10]} />
          <meshStandardMaterial color="#c68b59" roughness={0.4} />
        </mesh>
      </group>

      {/* 강아지 머리 + 처진 귀 + 주둥이 + 혀 */}
      <group ref={headRef} position={[0, 0.36, 0.04]}>
        <mesh scale={[1.02, 0.96, 0.98]} castShadow>
          <sphereGeometry args={[0.58, 18, 18]} />
          <meshStandardMaterial color="#f2c48d" roughness={0.38} />
        </mesh>
        {/* 아래로 처진 귀 2개 */}
        {[-0.56, 0.56].map((x, idx) => (
          <mesh
            key={x}
            position={[x, -0.02, 0.04]}
            rotation={[0.1, 0, idx === 0 ? 0.25 : -0.25]}
            castShadow
          >
            <capsuleGeometry args={[0.13, 0.36, 8, 12]} />
            <meshStandardMaterial color="#c68b59" roughness={0.42} />
          </mesh>
        ))}
        <AnimalEyes
          leftEyeRef={leftEyeRef}
          rightEyeRef={rightEyeRef}
          leftPos={[-0.21, 0.08, 0.51]}
          rightPos={[0.21, 0.08, 0.51]}
          radius={0.076}
        />
        {/* 주둥이와 코, 내민 분홍 혀 */}
        <mesh position={[0, -0.1, 0.54]} scale={[1.2, 0.9, 0.85]}>
          <sphereGeometry args={[0.18, 14, 14]} />
          <meshStandardMaterial color="#fff6e5" roughness={0.42} />
        </mesh>
        <mesh position={[0, -0.04, 0.69]}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshStandardMaterial color="#3d271d" roughness={0.2} />
        </mesh>
        <mesh position={[0, -0.21, 0.64]} rotation={[0.35, 0, 0]}>
          <capsuleGeometry args={[0.055, 0.09, 6, 10]} />
          <meshStandardMaterial color="#ff7fa3" roughness={0.35} />
        </mesh>
      </group>
    </group>
  );
}

// ENFP 다람쥐: 볼록한 볼, 가슴 앞에 모은 작은 앞손, 머리 뒤까지 거대하게 말려 올라간 S자 다람쥐 꼬리
export function SquirrelCharacter() {
  const { rootRef, headRef, tailRef, leftEyeRef, rightEyeRef, triggerJump } =
    useCharacterMotion("ENFP");

  return (
    <group
      ref={rootRef}
      onClick={(e) => {
        e.stopPropagation();
        triggerJump();
      }}
    >
      {/* 통통한 다람쥐 몸통 */}
      <mesh position={[0, -0.4, -0.02]} scale={[0.9, 1.05, 0.92]} castShadow receiveShadow>
        <sphereGeometry args={[0.46, 18, 18]} />
        <meshStandardMaterial color="#e69a66" roughness={0.4} />
      </mesh>
      <mesh position={[0, -0.4, 0.24]} scale={[0.8, 0.92, 0.65]}>
        <sphereGeometry args={[0.3, 14, 14]} />
        <meshStandardMaterial color="#fff0dc" roughness={0.45} />
      </mesh>
      {/* 가슴 앞으로 모은 작은 앞발 */}
      {[-0.2, 0.2].map((x, idx) => (
        <mesh
          key={x}
          position={[x, -0.34, 0.4]}
          rotation={[0.4, 0, idx === 0 ? -0.35 : 0.35]}
          castShadow
        >
          <capsuleGeometry args={[0.085, 0.16, 8, 10]} />
          <meshStandardMaterial color="#e69a66" roughness={0.4} />
        </mesh>
      ))}
      {[-0.24, 0.24].map((x) => (
        <mesh key={x} position={[x, -0.86, 0.16]} scale={[0.9, 0.65, 1.45]} castShadow>
          <sphereGeometry args={[0.15, 12, 12]} />
          <meshStandardMaterial color="#d4814a" roughness={0.4} />
        </mesh>
      ))}

      {/* 다람쥐의 상징: 몸만큼 크고 풍성하게 말려 올라간 S자 꼬리 */}
      <group ref={tailRef} position={[0.44, -0.46, -0.22]}>
        <mesh position={[0.04, 0.14, -0.08]} castShadow>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshStandardMaterial color="#c97642" roughness={0.45} />
        </mesh>
        <mesh position={[0.16, 0.48, -0.08]} castShadow>
          <sphereGeometry args={[0.31, 16, 16]} />
          <meshStandardMaterial color="#e69a66" roughness={0.45} />
        </mesh>
        <mesh position={[0.06, 0.8, -0.06]} castShadow>
          <sphereGeometry args={[0.22, 14, 14]} />
          <meshStandardMaterial color="#fff0dc" roughness={0.45} />
        </mesh>
      </group>

      {/* 다람쥐 머리: 볼록한 양 볼 + 작은 둥근 귀 */}
      <group ref={headRef} position={[0, 0.36, 0.04]}>
        <mesh scale={[1.06, 0.94, 0.96]} castShadow>
          <sphereGeometry args={[0.56, 18, 18]} />
          <meshStandardMaterial color="#e69a66" roughness={0.38} />
        </mesh>
        {[-0.38, 0.38].map((x) => (
          <mesh key={x} position={[x, 0.5, -0.02]} castShadow>
            <sphereGeometry args={[0.16, 14, 14]} />
            <meshStandardMaterial color="#e69a66" roughness={0.38} />
          </mesh>
        ))}
        {/* 볼록한 볼 */}
        {[-0.36, 0.36].map((x) => (
          <mesh key={x} position={[x, -0.1, 0.44]} scale={[1.3, 1.1, 0.95]}>
            <sphereGeometry args={[0.14, 12, 12]} />
            <meshStandardMaterial color="#fff0dc" roughness={0.45} />
          </mesh>
        ))}
        <AnimalEyes
          leftEyeRef={leftEyeRef}
          rightEyeRef={rightEyeRef}
          leftPos={[-0.21, 0.06, 0.5]}
          rightPos={[0.21, 0.06, 0.5]}
          radius={0.075}
        />
        <mesh position={[0, -0.06, 0.56]}>
          <sphereGeometry args={[0.052, 10, 10]} />
          <meshStandardMaterial color="#3d271d" roughness={0.25} />
        </mesh>
      </group>
    </group>
  );
}

// ISFJ 곰: 포근한 둥근 귀, 큰 주둥이, 통통한 몸통의 전형적인 곰 인형
export function BearCharacter() {
  const { rootRef, headRef, leftEyeRef, rightEyeRef, triggerJump } =
    useCharacterMotion("ISFJ");

  return (
    <group
      ref={rootRef}
      onClick={(e) => {
        e.stopPropagation();
        triggerJump();
      }}
    >
      <mesh position={[0, -0.44, 0]} scale={[1.04, 1.0, 0.96]} castShadow receiveShadow>
        <sphereGeometry args={[0.48, 18, 18]} />
        <meshStandardMaterial color="#dca67e" roughness={0.38} />
      </mesh>
      <mesh position={[0, -0.45, 0.24]} scale={[0.92, 1.0, 0.72]}>
        <sphereGeometry args={[0.31, 14, 14]} />
        <meshStandardMaterial color="#fff1e0" roughness={0.45} />
      </mesh>
      {[-0.54, 0.54].map((x, idx) => (
        <mesh
          key={x}
          position={[x, -0.34, 0.08]}
          rotation={[0, 0, idx === 0 ? 0.45 : -0.45]}
          castShadow
        >
          <capsuleGeometry args={[0.14, 0.22, 8, 12]} />
          <meshStandardMaterial color="#dca67e" roughness={0.38} />
        </mesh>
      ))}
      {[-0.24, 0.24].map((x) => (
        <mesh key={x} position={[x, -0.88, 0.1]} castShadow>
          <capsuleGeometry args={[0.15, 0.18, 8, 12]} />
          <meshStandardMaterial color="#dca67e" roughness={0.38} />
        </mesh>
      ))}

      <group ref={headRef} position={[0, 0.38, 0]}>
        <mesh castShadow>
          <sphereGeometry args={[0.66, 20, 20]} />
          <meshStandardMaterial color="#dca67e" roughness={0.38} />
        </mesh>
        {[-0.48, 0.48].map((x) => (
          <group key={x} position={[x, 0.5, -0.04]}>
            <mesh castShadow>
              <sphereGeometry args={[0.21, 14, 14]} />
              <meshStandardMaterial color="#dca67e" roughness={0.38} />
            </mesh>
            <mesh position={[0, 0, 0.1]}>
              <sphereGeometry args={[0.12, 12, 12]} />
              <meshStandardMaterial color="#fff1e0" roughness={0.42} />
            </mesh>
          </group>
        ))}
        <AnimalEyes
          leftEyeRef={leftEyeRef}
          rightEyeRef={rightEyeRef}
          leftPos={[-0.23, 0.06, 0.58]}
          rightPos={[0.23, 0.06, 0.58]}
          radius={0.078}
        />
        {[-0.38, 0.38].map((x) => (
          <mesh key={x} position={[x, -0.08, 0.52]} scale={[1.2, 0.85, 0.5]}>
            <sphereGeometry args={[0.08, 10, 10]} />
            <meshStandardMaterial color="#ffb3c6" roughness={0.48} />
          </mesh>
        ))}
        <mesh position={[0, -0.1, 0.58]} scale={[1.22, 0.92, 0.82]}>
          <sphereGeometry args={[0.19, 14, 14]} />
          <meshStandardMaterial color="#fff1e0" roughness={0.42} />
        </mesh>
        <mesh position={[0, -0.04, 0.74]} scale={[1.2, 0.9, 0.85]}>
          <sphereGeometry args={[0.065, 12, 12]} />
          <meshStandardMaterial color="#3d271d" roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
}

// ISFP 판다: 하얀 몸통 위 검은 어깨띠 무늬, 검은 팔다리, 검은 귀와 기울어진 눈가 무늬
export function PandaCharacter() {
  const { rootRef, headRef, leftEyeRef, rightEyeRef, triggerJump } =
    useCharacterMotion("ISFP");

  return (
    <group
      ref={rootRef}
      onClick={(e) => {
        e.stopPropagation();
        triggerJump();
      }}
    >
      {/* 하얀 통통한 몸통 */}
      <mesh position={[0, -0.44, 0]} scale={[1.05, 1.0, 0.96]} castShadow receiveShadow>
        <sphereGeometry args={[0.48, 18, 18]} />
        <meshStandardMaterial color="#ffffff" roughness={0.42} />
      </mesh>
      {/* 판다 특유의 검은 어깨띠 */}
      <mesh position={[0, -0.14, 0]} scale={[1.04, 0.42, 0.94]}>
        <sphereGeometry args={[0.45, 16, 16]} />
        <meshStandardMaterial color="#2c2c38" roughness={0.42} />
      </mesh>
      {/* 검은 팔 2개 */}
      {[-0.52, 0.52].map((x, idx) => (
        <mesh
          key={x}
          position={[x, -0.34, 0.08]}
          rotation={[0, 0, idx === 0 ? 0.45 : -0.45]}
          castShadow
        >
          <capsuleGeometry args={[0.14, 0.22, 8, 12]} />
          <meshStandardMaterial color="#2c2c38" roughness={0.42} />
        </mesh>
      ))}
      {/* 검은 뒷다리 2개 */}
      {[-0.25, 0.25].map((x) => (
        <mesh key={x} position={[x, -0.86, 0.14]} scale={[0.95, 0.8, 1.25]} castShadow>
          <sphereGeometry args={[0.17, 12, 12]} />
          <meshStandardMaterial color="#2c2c38" roughness={0.42} />
        </mesh>
      ))}

      {/* 하얀 얼굴 + 검은 귀 + 검은 눈가 무늬 */}
      <group ref={headRef} position={[0, 0.38, 0]}>
        <mesh scale={[1.06, 0.96, 0.96]} castShadow>
          <sphereGeometry args={[0.64, 20, 20]} />
          <meshStandardMaterial color="#ffffff" roughness={0.42} />
        </mesh>
        {[-0.48, 0.48].map((x) => (
          <mesh key={x} position={[x, 0.5, -0.04]} castShadow>
            <sphereGeometry args={[0.2, 14, 14]} />
            <meshStandardMaterial color="#2c2c38" roughness={0.42} />
          </mesh>
        ))}
        {/* 검은 눈가 무늬 */}
        {[-0.24, 0.24].map((x, idx) => (
          <mesh
            key={x}
            position={[x, 0.04, 0.54]}
            rotation={[0, 0, idx === 0 ? 0.28 : -0.28]}
            scale={[1.15, 1.35, 0.4]}
          >
            <sphereGeometry args={[0.15, 14, 14]} />
            <meshStandardMaterial color="#2c2c38" roughness={0.45} />
          </mesh>
        ))}
        <AnimalEyes
          leftEyeRef={leftEyeRef}
          rightEyeRef={rightEyeRef}
          leftPos={[-0.23, 0.06, 0.59]}
          rightPos={[0.23, 0.06, 0.59]}
          radius={0.072}
        />
        <mesh position={[0, -0.08, 0.63]}>
          <sphereGeometry args={[0.058, 10, 10]} />
          <meshStandardMaterial color="#2c2c38" roughness={0.25} />
        </mesh>
      </group>
    </group>
  );
}

// ESTP 원숭이: 날렵한 체형, 긴 팔, 얼굴 옆 크고 둥근 귀, 살구색 하트 얼굴 패치, 옆으로 올라간 긴 원숭이 꼬리
export function MonkeyCharacter() {
  const { rootRef, headRef, tailRef, leftEyeRef, rightEyeRef, triggerJump } =
    useCharacterMotion("ESTP");

  return (
    <group
      ref={rootRef}
      onClick={(e) => {
        e.stopPropagation();
        triggerJump();
      }}
    >
      {/* 날렵한 원숭이 몸통 */}
      <mesh position={[0, -0.4, 0]} scale={[0.88, 1.05, 0.9]} castShadow receiveShadow>
        <sphereGeometry args={[0.46, 18, 18]} />
        <meshStandardMaterial color="#b87a4b" roughness={0.4} />
      </mesh>
      <mesh position={[0, -0.42, 0.22]} scale={[0.78, 0.9, 0.65]}>
        <sphereGeometry args={[0.3, 14, 14]} />
        <meshStandardMaterial color="#ffe4c4" roughness={0.45} />
      </mesh>
      {/* 조금 긴 장난꾸러기 팔 */}
      {[-0.5, 0.5].map((x, idx) => (
        <mesh
          key={x}
          position={[x, -0.38, 0.08]}
          rotation={[0.1, 0, idx === 0 ? 0.35 : -0.35]}
          castShadow
        >
          <capsuleGeometry args={[0.11, 0.34, 8, 12]} />
          <meshStandardMaterial color="#b87a4b" roughness={0.4} />
        </mesh>
      ))}
      {[-0.22, 0.22].map((x) => (
        <mesh key={x} position={[x, -0.88, 0.12]} castShadow>
          <capsuleGeometry args={[0.12, 0.2, 8, 12]} />
          <meshStandardMaterial color="#b87a4b" roughness={0.4} />
        </mesh>
      ))}

      {/* 길게 말린 원숭이 꼬리 */}
      <group ref={tailRef} position={[0.36, -0.66, -0.14]}>
        <mesh position={[0.16, 0.2, 0]} rotation={[0, 0, -0.6]} castShadow>
          <capsuleGeometry args={[0.045, 0.48, 8, 10]} />
          <meshStandardMaterial color="#b87a4b" roughness={0.4} />
        </mesh>
        <mesh position={[0.28, 0.48, 0]} rotation={[0, 0, 0.45]} castShadow>
          <capsuleGeometry args={[0.045, 0.26, 8, 10]} />
          <meshStandardMaterial color="#b87a4b" roughness={0.4} />
        </mesh>
      </group>

      {/* 원숭이 머리: 살구색 얼굴 패치 + 얼굴 옆 크고 둥근 귀 */}
      <group ref={headRef} position={[0, 0.38, 0.02]}>
        <mesh scale={[0.98, 0.94, 0.96]} castShadow>
          <sphereGeometry args={[0.58, 18, 18]} />
          <meshStandardMaterial color="#b87a4b" roughness={0.4} />
        </mesh>
        {/* 살구색 하트형 얼굴 마스크 */}
        <mesh position={[-0.14, 0.06, 0.4]} scale={[0.9, 1, 0.55]}>
          <sphereGeometry args={[0.24, 14, 14]} />
          <meshStandardMaterial color="#ffe4c4" roughness={0.42} />
        </mesh>
        <mesh position={[0.14, 0.06, 0.4]} scale={[0.9, 1, 0.55]}>
          <sphereGeometry args={[0.24, 14, 14]} />
          <meshStandardMaterial color="#ffe4c4" roughness={0.42} />
        </mesh>
        <mesh position={[0, -0.14, 0.42]} scale={[1.25, 0.85, 0.6]}>
          <sphereGeometry args={[0.24, 14, 14]} />
          <meshStandardMaterial color="#ffe4c4" roughness={0.42} />
        </mesh>
        {/* 얼굴 옆 큰 둥근 귀 */}
        {[-0.62, 0.62].map((x) => (
          <group key={x} position={[x, 0.04, 0]}>
            <mesh castShadow>
              <sphereGeometry args={[0.22, 14, 14]} />
              <meshStandardMaterial color="#b87a4b" roughness={0.4} />
            </mesh>
            <mesh position={[0, 0, 0.08]}>
              <sphereGeometry args={[0.14, 12, 12]} />
              <meshStandardMaterial color="#ffe4c4" roughness={0.45} />
            </mesh>
          </group>
        ))}
        <AnimalEyes
          leftEyeRef={leftEyeRef}
          rightEyeRef={rightEyeRef}
          leftPos={[-0.18, 0.08, 0.52]}
          rightPos={[0.18, 0.08, 0.52]}
          radius={0.072}
        />
        <mesh position={[0, -0.07, 0.57]} scale={[1.2, 0.85, 0.8]}>
          <sphereGeometry args={[0.055, 10, 10]} />
          <meshStandardMaterial color="#3d271d" roughness={0.25} />
        </mesh>
      </group>
    </group>
  );
}
