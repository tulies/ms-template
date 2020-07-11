import request from "@/utils/request";
export async function queryUserList() {
  return await request("/user/queryUserList");
}
