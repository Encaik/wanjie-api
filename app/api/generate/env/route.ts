import { NextRequest } from "next/server";
import { ResStatus } from "../../common/model";
import { envs } from "./service";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const length = searchParams.get("length");
  if (!length) {
    return Response.json({
      status: ResStatus.ServerError,
      msg: "参数错误",
      data: null,
    });
  }
  return Response.json({
    status: ResStatus.Success,
    msg: "生成世界成功",
    data: envs(parseInt(length)),
  });
}
