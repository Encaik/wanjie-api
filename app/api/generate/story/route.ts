import { ResStatus } from "../../common/model";
import { NextRequest } from "next/server";
import { getCharacterChat } from "../utils/kimi";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const name = searchParams.get("name");
  if (!name) {
    return Response.json({
      status: ResStatus.ServerError,
      msg: "参数错误",
      data: null,
    });
  }
  try {
    return Response.json({
      status: ResStatus.Success,
      msg: "ai背景故事生成",
      data: await getCharacterChat(name),
    });
  } catch (error) {
    return Response.json({
      status: ResStatus.ServerError,
      msg: error,
      data: null,
    });
  }
}
