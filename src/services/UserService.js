import request from "@/utils/request";
export async function queryUserList(params) {
  return await request("/user/list", { params });
}
export async function createUser(data) {
  return await request("/user/create", { method: "POST", data });
}
export async function updateUser(data) {
  return await request("/user/update", { method: "POST", data });
}
export async function changeStatus(data) {
  return await request("/user/changeStatus", { method: "POST", data });
}
export async function deleteUser(data) {
  return await request("/user/delete", { method: "POST", data });
}
