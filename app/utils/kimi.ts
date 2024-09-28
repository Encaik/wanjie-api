import { createClient } from "@vercel/kv";
import OpenAI from "openai";

const kv = createClient({
  url: process.env.WANJIE_API_REST_API_URL,
  token: process.env.WANJIE_API_REST_API_TOKEN,
  automaticDeserialization: false,
});

export async function getCharacterChat(name: string) {
  return await getChat(
    "你是读过所有网络小说，精通网络小说套路的专家，现在我要给你一个角色，你需要用你擅长的套路，生成一个角色的背景故事，请用中文回答，字数控制在90-120字。",
    `主角的名字叫${name}`
  );
}

async function getChat(system: string, role: string) {
  const token: string | null = await kv.get("KIMI_TOKEN");
  if (!token) {
    throw new Error("token 错误");
  }
  const client = new OpenAI({
    apiKey: token,
    baseURL: "https://api.moonshot.cn/v1",
  });
  const completion = await client.chat.completions.create({
    model: "moonshot-v1-8k",
    messages: [
      {
        role: "system",
        content: system,
      },
      { role: "user", content: role },
    ],
    temperature: 0.3,
  });
  return completion.choices[0].message.content;
}
