<template>
  <div class="content" data-theme="cupcake">
    <Fixations>
      <div class="navbar bg-base-100 shadow-sm">
        <div class="navbar-start">
          <button class="btn btn-ghost" @click="goBack">
            <IconBack class="size-5"></IconBack>
          </button>
        </div>
        <div class="navbar-center">
          <h1 class="text-xl">订单</h1>
        </div>
        <div class="navbar-end"></div>
      </div>
    </Fixations>

    <div v-if="pageStatus.isLoading" class="center-box">
      <span
        v-if="pageStatus.isLoading"
        class="loading loading-spinner loading-lg"
      ></span>
    </div>

    <div class="list">
      <div class="item" v-for="(item, index) in pageStatus.list" :key="index">
        <div class="header">
          <div class="left">订单{{ index + 1 }}</div>
          <div class="rigth">{{ item.ParkingLot.title }}</div>
        </div>
        <div class="item-main">
          <div class="item-main-row">
            <div class="left">单日价格</div>
            <div class="price stat-value text-accent text-xl">
              ￥{{ item.price }}
            </div>
          </div>
          <div class="item-main-row">
            <div class="left">环境</div>
            <div class="rigth">
              {{ item.environmentText == 0 ? "室内" : "室外" }}
            </div>
          </div>
          <div class="item-main-row">
            <div class="left">航班号</div>
            <div class="rigth">{{ item.flight }}</div>
          </div>
          <div class="item-main-row">
            <div class="left">车牌号</div>
            <div class="rigth licence-plate">{{ item.plateNumber }}</div>
          </div>
          <div class="item-main-row">
            <div class="left">进场时间</div>
            <div class="rigth">{{ item.starTimeText }}</div>
          </div>
          <div class="item-main-row">
            <div class="left">离场时间</div>
            <div class="rigth">{{ item.endTimeText }}</div>
          </div>
          <div class="item-main-row">
            <div class="left">来源</div>
            <div class="rigth">来源于{{ item.fromSourceText }}</div>
          </div>
          <div class="item-main-row">
            <div class="left">状态</div>
            <div
              class="rigth status"
              :class="{
                fetched: item.status == 3,
                tobeTaken: item.status == 2,
                standBy: item.status == 1,
              }"
            />
          </div>
          <div class="item-main-btn" @click.stop="handleItem(item)">
            查看监控
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import IconBack from "@/components/icons/IconBack.vue";
import Fixations from "@/components/Fixations/index.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import dayjs from "dayjs";
import { request } from "@/components/request";
import { reactive, onMounted } from "vue";
const router = useRouter();

const store = useStore();

const pageStatus = reactive({
  isLoading: true,
  list: [],
});
const list = async () => {
  const { id } = store.state.userInfo;
  pageStatus.isLoading = true;
  const res = await request("admin/order/getList", "get", {
    user_id: id,
  });
  pageStatus.isLoading = false;
  const { data = [] } = res;
  pageStatus.list = data.map((v) => {
    const { endTime, starTime, from_source } = v;
    return {
      ...v,
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
      starTimeText: dayjs(starTime).format("YYYY-MM-DD HH:mm:ss"),
      endTimeText: endTime ? dayjs(endTime).format("YYYY-MM-DD HH:mm:ss") : "-",
    };
  });
};
const handleItem = (item) => {
  const {} = item;
  router.push({ name: "CameraList" });
};
function goBack() {
  router.go(-1);
}
onMounted(() => {
  list();
});
</script>

<style lang="less" scoped>
.content {
  height: 100%;
  box-sizing: border-box;
  overflow-y: scroll;
  .list {
    padding: 20px 20px 24px;
    .item {
      background-color: #ffffff;
      border-radius: 14px;
      margin-bottom: 10px;

      .header {
        display: flex;
        font-size: 17px;
        padding: 16px 20px;
        font-weight: 600;
        justify-content: space-between;
        border-bottom: 2px dashed #b8bdc1;
      }
      .item-main {
        padding: 14px 20px;
        display: flex;
        flex-direction: column;
        .item-main-row {
          font-size: 15px;
          display: flex;
          margin-bottom: 10px;
          color: #939ca0;
          justify-content: space-between;
          .rigth {
            font-weight: 600;
            color: #2b343e;
          }
          .licence-plate {
            background-color: #377efe;
            color: #dce8fd;
            border-radius: 4px;
            padding: 0 4px;
          }
          .price {
            // color: #ff1900;
          }
          .status {
            color: #7f7f7f;
            background-color: #ececec;
            padding: 4px 14px;
            border-radius: 16px;
            &::before {
              font-size: 15px;
              font-weight: 600;
              content: "未分配";
            }
          }
          .fetched {
            color: #35b0b7;
            background-color: #d6f4f6;
            &::before {
              font-weight: 600;
              content: "已取";
            }
          }
          .tobeTaken {
            color: #4c8bfe;
            background-color: #e5f1ff;
            &::before {
              font-weight: 600;
              content: "待取";
            }
          }
          .standBy {
            color: #fe321d;
            background-color: #fee5e1;
            &::before {
              font-weight: 600;
              content: "待停";
            }
          }
        }
        .item-main-btn {
          margin-top: 10px;
          font-size: 16px;
          background-color: #66c3c8;
          height: 50px;
          border-radius: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
}
.center-box {
  padding-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
