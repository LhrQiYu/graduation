import { defineStore } from "pinia";
export const useUserStore = defineStore("userInfo", {
  state: () => ({
    token: "",
    userInfo: {},
  }),
  actions: {
    dispatchChangeUserInfo(payload) {
      const { data, user } = payload;
      this.token = data;
      this.userInfo = user;
    },
  },
});
