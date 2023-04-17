<template>
  <el-table :data="state.tableData" style="width: 100%">
    <el-table-column prop="account" label="用户名称" />
    <el-table-column prop="password" label="密码" />
    <el-table-column label="用户昵称">
      <template #default="{row}">
        <span>{{row.name || "-"}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="id" label="用户ID" />
    <el-table-column prop="id" label="用户性别">
      <template #default="{row}">
        <span>{{+(row.type ) ? "男" : "女"}}</span>
      </template>
    </el-table-column>
    <el-table-column label="简述">
      <template #default="{row}">
        <span>{{row.describe || "-"}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="date" label="修改时间" :formatter="timeFormatter" />
    <el-table-column label="操作">
      <template #default="{row}">
        <el-button type="primary" @click="handleGetUserInfo(row.id)">修改</el-button>
        <el-button type="danger" @click="handleRemoveUserInfo(row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog v-model="dialogVisible" title="修改用户基本信息" width="30%" :before-close="handleClose">
    <el-form :model="userFormInfo" ref="userForm" class="login-form">
      <el-form-item prop="account" :rules="[{ required: true, message: '请输入名称', trigger: 'blur' }]">
        <el-input v-model="userFormInfo.account" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item prop="password" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
        <el-input v-model="userFormInfo.password" type="password" show-password placeholder="请输入密码" />
      </el-form-item>
      <el-form-item prop="name">
        <el-input v-model="userFormInfo.name" placeholder="请输入用户昵称" />
      </el-form-item>
      <el-form-item prop="type" :rules="[{ required: true, message: '请选择性别', trigger: 'change' }]">
        <el-select v-model="userFormInfo.type" placeholder="请选择性别">
          <el-option value="0" label="女" />
          <el-option value="1" label="男" />
        </el-select>
      </el-form-item>
      <el-form-item prop="describe" :rules="[{ required: true, message: '请选输入昵称', trigger: 'change' }]">
        <el-input v-model="userFormInfo.describe" placeholder="请输入昵称" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleUpdateUser">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { reactive, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { getUserList, updateUserInfo, removeUserInfo } from "@/http/request";
import dayjs from "dayjs";
let state = reactive({
  tableData: [],
});
const userForm = ref(null);
/**
 * @description 定义提交表单的数据类型
 */
const userFormInfo = reactive({
  account: null,
  password: null,
  name: null,
  type: null,
  describe: null,
  _id: null,
  id: null,
});
/**
 * @description 定义编辑弹窗控制显隐的变量
 */
const dialogVisible = ref(false);
/**
 * @description 进入这个路由时请求表格数据
 */
const handleGetUserList = () => {
  getUserList().then((res) => {
    state.tableData = res;
  });
};
handleGetUserList();
/**
 * @description 删除数据之前弹出确认弹窗
 * @param {string} id
 */
const handleRemoveUserInfo = (id) => {
  ElMessageBox.confirm("确定要删除吗", "删除", {
    cancelButtonText: "取消",
    confirmButtonText: "确定",
  })
    .then(() => {
      removeUserInfo({ id }).then(({ code }) => {
        // 删除完之后重新请求表格数据
        if (code === 200) {
          handleGetUserList();
        }
      });
    })
    .catch((err) => {
      console.warn(err);
    });
};
/**
 * @description 删除数据，并在删除数据之前弹出确认弹窗
 */
const handleUpdateUser = () => {
  userForm.value.validate((valid) => {
    if (valid) {
      updateUserInfo(userFormInfo).then(({ code }) => {
        if (code === 200) {
          ElMessage.success("修改成功");
          dialogVisible.value = false;
          setTimeout(() => {
            handleGetUserList();
          });
        }
      });
    }
  });
};
/**
 * @description 点击编辑按钮时 打开弹窗 并找到表格中对应这条数据 赋值给弹窗定义的数据
 * @param {string} id
 */
const handleGetUserInfo = (id) => {
  dialogVisible.value = true;
  const {
    account,
    password,
    name,
    type,
    describe,
    _id: key,
    id: _key,
  } = state.tableData.find((user) => user.id == id);
  userFormInfo.account = account;
  userFormInfo.password = password;
  userFormInfo.name = name;
  userFormInfo.type = type;
  userFormInfo.describe = describe;
  userFormInfo._id = key;
  userFormInfo.id = _key;
};
/**
 * @description 关闭弹窗
 */
const handleClose = () => {
  dialogVisible.value = false;
};
const timeFormatter = (row) => dayjs(row.time).format("YYYY-MM-DD HH:mm:ss");
</script>