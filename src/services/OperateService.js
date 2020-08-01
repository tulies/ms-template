import request from "@/utils/request";

export async function queryOperateNodeList(params) {
  return await request("/operate/node/list", { params });
}
export async function createOperateNode(data) {
  return await request("/operate/node/create", { method: "POST", data });
}
export async function updateOperateNode(data) {
  return await request("/operate/node/update", { method: "POST", data });
}
export async function deleteOperateNode(data) {
  return await request("/operate/node/delete", { method: "POST", data });
}
