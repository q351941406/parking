<template>
  <div class="hader">
    <div class="bg-base-100">
      <slot></slot>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.hader {
  height: 64px;
}
.hader > div {
  z-index: 999;
  height: 64px;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
}
</style>
