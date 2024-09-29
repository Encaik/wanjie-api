import { NextRequest } from "next/server";
import { ResStatus } from "../../common/model";
import { enemys } from "./service";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const length = searchParams.get("length");
  const level = searchParams.get("level");
  if (!length) {
    return Response.json({
      status: ResStatus.ServerError,
      msg: "参数错误",
      data: null,
    });
  }
  return Response.json({
    status: ResStatus.Success,
    msg: "生成敌人成功",
    data: enemys(parseInt(length),parseInt(level??'0')),
  });
}
