import { getCharacterName, getCharacterTalent } from "@/app/utils/generate";
import { BattleCharacter } from "@models";
import { v4 as uuidv4 } from "uuid";

export function enemys(length: number, level: number = 0): BattleCharacter[] {
    return Array.from({ length }, (_, i) => {
      const innateInfo = {
        hp: Math.round(Math.random() * 40) + 100,
        mp: Math.round(Math.random() * 40) + 100,
        attack: Math.round(Math.random() * 40) + 20,
        defence: Math.round(Math.random() * 40) + 20,
        speed: Math.round(Math.random() * 40)
      };
      const attrInfo = {
        hp: (1 + level) * innateInfo.hp,
        mp: (1 + level) * innateInfo.mp,
        attack: (1 + level) * innateInfo.attack,
        defence: (1 + level) * innateInfo.defence,
        speed: (1 + level) * innateInfo.speed,
        critRate: Math.round(Math.random() * 5) + 2,
        critDamage: Math.round(Math.random() * 20) + 10
      };
      return {
        id: `enemy-${uuidv4()}`,
        isEnemy: true,
        baseInfo: {
          name: getCharacterName(),
          gender: Math.random() > 0.5 ? '男' : '女',
          age: Math.floor(Math.random() * 10) * 2 + 12,
          talent: getCharacterTalent(1)
        },
        statusInfo: {
          hp: attrInfo.hp,
          mp: attrInfo.mp,
          buffs: []
        },
        levelInfo: {
          exp: level * 100,
          power: attrInfo.hp + attrInfo.mp + attrInfo.attack + attrInfo.defence + attrInfo.speed,
          level
        },
        attrInfo
      };
    });
  }
