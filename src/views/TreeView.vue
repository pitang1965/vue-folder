<template>
  <div class="container mx-auto px-2">
    <h1 class="font-bold">ツリー</h1>
    <div class="flex mt-4">
      <h2>label: {{ currentLabel ? currentLabel : '未選択' }}</h2>
      <h2 class="ml-2">フォルダ: {{ isFolder ? 'Yes' : 'No' }}</h2>
      <h2 class="ml-2">id: {{ currentId ? currentId : '未選択' }}</h2>
    </div>

    <CustomTree :data="data" :props="props" @node-click="clickHandler" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import CustomTree from '@/components/CustomTree.vue'
import createData from '@/data/createData'

const data = createData()

const currentId = ref('')
const currentLabel = ref('')
const isFolder = ref(false)

const clickHandler = (data: TreeNodeData, node: TreeNode) => {
  console.log(data)
  console.log(node)

  currentId.value = data.id
  currentLabel.value = data.label
  isFolder.value = !node.isLeaf
}
</script>

<style></style>
