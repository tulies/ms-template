import { observable, action, configure, runInAction } from "mobx";
import { queryUserList } from "@/services/UserService";
// 不允许在动作外部修改状态
configure({ enforceActions: "always" });

class User {
  @observable userList;

  //   constructor() {}

  @action
  async queryUserList({ payload, callback }) {
    const data = await queryUserList();
    runInAction(() => {
      this.userList = data;
    });
    if (callback) callback(data);
  }
}
const user = new User();
export default user;
