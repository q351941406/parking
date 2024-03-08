<template>
  <el-pagination
    v-model:current-page="currentPage"
    v-model:page-size="currentPageSize"
    :page-sizes="pageSizeList"
    :small="small"
    :disabled="disabled"
    :background="background"
    :default-page-size="pageSizeList[0]"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
  />
</template>
<script setup>
import { computed, defineProps, defineEmits } from "vue";
import { ElPagination } from "element-plus";
const props = defineProps({
  modelValue: {
    tyep: [Number, String],
    default: 1,
  },
  pageSize: {
    tyep: [Number, String],
    default: 20,
  },
  pageSizeList: {
    type: Array,
    default: () => [100, 200, 300, 400, 500],
  },
  total: {
    tyep: [Number, String],
    default: 0,
  },
  small: {
    type: Boolean,
    default: false,
  },
  background: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["update:modelValue", "update:pageSize", "change"]);
// 页码
const currentPage = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit("update:modelValue", val);
    emit("change");
  },
});
// 每页大小
const currentPageSize = computed({
  get() {
    return props.pageSize;
  },
  set(val) {
    emit("update:pageSize", val);
    emit("change");
  },
});
</script>
