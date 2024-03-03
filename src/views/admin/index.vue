<template>
  <div style="padding: 20px">
    <el-tabs tab-position="left">
      <el-tab-pane label="订单列表"> <Order /> </el-tab-pane>
      <el-tab-pane label="用户列表">
        <User />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ElTabs, ElTabPane } from "element-plus";
import "element-plus/dist/index.css";
import User from "./UserList/index.vue";
import Order from "./OrderList/index.vue";
</script>

<style scoped></style>
