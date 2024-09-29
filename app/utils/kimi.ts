import { createClient } from '@vercel/kv';
import OpenAI from 'openai';
import { Env, InitCharacter } from '../models';

const kv = createClient({
  url: process.env.WANJIE_API_REST_API_URL,
  token: process.env.WANJIE_API_REST_API_TOKEN,
  automaticDeserialization: false
});

export async function getCharacterChat(character: InitCharacter, env: Env) {
  return await getChat(
    '你是读过所有网络小说,精通网络小说套路的专家,避免在回答中存在不符合小说内容的语句，你的回答要让人有阅读小说的沉浸感,你需要用你擅长的套路,生成一个角色的背景故事,请用中文回答,字数控制在90-120字',
    `主角的信息如下：${JSON.stringify(character)}\n环境信息如下：${JSON.stringify(env)},请使用这些信息生成出一个游戏的初始化背景故事`
  );
}

async function getChat(system: string, role: string) {
  const token: string | null = await kv.get('KIMI_TOKEN');
  if (!token) {
    throw new Error('token 错误');
  }
  const client = new OpenAI({
    apiKey: token,
    baseURL: 'https://api.moonshot.cn/v1'
  });
  const completion = await client.chat.completions.create({
    model: 'moonshot-v1-8k',
    messages: [
      {
        role: 'system',
        content: system
      },
      { role: 'user', content: role }
    ],
    temperature: 0.3
  });
  return completion.choices[0].message.content;
}
