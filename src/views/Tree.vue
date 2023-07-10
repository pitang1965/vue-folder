<template>
  <div class="container mx-auto px-2">
    <h1 class="font-bold" >ツリー</h1>
    <div class="flex mt-4">
      <h2>id: {{ currentId ? currentId : '未選択' }}</h2>
      <h2 class="ml-2">label: {{ currentLabel ? currentLabel : '未選択' }}</h2>
      <h2 class="ml-2">フォルダ: {{ isFolder ? 'Yes' : 'No' }}</h2>
    </div>
    <el-tree-v2 :data="data" :props="props" :height="400" class="mt-4 border-2 border-slate-300" @node-click="clickHandler">
      <template #default="{ node }">
        <font-awesome-icon v-if="!node.isLeaf" icon="fa-folder" class="pr-2" />
        <span>{{ node.label }}</span>
      </template>
    </el-tree-v2>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

interface Tree {
  id: string
  label: string
  children?: Tree[]
}

const props = {
  value: 'id',
  label: 'label',
  children: 'children'
}

const createData = (): Tree[] => [
  {
    id: '未分類',
    label: '未分類',
    children: [
      {
        id: '文書1',
        label: '文書1'
      },
      {
        id: '文書2',
        label: '文書2'
      }
    ]
  },
  {
    id: 'フォルダ1',
    label: 'フォルダ1',
    children: [
      {
        id: '文書3',
        label: '文書3'
      },
      {
        id: '文書4',
        label: '文書4'
      },
      {
        id: '文書5',
        label: '文書5'
      }
    ]
  },
  {
    id: 'フォルダ2',
    label: 'フォルダ2',
    children: [
      {
        id: '文書6',
        label: '文書6'
      }
    ]
  }
]

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
