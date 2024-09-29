import { getMethodSuit, getWorldLevelMap, getWorldName } from "@/app/utils/generate";
import { Env, EnvType } from "@models";
import { v4 as uuidv4 } from "uuid";

export function envs(length: number): { envs: Env[]; galaxiesId: string } {
  const galaxiesId = `galaxie-${uuidv4()}`;
  return {
    envs: Array.from({ length }, (_, i) => {
      const weight: number = Number((Math.random() * 0.5 + 0.75).toFixed(2));
      const type: EnvType = Object.values(EnvType)[Math.floor(Math.random() * Object.keys(EnvType).length)];
      return {
        id: `env-${uuidv4()}`,
        name: getWorldName(type),
        type,
        galaxiesId,
        levelMap: getWorldLevelMap(type),
        weight,
        // TODO: 测试用数据，调低了最大经验
        maxExp: Math.round((Math.random() * 0.4 + 0.8) * weight * 10000),
        methodSuits: getMethodSuit(2, type)
      };
    }),
    galaxiesId
  };
}

