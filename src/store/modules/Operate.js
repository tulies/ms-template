import { observable, action, configure, runInAction } from "mobx";
import {
  queryOperateNodeList,
  createOperateNode,
  updateOperateNode,
  deleteOperateNode,
} from "@/services/OperateService";
import { setUserInfo } from "@/utils/authority";

// 不允许在动作外部修改状态
configure({ enforceActions: "always" });

class Operate {
  // @observable userinfo = null;
  // constructor() {}

  @action
  async queryOperateNodeList(payload) {
    const data = await queryOperateNodeList(payload);
    if (data.code === 0 && data.data && data.data.list) {
      data.data.list = data.data.list.map((v) => ({
        ...v,
        title: v.name,
        key: v.id,
        isLeaf: v.leaf === 1,
      }));
    }
    return data;
  }

  @action
  async createOperateNode({ payload }) {
    const data = await createOperateNode(payload);
    return data;
  }
  @action
  async updateOperateNode({ payload }) {
    const data = await updateOperateNode(payload);
    return data;
  }
  async deleteOperateNode({ payload }) {
    const { ids } = payload;
    let count = 0;
    for (const id of ids) {
      const res = await deleteOperateNode({ id });
      if (res.code === 0) {
        count = count + 1;
      }
    }
    const result = {
      count,
    };
    return result;
  }
}
const operate = new Operate();
export default operate;
