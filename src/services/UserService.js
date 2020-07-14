import request from "@/utils/request";
export async function queryUserList(params) {
  return await request("/user/list", { params });
}
