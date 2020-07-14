import { observable, action, configure, runInAction } from "mobx";
import { queryUserList } from "@/services/UserService";
// 不允许在动作外部修改状态
configure({ enforceActions: "always" });

class User {
  @observable listData = {
    list: [],
    pageNum: 0,
    pageSize: 1,
    total: 0,
  };

  //   constructor() {}

  @action
  async queryUserList({ payload, callback }) {
    const data = await queryUserList(payload);
    if (data.code === 0) {
      runInAction(() => {
        this.listData = data.data;
      });
    }
    if (callback) callback(data);
  }
}
const user = new User();
export default user;
