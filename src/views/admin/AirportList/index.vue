<template>
  <div>
    <el-card>
      <el-table :data="tableData" border>
        <el-table-column sortable label="ID" prop="id" align="center" />
        <el-table-column sortable label="名称" prop="title" align="center" />
        <el-table-column sortable label="IATA" prop="IATA" align="center" />
        <el-table-column sortable label="ICAO" prop="ICAO" align="center" />
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
        <el-table-column
          label="操作"
          width="200px"
          align="center"
          fixed="right"
        >
          <template #default="scope">
            <el-button type="" @click.stop="edit(scope.row)">
              同步库存
            </el-button>
            <!-- <el-button type="" @click.stop="remove(scope.row.id)">
              删除
            </el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <!-- <Pagination
        v-model="pageStatus.selectFrom.page"
        v-model:pageSize="pageStatus.selectFrom.pageSize"
        :total="pageStatus.selectFrom.count"
        @change="getList()"
      /> -->
    </el-card>
    <el-dialog
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      v-model="pageStatus.dialogVisible"
      :title="'同步库存'"
      width="400"
    >
      <el-form
        ref="submitFromRef"
        :rules="rules"
        :model="pageStatus.editFrom"
        label-width="auto"
      >
        <el-form-item label="环境" prop="environment">
          <el-select
            clearable
            v-model="pageStatus.selectFrom.environment"
            size="large"
            placeholder="请选择状态"
            style="width: 240px"
          >
            <el-option
              v-for="(item, index) in options.environment"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="服务" prop="valetParking">
          <el-select
            clearable
            v-model="pageStatus.selectFrom.valetParking"
            size="large"
            placeholder="请选择状态"
            style="width: 240px"
          >
            <el-option
              v-for="(item, index) in options.valetParking"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="天数" prop="phone">
          <el-input
            type="number"
            v-model="pageStatus.editFrom.futureDay"
            placeholder="请输入未来多少天"
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
const options = {
  environment: [
    {
      label: "室内",
      value: 0,
    },
    {
      label: "室外",
      value: 1,
    },
  ],
  valetParking: [
    {
      label: "自助",
      value: 0,
    },
    {
      label: "代泊",
      value: 1,
    },
  ],
};
const pageStatus = reactive({
  dialogVisible: false,
  list: [],
  selectFrom: {
    // page: 1,
    // pageSize: 20,
    // count: 0,
  },
  editFrom: {},
});
const rules = {
  futureDay: [
    {
      required: true,
      message: "请输入天数",
      trigger: "change",
    },
  ],
};
const getList = async () => {
  try {
    const { page, pageSize } = pageStatus.selectFrom;
    const res = await request("admin/airport/getAirportList", "get", {
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
        createdTime: createdAt
          ? dayjs(createdAt).format("YYYY-MM-DD HH:mm:ss")
          : "-",
        updatedTime: updatedAt
          ? dayjs(updatedAt).format("YYYY-MM-DD HH:mm:ss")
          : "-",
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
      const { id } = parmas;
      pageStatus.editFrom = { id };
    }
  });
};
const remove = (id) => {
  ElMessageBox.alert("您确定要删除此条数据吗?", "提示", {
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
  const {
    id: airport_id,
    environment = 0,
    valetParking = 0,
    futureDay,
  } = pageStatus.editFrom;
  const parmas = {
    airport_id,
    environment,
    valetParking,
    futureDay: Number(futureDay),
  };

  const res = await request("admin/airport/syncStock", "post", parmas);
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
