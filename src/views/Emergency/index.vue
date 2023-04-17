<template>
  <el-table :data="emergencyList.tableData" style="width: 100%">
    <el-table-column prop="name" label="姓名" />
    <el-table-column prop="age" label="年龄" />
    <el-table-column prop="bloodType" label="血型" />
    <el-table-column prop="medications" label="服药情况" />
    <el-table-column prop="IDNumber" label="身份证号" />
    <el-table-column label="头像">
      <template #default="{row}">
        <el-image style="width: 50px; height: 50px" :src="row.avatar" fit="cover" />
      </template>
    </el-table-column>
    <el-table-column label="是否为器官捐献者">
      <template #default="{row}">
        <span>{{+(row.isOrganDonation) & 1 ? "是" : "否"}}</span>
      </template>
    </el-table-column>
    <el-table-column label="紧急联系人电话号码" width="200">
      <template #default="{row}">
        <div v-for="(item,index) of row.betweens" :key="index" class="otherInfos">
          <span>{{item.label}}</span>
          -
          <span>{{item.phone}}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="修改时间" :formatter="timeFormatter" width="200" />
    <el-table-column label="操作" width="200">
      <template #default="{row}">
        <el-button type="primary" @click="handleGetEmergencyInfo(row._id)">修改</el-button>
        <el-button type="danger" @click="handleRemoveEmergencyInfo(row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog v-model="dialogVisible" title="修改急救卡基本信息" width="40%" :before-close="handleClose">
    <el-form :model="emergencyFromInfo" ref="emergencyForm" label-suffix="：">
      <el-form-item prop="name" :rules="[{ required: true, message: '请输入姓名', trigger: 'blur' }]" label="姓名">
        <el-input v-model="emergencyFromInfo.name" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item prop="age" :rules="[{ required: true, message: '请输入年龄', trigger: 'blur' }]" label="年龄">
        <el-input v-model="emergencyFromInfo.age" placeholder="请输入年龄" />
      </el-form-item>
      <el-form-item prop="IDNumber" :rules="[{ required: true, message: '请输入身份证号', trigger: 'blur' }]" label="身份证号">
        <el-input v-model="emergencyFromInfo.IDNumber" placeholder="请输入身份证号" />
      </el-form-item>
      <el-form-item prop="bloodType" :rules="[{ required: true, message: '请输入血型', trigger: 'blur' }]" label="血型">
        <el-input v-model="emergencyFromInfo.bloodType" placeholder="请输入血型" />
      </el-form-item>
      <el-form-item prop="medications" :rules="[{ required: true, message: '请输入服药情况', trigger: 'blur' }]" label="服药情况">
        <el-input v-model="emergencyFromInfo.medications" placeholder="请输入服药情况" />
      </el-form-item>
      <el-form-item prop="isOrganDonation" :rules="[{ required: true, message: '请选择', trigger: 'change' }]" label="是否为器官捐献者">
        <el-select v-model="emergencyFromInfo.isOrganDonation" placeholder="请选择">
          <el-option value="0" label="是" />
          <el-option value="1" label="否" />
        </el-select>
      </el-form-item>
      <el-form-item prop="betweens" label="紧急联系人">
        <section v-for="(item,index) of emergencyFromInfo.betweens" :key="index" class="phoneNameWrapper">
          <div>
            <span>姓名：</span>
            <el-input v-model="item.label" placeholder="请填写联系人" />
          </div>
          <div>
            <span>手机号：</span>
            <el-input v-model="item.phone" placeholder="请填写电话号码" />
          </div>
        </section>
        <el-button class="from_add_btn" type="primary" @click="handleAddPhoneName">添加</el-button>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleUpdateEmergency">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive, ref } from "vue";
import dayjs from "dayjs";
import { ElMessage, ElMessageBox } from "element-plus";
import {
  getEmergencyCardList,
  updateEmergencyInfo,
  removeEmergencyInfo,
} from "@/http/request";
const emergencyList = reactive({
  tableData: [],
});
const emergencyFromInfo = reactive({
  name: "",
  age: "",
  bloodType: "",
  medications: "",
  IDNumber: "",
  isOrganDonation: null,
  betweens: [],
  _id: null,
  id: null,
});
const emergencyForm = ref(null);
/**
 * @description 定义编辑弹窗控制显隐的变量
 */
const dialogVisible = ref(false);
/**
 * @description 请求急救卡列表 并将数据赋值给响应式的tableData
 */
function handleGetEmergencyCardList() {
  getEmergencyCardList().then((res) => {
    emergencyList.tableData = res;
  });
}
handleGetEmergencyCardList();
/**
 * @description 获取单个急救卡信息 并将数据赋值给编辑表单
 */
const handleGetEmergencyInfo = (currentId) => {
  const {
    name,
    age,
    bloodType,
    medications,
    IDNumber,
    isOrganDonation,
    betweens,
    _id,
    id,
  } = emergencyList.tableData.find((emergency) => emergency._id === currentId);
  emergencyFromInfo.name = name;
  emergencyFromInfo.age = age;
  emergencyFromInfo.bloodType = bloodType;
  emergencyFromInfo.medications = medications;
  emergencyFromInfo.IDNumber = IDNumber;
  emergencyFromInfo.isOrganDonation = isOrganDonation;
  emergencyFromInfo.betweens = betweens || [];
  emergencyFromInfo._id = _id;
  emergencyFromInfo.id = id;
  setTimeout(() => {
    dialogVisible.value = true;
  });
};
/**
 * @description 删除单个急救卡 删除成功后重新刷新列表
 */
const handleRemoveEmergencyInfo = (id) => {
  ElMessageBox.confirm("确定要删除吗", "删除", {
    cancelButtonText: "取消",
    confirmButtonText: "确定",
  })
    .then(() => {
      removeEmergencyInfo({ id }).then(({ code }) => {
        // 删除完之后重新请求表格数据
        if (code === 200) {
          handleGetEmergencyCardList();
        }
      });
    })
    .catch((err) => {
      console.warn(err);
    });
};
/**
 * @description 关闭弹窗
 */
const handleClose = () => {
  dialogVisible.value = false;
};
/**
 * @description 更新当前编辑的这条数据 并刷新列表
 */
function handleUpdateEmergency() {
  const { id } = emergencyFromInfo;
  emergencyForm.value.validate((valid) => {
    if (valid) {
      emergencyList.tableData.map((item) => {
        if (item.id === id) {
          item = { ...item, ...emergencyForm };
        }
      });
      ElMessage.success("修改成功");
    }
  });

  dialogVisible.value = false;
  ElMessage.success("修改成功");
}
/**
 * @description 添加紧急联系人 压栈操作
 */
const handleAddPhoneName = () => {
  emergencyFromInfo.betweens.push({
    phone: "",
    label: "",
  });
};
/**
 * @description 将时间戳转换为年月日 时分秒 的格式
 */
const timeFormatter = (row) => dayjs(row.time).format("YYYY-MM-DD HH:mm:ss");
</script>

<style scoped>
.otherInfos {
  display: flex;
}
.otherInfos > span:nth-child(1) {
  color: cornflowerblue;
}
.otherInfos > span:nth-child(2) {
  color: orangered;
}
.phoneNameWrapper {
  display: flex;
  gap: 10px;
  align-items: center;
}
.from_add_btn {
  align-self: flex-end;
  margin-left: 10px;
}
/* .phoneNameWrapper > div {
  display: flex;
} */
</style>