import { setEnvVariable, ChatCompletion } from '@baiducloud/qianfan';
import { InitCharacter, Env } from '../models';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.WANJIE_API_KV_REST_API_URL,
  token: process.env.WANJIE_API_KV_REST_API_TOKEN
});

export async function getCharacterChat(character: InitCharacter, env: Env) {
  return await getChat(
    '你好，我是一名游戏剧情设计师,熟读过所有网络小说并且精通网络小说套路,会避免在回答中存在不符合小说内容的语句，我的回答要让人有阅读小说的沉浸感,我会用我擅长的套路,生成一个角色的背景故事,用中文回答,字数控制在90-120字',
    `主角的信息如下：${JSON.stringify(character)}\n主角所处的星球,环境信息如下：${JSON.stringify(
      env
    )},请使用这些信息生成出一个游戏的初始化背景故事,包含主句介绍和所处环境的介绍`
  );
}

export async function getChat(system: string, role: string) {
  const QIANFAN_ACCESS_KEY: string | null = await redis.get('QIANFAN_ACCESS_KEY');
  const QIANFAN_SECRET_KEY: string | null = await redis.get('QIANFAN_SECRET_KEY');
  if (!QIANFAN_ACCESS_KEY || !QIANFAN_SECRET_KEY) {
    throw new Error('token 错误');
  }
  setEnvVariable('QIANFAN_ACCESS_KEY', QIANFAN_ACCESS_KEY);
  setEnvVariable('QIANFAN_SECRET_KEY', QIANFAN_SECRET_KEY);
  const client = new ChatCompletion();
  const resp = await client.chat(
    {
      messages: [
        { role: 'user', content: '你好，帮我生成一个背景故事' },
        {
          role: 'assistant',
          content: system
        },
        { role: 'user', content: role }
      ]
    },
    'ERNIE-Speed-8K'
  );
  return resp.result;
}
