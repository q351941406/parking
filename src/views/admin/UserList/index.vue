<template>
  <div>
    <el-card style="margin: 0 0 20px 0">
      <el-form ref="elFromRef" inline :model="pageStatus.selectFrom">
        <el-form-item label="" prop="phone">
          <el-input
            v-model="pageStatus.selectFrom.phone"
            placeholder="请输入手机号查询"
            clearable
          />
        </el-form-item>
        <el-form-item label="">
          <!-- <el-button type="">搜索</el-button> -->
          <el-button type="" @click.stop="reset()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <el-button style="margin: 0 0 20px 0" type="" @click.stop="edit()"
        >创建用户</el-button
      >
      <el-table :data="tableData" border>
        <el-table-column sortable label="ID" prop="id" align="center" />
        <el-table-column sortable label="手机号" prop="phone" align="center" />
        <!-- <el-table-column
          label="access_token"
          prop="access_token"
          align="center"
        />
        <el-table-column
          label="refresh_token"
          prop="refresh_token"
          align="center"
        /> -->
        <el-table-column
          sortable
          label="创建时间"
          prop="createdTime"
          align="center"
        />
        <el-table-column
          sortable
          label="更新时间"
          prop="updatedTime"
          align="center"
        />
        <!-- <el-table-column
          label="操作"
          width="200px"
          align="center"
          fixed="right"
        >
          <template #default="scope">
            <el-button type="" @click.stop="edit(scope.row)"> 编辑 </el-button>
            <el-button type="" @click.stop="remove(scope.row.id)">
              删除
            </el-button>
          </template>
        </el-table-column> -->
      </el-table>
      <Pagination
        v-model="pageStatus.selectFrom.page"
        v-model:pageSize="pageStatus.selectFrom.pageSize"
        :total="pageStatus.selectFrom.count"
        @change="getList()"
      />
    </el-card>
    <el-dialog
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      v-model="pageStatus.dialogVisible"
      :title="pageStatus.editFrom.id ? '编辑' : '新增'"
      width="400"
    >
      <el-form
        ref="submitFromRef"
        :rules="rules"
        :model="pageStatus.editFrom"
        label-width="auto"
      >
        <el-form-item label="手机号" prop="phone">
          <el-input
            v-model="pageStatus.editFrom.phone"
            placeholder="请输入手机号"
            clearable
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="pageStatus.dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submit()"> 保存 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import dayjs from "dayjs";
import { request } from "@/components/request";
import { reactive, onMounted, ref, nextTick, computed } from "vue";
import {
  ElTable,
  ElTableColumn,
  ElButton,
  ElMessage,
  ElMessageBox,
  ElCard,
  ElForm,
  ElFormItem,
  ElInput,
  ElDialog,
  ElSelect,
  ElOption,
  ElDatePicker,
} from "element-plus";
import "element-plus/dist/index.css";
import Pagination from "@/components/Pagination/index.vue";

const elFromRef = ref();
const submitFromRef = ref();
const tableData = computed(() => {
  const { list = [], selectFrom = {} } = pageStatus;
  const { phone = "" } = selectFrom;
  if (phone) {
    return list.filter((v) => v.phone.indexOf(phone) > -1);
  } else {
    return list;
  }
});
const pageStatus = reactive({
  dialogVisible: false,
  list: [],
  selectFrom: {
    phone: "",
    page: 1,
    pageSize: 20,
    count: 0,
  },
  editFrom: {},
});
const rules = {
  phone: [
    {
      required: true,
      message: "请输入手机号",
      trigger: "change",
    },
    { pattern: /^1[3-9]\d{9}$/, message: "手机号格式不正确", trigger: "blur" },
  ],
};
const getList = async () => {
  try {
    const { page, pageSize } = pageStatus.selectFrom;
    const res = await request("admin/user/getList", "get", {
      page,
      pageSize,
    });
    const { data = [], page: pageNo = 0, count } = res;
    pageStatus.selectFrom.page = pageNo;
    pageStatus.selectFrom.count = count;
    pageStatus.list = data.map((v) => {
      const { updatedAt, createdAt } = v;
      return {
        ...v,
        createdTime: dayjs(createdAt).format("YYYY-MM-DD HH:mm:ss"),
        updatedTime: dayjs(updatedAt).format("YYYY-MM-DD HH:mm:ss"),
      };
    });
  } catch (error) {
    console.log(error);
  }
};
const reset = async () => {
  await elFromRef.value.resetFields();
  await getList();
};
const edit = async (parmas = {}) => {
  pageStatus.dialogVisible = true;
  await nextTick(async () => {
    await submitFromRef.value.clearValidate();
    pageStatus.editFrom = {};
    if (Object.keys(parmas).length) {
      const { phone, id } = parmas;
      pageStatus.editFrom = { phone, id };
    }
  });
};
const remove = (id) => {
  ElMessageBox.alert("您确定要删除此用户吗?", "提示", {
    confirmButtonText: "确定",
    callback: async (action) => {
      if ("confirm" === action) {
        // 发送删除请求
        const res = await request("删除请求接口地址", "delete", { id });
        const { code, message } = res;
        ElMessage({
          message,
          type: code === 0 ? "success" : "error",
        });
        if (code === 0) {
          await getList();
        }
      }
    },
  });
};
const submit = async () => {
  await submitFromRef.value.validate();
  const parmas = {
    ...pageStatus.editFrom,
  };
  Object.keys(pageStatus.editFrom).map((key) => {
    if (![].includes(key)) {
      parmas[key] = pageStatus.editFrom[key];
    }
  });
  const res = await request(
    parmas.id ? "auth/saveUser" : "admin/user/create_user",
    "post",
    parmas
  );
  const { code, message } = res;
  ElMessage({
    message,
    type: code == 0 ? "success" : "error",
  });
  if (code === 0) {
    await getList();
    pageStatus.dialogVisible = false;
  }
};

onMounted(async () => {
  await getList();
});
</script>

<style scoped></style>
