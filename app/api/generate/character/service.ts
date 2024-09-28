import { CharacterTalent, InitCharacter } from "@model";
import SURNAMES from "../data/surnames.json";
import NAMES from "../data/names.json";
import TALENTS from "../data/talents.json";

import { v4 as uuidv4 } from "uuid";

const SURNAMES_LEN = SURNAMES.length;
const NAMES_LEN = NAMES.length;
const TALENTS_LEN = TALENTS.length;

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

function getCharacterName() {
  let name = "";
  // 随机选择一个姓氏
  name += SURNAMES[Math.floor(Math.random() * SURNAMES_LEN)];
  // 随机选择一个名字
  name += NAMES[Math.floor(Math.random() * NAMES_LEN)];
  // 有一定概率再随机选择一个名字，生成双名
  if (Math.random() > 0.5) {
    name += NAMES[Math.floor(Math.random() * NAMES_LEN)];
  }
  return name;
}

function getCharacterTalent(length: number): CharacterTalent[] {
  const talentList: Set<CharacterTalent> = new Set();
  for (let index = 0; index < length; index++) {
    talentList.add(TALENTS[Math.floor(Math.random() * TALENTS_LEN)]);
  }
  return Array.from(talentList);
}
