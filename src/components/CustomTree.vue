<template>
  <el-tree-v2
    :data="data"
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
import { ElTreeV2 } from 'element-plus'
const props = defineProps({
  data: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['selected'])

const clickHandler = (data: TreeNodeData, node: TreeNode) => {
  const isFolder = !node.isLeaf
  emit('selected', { id: data.id, label: data.label, isFolder })
}
</script>

<style></style>
