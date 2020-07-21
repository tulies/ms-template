import { observable, action, configure, runInAction } from "mobx";
import { queryUserList, createUser } from "@/services/UserService";
// 不允许在动作外部修改状态
configure({ enforceActions: "always" });

class User {
  @observable listData = {
    list: [],
    pageNum: 1,
    pageSize: 1,
    total: 0,
  };

  //   constructor() {}

  @action
  async queryUserList({ payload }) {
    const data = await queryUserList(payload);
    if (data.code === 0) {
      runInAction(() => {
        this.listData = data.data;
      });
    }
    // if (callback) callback(data);
    return data;
  }

  @action
  async createUser({ payload }) {
    const data = await createUser(payload);
    // if (callback) callback(data);
    return data;
  }
  @action
  async queryUser({ payload }) {
    const data = await createUser(payload);
    // if (callback) callback(data);
    return data;
  }
}
const user = new User();
export default user;
