<template>
  <n-tree
    block-line
    :data="data"
    :default-expanded-keys="defaultExpandedKeys"
    :selectable="false"
  />
</template>

<script setup lang="ts" >
import { onUpdated, ref } from 'vue'

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

onUpdated(() => {
  console.log('props.dataが変更！')
})

const defaultExpandedKeys = ref(['40', '41'])

</script>

<style></style>
