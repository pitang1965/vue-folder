<template>
  <el-tree-v2
    :data="data"
    :props="props"
    :height="400"
    class="mt-4 border-2 border-slate-300"
    @node-click="clickHandler"
  >
    <template #default="{ node }">
      <font-awesome-icon v-if="!node.isLeaf" icon="fa-folder" class="pr-2" />
      <span>{{ node.label }}</span>
    </template>
  </el-tree-v2>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  props: {
    type: Object,
    required: true
  }
})
</script>

<style></style>
