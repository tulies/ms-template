import { observable, action, configure, runInAction } from "mobx";
import { queryUserList } from "@/services/UserService";
// 不允许在动作外部修改状态
configure({ enforceActions: "always" });

class PlatUser {
  @observable userList;

  //   constructor() {}

  @action
  async queryUserList() {
    const data = await queryUserList();
    runInAction(() => {
      this.userList = data;
    });
  }
}
const platUser = new PlatUser();
export default platUser;
