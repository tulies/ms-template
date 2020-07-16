import request from "@/utils/request";
export async function queryUserList(params) {
  return await request("/user/list", { params });
}
export async function createUser(data) {
  return await request("/user/create", { method: "POST", data });
}
