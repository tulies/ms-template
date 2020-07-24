// use localStorage to store the authority info, which might be sent from server in actual project.
// 获取用户信息
export function getUserInfo() {
  const userinfo = localStorage.getItem("sso-userinfo");
  try {
    return JSON.parse(userinfo);
  } catch (e) {
    return {};
  }
}
// 设置用户信息
export function setUserInfo(userinfo) {
  return localStorage.setItem("sso-userinfo", JSON.stringify(userinfo));
}
// 清除用户信息
export function clearUserInfo() {
  return localStorage.removeItem("sso-userinfo");
}

// 获取权限
export function getAuthority() {
  // console.log('getAuthority');
  // 这里要判断下能不能取到用户信息 token。
  const userinfo = getUserInfo();
  if (
    !(
      userinfo &&
      userinfo.userToken != null &&
      userinfo.userToken !== undefined
    )
  ) {
    return [];
  }
  const authority = localStorage.getItem("sso-authority") || "";
  try {
    return [...JSON.parse(authority), "sso-dashboard-workspace"];
  } catch (e) {
    return [];
  }
}
// 设置权限
export function setAuthority(authority) {
  return localStorage.setItem("sso-authority", JSON.stringify(authority));
}

// 清除权限
export function clearAuthority() {
  return localStorage.removeItem("sso-authority");
}
