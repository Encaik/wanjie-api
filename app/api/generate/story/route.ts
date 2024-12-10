import { ResStatus } from '../../common/model';
import { NextRequest } from 'next/server';
import { getCharacterChat } from '@utils/qianfan';

export async function POST(request: NextRequest) {
  try {
    const { character, env } = await request.json();
    if (!character) {
      return Response.json({
        status: ResStatus.ServerError,
        msg: '参数错误,角色character为空',
        data: null
      });
    }
    if (!env) {
      return Response.json({
        status: ResStatus.ServerError,
        msg: '参数错误,环境env为空',
        data: null
      });
    }
    return Response.json({
      status: ResStatus.Success,
      msg: 'ai背景故事生成',
      data: await getCharacterChat(character, env)
    });
  } catch (error) {
    let msg = '';
    if (error instanceof Error) {
      msg = error.name + ': ' + error.message;
    } else {
      msg = '未知错误';
    }
    return Response.json({
      status: ResStatus.ServerError,
      msg,
      data: null
    });
  }
}
