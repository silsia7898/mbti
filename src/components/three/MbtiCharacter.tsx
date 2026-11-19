"use client";

import type { MbtiCode } from "@/data/types";
import { OwlCharacter, ParrotCharacter, PenguinCharacter } from "./animals/BirdAnimals";
import {
  DeerCharacter,
  HedgehogCharacter,
  SheepCharacter,
  TurtleCharacter,
} from "./animals/UniqueBodyAnimals";
import {
  BearCharacter,
  CatCharacter,
  DogCharacter,
  FoxCharacter,
  LionCharacter,
  MonkeyCharacter,
  PandaCharacter,
  RabbitCharacter,
  SquirrelCharacter,
} from "./animals/MammalAnimals";

// 16가지 MBTI 유형 코드에 맞춰 각 동물 고유의 3D 형태를 그려주는 컴포넌트
export default function MbtiCharacter({ typeCode }: { typeCode: MbtiCode }) {
  switch (typeCode) {
    case "INTJ":
      return <OwlCharacter />;
    case "INTP":
      return <CatCharacter />;
    case "ENTJ":
      return <LionCharacter />;
    case "ENTP":
      return <FoxCharacter />;
    case "INFJ":
      return <DeerCharacter />;
    case "INFP":
      return <RabbitCharacter />;
    case "ENFJ":
      return <DogCharacter />;
    case "ENFP":
      return <SquirrelCharacter />;
    case "ISTJ":
      return <TurtleCharacter />;
    case "ISFJ":
      return <BearCharacter />;
    case "ESTJ":
      return <PenguinCharacter />;
    case "ESFJ":
      return <SheepCharacter />;
    case "ISTP":
      return <HedgehogCharacter />;
    case "ISFP":
      return <PandaCharacter />;
    case "ESTP":
      return <MonkeyCharacter />;
    case "ESFP":
      return <ParrotCharacter />;
    default:
      return <BearCharacter />;
  }
}
