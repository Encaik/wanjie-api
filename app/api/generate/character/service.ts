import { InitCharacter } from "@models";

import { v4 as uuidv4 } from "uuid";
import { getCharacterName, getCharacterTalent } from "@/app/utils/generate";

export function characters(length: number): InitCharacter[] {
  return Array.from({ length }, () => ({
    id: `character-${uuidv4()}`,
    baseInfo: {
      name: getCharacterName(),
      gender: Math.random() > 0.5 ? "男" : "女",
      age: Math.floor(Math.random() * 10) * 2 + 12,
      talent: getCharacterTalent(1),
    },
    innateInfo: {
      hp: Math.round(Math.random() * 40) + 100,
      mp: Math.round(Math.random() * 40) + 100,
      attack: Math.round(Math.random() * 40) + 20,
      defence: Math.round(Math.random() * 40) + 20,
      speed: Math.round(Math.random() * 40),
    },
  }));
}
