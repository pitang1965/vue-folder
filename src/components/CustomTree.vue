<template>
  <n-tree
    block-line
    :data="data"
    :default-expanded-keys="defaultExpandedKeys"
    :selectable="false"
    :node-props="nodeProps"
  />
</template>

<script setup lang="ts">
import { onUpdated, ref } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['selected'])

onUpdated(() => {
  console.log('props.dataが変更！')
})

const defaultExpandedKeys = ref(['40', '41'])

const nodeProps = ({ option }: { option: TreeOption }) => {
  // クリックされたときの処理
  const onClick = () => {
    const isFolder = typeof(option.children) !== 'undefined'
    emit('selected', { id: option.key, label: option.label, isFolder })
    console.log(option)
  }
  return { onClick }
}
</script>

<style></style>
