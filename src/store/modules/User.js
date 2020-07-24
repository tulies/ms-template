import { observable, action, configure, runInAction } from "mobx";
import {
  queryUserList,
  createUser,
  updateUser,
  changeStatus,
  deleteUser,
  login,
} from "@/services/UserService";
import { setUserInfo } from "@/utils/authority";

// 不允许在动作外部修改状态
configure({ enforceActions: "always" });

class User {
  @observable listData = {
    list: [],
    pageNum: 1,
    pageSize: 1,
    total: 0,
  };

  @observable userinfo = null;
  // constructor() {}

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
  async updateUser({ payload }) {
    const data = await updateUser(payload);
    // if (callback) callback(data);
    return data;
  }
  @action
  async queryUser({ payload }) {
    const data = await createUser(payload);
    // if (callback) callback(data);
    return data;
  }
  @action
  async changeStatus({ payload }) {
    const { ids, status } = payload;
    let count = 0;

    for (const id of ids) {
      const res = await changeStatus({
        id,
        status,
      });
      if (res.code === 0) {
        count = count + 1;
      }
    }
    const result = {
      count,
    };
    return result;
  }
  @action
  async deleteUser({ payload }) {
    const { ids } = payload;
    let count = 0;
    for (const id of ids) {
      const res = await deleteUser({ id });
      if (res.code === 0) {
        count = count + 1;
      }
    }
    const result = {
      count,
    };
    return result;
  }
  @action
  async login({ payload }) {
    // const { username, password } = payload
    const res = await login(payload);
    if (res.code === 0) {
      setUserInfo(res.data);
      runInAction(() => {
        this.userinfo = res.data;
      });
    }
    return res;
  }
}
const user = new User();
export default user;
