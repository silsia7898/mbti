"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import type { MbtiCode } from "@/data/types";

// 16가지 캐릭터가 공통으로 사용하는 숨쉬기·개성 움직임·눈 깜빡임·탭 점프 훅
export function useCharacterMotion(typeCode: MbtiCode) {
  const rootRef = useRef<Group>(null);
  const headRef = useRef<Group>(null);
  const tailRef = useRef<Group>(null);
  const leftEyeRef = useRef<Group>(null);
  const rightEyeRef = useRef<Group>(null);
  const jumpTimerRef = useRef(0);

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();

    // 탭했을 때 폴짝 뛰어오르는 포물선 계산
    let jumpY = 0;
    let jumpStretch = 1;
    if (jumpTimerRef.current > 0) {
      jumpTimerRef.current = Math.max(0, jumpTimerRef.current - delta);
      const progress = 1 - jumpTimerRef.current / 0.45;
      jumpY = Math.sin(progress * Math.PI) * 0.42;
      jumpStretch = 1 + Math.sin(progress * Math.PI) * 0.08;
    }

    if (rootRef.current) {
      // 유형 성격에 맞춘 기본 움직임
      let bobY = Math.sin(t * 1.6) * 0.05;
      let swayZ = 0;
      let rotY = 0;

      if (typeCode === "ENFP" || typeCode === "ESFP") {
        // 다람쥐·앵무새: 신나게 통통 튀거나 춤추듯 좌우 흔들림
        bobY = Math.abs(Math.sin(t * 3.3)) * 0.12;
        if (typeCode === "ESFP") swayZ = Math.sin(t * 3.3) * 0.1;
      } else if (typeCode === "ISTJ" || typeCode === "ISTP") {
        // 거북이·고슴도치: 차분하고 묵직하게 천천히 움직임
        bobY = Math.sin(t * 1.0) * 0.025;
      } else if (typeCode === "ESTP" || typeCode === "ENTP") {
        // 원숭이·여우: 재치 있게 살짝 좌우 들썩임
        swayZ = Math.sin(t * 2.4) * 0.05;
        rotY = Math.sin(t * 1.4) * 0.08;
      } else if (typeCode === "INFP" || typeCode === "INFJ") {
        // 토끼·사슴: 부드럽게 살랑임
        swayZ = Math.sin(t * 1.2) * 0.04;
      }

      rootRef.current.position.y = bobY + jumpY;
      rootRef.current.rotation.z = swayZ;
      rootRef.current.rotation.y = rotY;

      const breath = 1 + Math.sin(t * 2.1) * 0.02;
      rootRef.current.scale.set(breath, breath * jumpStretch, breath);
    }

    // 머리 끄덕임 또는 갸우뚱
    if (headRef.current) {
      if (typeCode === "ISTJ") {
        headRef.current.rotation.x = Math.sin(t * 1.3) * 0.07;
      } else if (typeCode === "INTP" || typeCode === "ISFP" || typeCode === "INTJ") {
        headRef.current.rotation.z = Math.sin(t * 1.1) * 0.06;
      } else {
        headRef.current.rotation.x = 0;
        headRef.current.rotation.z = 0;
      }
    }

    // 꼬리가 있는 동물은 꼬리를 살랑살랑 흔듭니다.
    if (tailRef.current) {
      const wagSpeed = typeCode === "ENFJ" ? 6.5 : 3.2;
      tailRef.current.rotation.y = Math.sin(t * wagSpeed) * 0.28;
    }

    // 약 3.6초마다 눈 깜빡임
    const blinkCycle = t % 3.6;
    let eyeScaleY = 1;
    if (blinkCycle > 3.42) {
      const progress = (blinkCycle - 3.42) / 0.18;
      eyeScaleY = 0.08 + Math.abs(Math.cos(progress * Math.PI)) * 0.92;
    }

    if (leftEyeRef.current && rightEyeRef.current) {
      leftEyeRef.current.scale.y = eyeScaleY;
      rightEyeRef.current.scale.y = eyeScaleY;
    }
  });

  const triggerJump = () => {
    jumpTimerRef.current = 0.45;
  };

  return { rootRef, headRef, tailRef, leftEyeRef, rightEyeRef, triggerJump };
}
