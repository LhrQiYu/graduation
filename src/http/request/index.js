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
  axiosInstance.post("/goods/user-list").then(({ data }) => data ?? []);
/**
 * @description 编辑用户
 * @param {Object} data
 */
export const updateUserInfo = (data) =>
  axiosInstance.post("/goods/user-update", data).then((res) => res);

/**
 * @description 删除用户
 * @param {Object} data
 */
export const removeUserInfo = (data) =>
  axiosInstance.post("/goods/user-remove", data).then((res) => res);

/**
 * @description 获取急救卡列表
 * @param {Object} data
 */
export const getEmergencyCardList = () =>
  axiosInstance.post("/goods/card-list").then(({ data }) => data ?? []);
