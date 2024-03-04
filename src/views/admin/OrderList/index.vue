<template>
  <div>
    <el-card style="margin: 0 0 20px 0">
      <el-form ref="elFromRef" inline :model="pageStatus.selectFrom">
        <el-form-item label="" prop="phone">
          <el-input
            style="height: 40px"
            clearable
            v-model="pageStatus.selectFrom.phone"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item label="" prop="parking_lot_id">
          <el-select
            clearable
            v-model="pageStatus.selectFrom.parking_lot_id"
            size="large"
            placeholder="请选择停车场"
            style="width: 240px"
          >
            <el-option
              v-for="(item, index) in options.parkingList"
              :key="index"
              :label="item.title"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="" prop="from_source">
          <el-select
            clearable
            v-model="pageStatus.selectFrom.from_source"
            size="large"
            placeholder="请选择来源"
            style="width: 240px"
          >
            <el-option
              v-for="(item, index) in options.fromSource"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="" prop="status">
          <el-select
            clearable
            v-model="pageStatus.selectFrom.status"
            size="large"
            placeholder="请选择状态"
            style="width: 240px"
          >
            <el-option
              v-for="(item, index) in options.status"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="" prop="environment">
          <el-select
            clearable
            v-model="pageStatus.selectFrom.environment"
            size="large"
            placeholder="请选择环境"
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
        <el-form-item label="">
          <!-- <el-button type="" @click.stop="getList()">搜索</el-button> -->
          <el-button type="" @click.stop="reset()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <el-button style="margin: 0 0 20px 0" type="" @click.stop="edit()"
        >创建订单</el-button
      >
      <el-table v-loading="pageStatus.loading" :data="tableData" border>
        <el-table-column sortable label="ID" prop="id" align="center" />
        <el-table-column
          sortable
          label="车牌号"
          prop="plateNumber"
          align="center"
        />
        <el-table-column
          sortable
          label="停车场"
          prop="ParkingLotName"
          align="center"
        />
        <el-table-column sortable label="手机号" prop="phone" align="center" />
        <el-table-column
          sortable
          label="环境"
          prop="environmentText"
          align="center"
        />
        <el-table-column sortable label="航班" prop="flight" align="center" />
        <el-table-column
          sortable
          label="单日价格"
          prop="price"
          align="center"
        />
        <el-table-column
          sortable
          label="进场时间"
          prop="starTimeText"
          align="center"
        />
        <el-table-column
          sortable
          label="离场时间"
          prop="endTimeText"
          align="center"
        />
        <el-table-column
          sortable
          label="来源"
          prop="fromSourceText"
          align="center"
        />
        <el-table-column
          sortable
          label="状态"
          prop="statusText"
          align="center"
        />
        <el-table-column label="备注" prop="remark" align="center" />
        <el-table-column
          label="操作"
          fixed="right"
          width="200px"
          align="center"
        >
          <template #default="scope">
            <el-button type="" @click.stop="edit(scope.row)"> 编辑 </el-button>
            <el-button type="" @click.stop="remove(scope.row.id)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
      v-model="pageStatus.dialogVisible"
      :title="pageStatus.editFrom.id ? '编辑' : '新增'"
      width="40%"
    >
      <el-form
        ref="submitFromRef"
        :rules="rules"
        :model="pageStatus.editFrom"
        label-width="auto"
      >
        <el-form-item label="用户" prop="user_id">
          <el-select
            filterable
            v-model="pageStatus.editFrom.user_id"
            size="large"
            placeholder="请选择用户"
            style="width: 240px"
            clearable
          >
            <el-option
              v-for="(item, index) in options.userList"
              :key="index"
              :label="item.phone"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="停车场" prop="parking_lot_id">
          <el-select
            v-model="pageStatus.editFrom.parking_lot_id"
            size="large"
            placeholder="请选择停车场"
            style="width: 240px"
            clearable
          >
            <el-option
              v-for="(item, index) in options.parkingList"
              :key="index"
              :label="item.title"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="车牌号" prop="plateNumber">
          <el-input
            class="w-300"
            v-model="pageStatus.editFrom.plateNumber"
            placeholder="请输入车牌号"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="航班" prop="flight">
          <el-input
            class="w-300"
            v-model="pageStatus.editFrom.flight"
            placeholder="请输入航班"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="进场时间" prop="starTime">
          <el-date-picker
            v-model="pageStatus.editFrom.starTime"
            type="datetime"
            placeholder="请选择时间"
            clearable
          />
        </el-form-item>
        <el-form-item label="离场时间" prop="endTime">
          <el-date-picker
            v-model="pageStatus.editFrom.endTime"
            type="datetime"
            placeholder="请选择时间"
            clearable
          />
        </el-form-item>

        <el-form-item label="来源" prop="from_source">
          <el-select
            v-model="pageStatus.editFrom.from_source"
            size="large"
            placeholder="请选择来源"
            style="width: 240px"
            clearable
          >
            <el-option
              v-for="(item, index) in options.fromSource"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-select
            v-model="pageStatus.editFrom.status"
            size="large"
            placeholder="请选择状态"
            style="width: 240px"
            clearable
          >
            <el-option
              v-for="(item, index) in options.status"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="环境" prop="environment">
          <el-select
            v-model="pageStatus.editFrom.environment"
            size="large"
            placeholder="请选择环境"
            clearable
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
        <el-form-item label="单日价格" prop="price">
          <el-input
            type="number"
            v-model="pageStatus.editFrom.price"
            placeholder="请输入单日价格"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            type="textarea"
            v-model="pageStatus.editFrom.remark"
            placeholder="请输入备注"
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
const elFromRef = ref();
const submitFromRef = ref();
const pageStatus = reactive({
  dialogVisible: false,
  list: [],
  loading: false,
  selectFrom: {},
  editFrom: {},
});
const tableData = computed(() => {
  const { list = [], selectFrom = {} } = pageStatus;
  const {
    parking_lot_id = "",
    from_source = "",
    status = "",
    environment = "",
    phone = "",
  } = selectFrom;
  return list.filter((v) => {
    return (
      (phone ? v.phone.indexOf(phone) > -1 : true) &&
      (parking_lot_id || parking_lot_id === 0
        ? v.parking_lot_id == parking_lot_id
        : true) &&
      (from_source || from_source === 0
        ? v.from_source == from_source
        : true) &&
      (status || status === 0 ? v.status == status : true) &&
      (environment || environment === 0 ? v.environment == environment : true)
    );
  });
});
const options = reactive({
  parkingList: [],
  userList: [],
  fromSource: [
    {
      label: "未分配",
      value: 0,
    },
    {
      label: "淘车位",
      value: 1,
    },
    {
      label: "小强",
      value: 2,
    },
    {
      label: "泊安飞",
      value: 3,
    },
    {
      label: "抖音",
      value: 4,
    },
    {
      label: "闲鱼",
      value: 5,
    },
    {
      label: "小红书",
      value: 6,
    },
    {
      label: "快手",
      value: 7,
    },
    {
      label: "视频号",
      value: 8,
    },
    {
      label: "商务合作",
      value: 9,
    },
  ],
  status: [
    {
      label: "未分配",
      value: 0,
    },
    {
      label: "待停",
      value: 1,
    },
    {
      label: "待取",
      value: 2,
    },
    {
      label: "已取",
      value: 3,
    },
  ],
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
});
const rules = {
  // plateNumber: [
  //   {
  //     required: true,
  //     message: "请输入车牌号",
  //     trigger: "change",
  //   },
  // ],
  user_id: [
    {
      required: true,
      message: "请选择用户",
      trigger: "change",
    },
  ],
  // starTime: [
  //   {
  //     required: true,
  //     message: "请选择进场时间",
  //     trigger: "change",
  //   },
  // ],
  // endTime: [
  //   {
  //     required: true,
  //     message: "请选择离场时间",
  //     trigger: "change",
  //   },
  // ],
  from_source: [
    {
      required: true,
      message: "请选择来源",
      trigger: "change",
    },
  ],
  status: [
    {
      required: true,
      message: "请选择状态",
      trigger: "change",
    },
  ],
  // price: [
  //   {
  //     required: true,
  //     message: "请输入单日价格",
  //     trigger: "change",
  //   },
  // ],
  // remark: [
  //   {
  //     required: true,
  //     message: "请输入备注",
  //     trigger: "change",
  //   },
  // ],
  environment: [
    {
      required: true,
      message: "请选择环境",
      trigger: "change",
    },
  ],
  // flight: [
  //   {
  //     required: true,
  //     message: "请输入航班",
  //     trigger: "change",
  //   },
  // ],
};
const getList = async () => {
  try {
    const res = await request("admin/order/getList", "get", {
      // ...pageStatus.selectFrom,
    });
    const { data = [] } = res;
    pageStatus.list = data.map((v) => {
      const {
        environment,
        starTime,
        endTime,
        status,
        from_source,
        ParkingLot,
        User,
      } = v;
      return {
        ...v,
        phone: User.phone,
        ParkingLotName: ParkingLot.title,
        environmentText:
          environment == 0
            ? "室内"
            : environment == 1
            ? "室外"
            : "",
        fromSourceText:
          from_source == 0
            ? "未分配"
            : from_source == 1
            ? "淘车位"
            : from_source == 2
            ? "小强"
            : from_source == 3
            ? "泊安飞"
            : from_source == 4
            ? "抖音"
            : from_source == 5
            ? "闲鱼"
            : from_source == 6
            ? "小红书"
            : from_source == 7
            ? "快手"
            : from_source == 8
            ? "视频号"
            : from_source == 9
            ? "商务合作"
            : "",
        statusText:
          status == 0
            ? "未分配"
            : status == 1
            ? "待停"
            : status == 2
            ? "待取"
            : status == 3
            ? "已取"
            : "",
        starTimeText: starTime
          ? dayjs(starTime).format("YYYY-MM-DD HH:mm:ss")
          : "-",
        endTimeText: endTime
          ? dayjs(endTime).format("YYYY-MM-DD HH:mm:ss")
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
  await getUserList();
  pageStatus.dialogVisible = true;
  await nextTick(async () => {
    await submitFromRef.value.clearValidate();
    pageStatus.editFrom = {
      status: 0,
      from_source: 0,
      environment: 0,
    };
    if (Object.keys(parmas).length) {
      pageStatus.editFrom = { ...parmas };
    }
  });
};
const remove = (id) => {
  ElMessageBox.alert("您确定要删除此订单吗?", "提示", {
    confirmButtonText: "确定",
    callback: async (action) => {
      if ("confirm" === action) {
        // 发送删除请求
        const res = await request("admin/order/deleteOrder", "delete", { id });
        const { code, message } = res;
        ElMessage({
          message,
          type: code == 0 ? "success" : "error",
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
    if (
      ![
        "fromSourceText",
        "statusText",
        "environmentText",
        "starTimeText",
        "endTimeText",
      ].includes(key)
    ) {
      parmas[key] = pageStatus.editFrom[key];
    }
  });
  const res = await request(
    parmas.id ? "admin/order/edit" : "admin/order/add",
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
const getUserList = async () => {
  const res = await request("admin/user/getList", "get", {});
  const { data = [] } = res;
  options.userList = data;
};
const getParkingList = async () => {
  const res = await request("get_parking_lot", "get", {});
  const { data = [] } = res;
  options.parkingList = data;
};

onMounted(async () => {
  await getParkingList();
  await getList();
});
</script>

<style scoped>
.el-input {
  max-width: 240px !important;
}
.el-textarea__inner {
  max-width: 300px;
}
.el-textarea {
  max-width: 240px !important;
}
.w-300 {
  max-width: 300px;
}
</style>
