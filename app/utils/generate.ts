import LEVELMAP from './data/level-map.json';
import SURNAMES from './data/surnames.json';
import NAMES from './data/names.json';
import TALENTS from './data/talents.json';
import METHODS_SUITS from './data/method-suit.json';
import WORLDS from './data/worlds.json';
import { CharacterTalent, EnvType, MethodSuit } from '@models';

const SURNAMES_LEN = SURNAMES.length;
const NAMES_LEN = NAMES.length;
const TALENTS_LEN = TALENTS.length;

export function getCharacterName() {
  let name = '';
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

export function getCharacterTalent(length: number): CharacterTalent[] {
  const talentList: Set<CharacterTalent> = new Set();
  for (let index = 0; index < length; index++) {
    talentList.add(TALENTS[Math.floor(Math.random() * TALENTS_LEN)]);
  }
  return Array.from(talentList);
}

export function getWorldName(type: EnvType) {
  const WORLDS_NAMES = WORLDS[type];
  const WORLDS_LEN = WORLDS_NAMES.length;
  return WORLDS_NAMES[Math.floor(Math.random() * WORLDS_LEN)];
}

export function getWorldLevelMap(type: EnvType) {
  return LEVELMAP[type][0];
}

export function getMethodSuit(length: number, type: EnvType): MethodSuit[] {
  const METHODS_SUITS_NAMES = METHODS_SUITS[type];
  const METHODS_SUITS_LEN = METHODS_SUITS_NAMES.length;
  return Array.from({ length }, (_, i) => {
    return {
      name: METHODS_SUITS_NAMES[Math.floor(Math.random() * METHODS_SUITS_LEN)]
    };
  });
}
