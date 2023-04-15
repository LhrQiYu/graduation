import axiosInstance from "../index";
/**
 * @description 登录
 * @param {Object} data
 */
export const login = (data) =>
  axiosInstance.post("/goods/login", data).then((res) => res);
/**
 * @description 获取用户列表
 * @param {null}
 */
export const getUserList = () =>
  axiosInstance.post("goods/user-list").then(({ data }) => data ?? []);
