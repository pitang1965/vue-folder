<template>
  <div class="container mx-auto px-2">
    <h1 class="font-bold">ツリー</h1>
    <div class="flex mt-4">
      <h2>label: {{ currentLabel }}</h2>
      <h2 class="ml-2">フォルダ: {{ isFolder ? 'Yes' : 'No' }}</h2>
      <h2 class="ml-2">id: {{ currentId ? currentId : '未選択' }}</h2>
    </div>

    <div class="flex gap-2">
      <button
        :disabled="addFolderDisabled"
        @click="folderNameDialogVisible = true"
        class="text-white px-2 my-2 rounded-full"
        :class="{
          'bg-purple-500': !addFolderDisabled,
          'bg-gray-300': addFolderDisabled,
          'hover:bg-purple-700': !addFolderDisabled
        }"
      >
        フォルダを追加
      </button>
      <button
        :disabled="addDocumentDisabled"
        @click="addDocument"
        class="text-white px-2 my-2 rounded-full"
        :class="{
          'bg-purple-500': !addDocumentDisabled,
          'bg-gray-300': addDocumentDisabled,
          'hover:bg-purple-700': !addDocumentDisabled
        }"
      >
        文書を追加
      </button>
      <button
        :disabled="deleteDisabled"
        @click="deleteItem"
        class="text-white px-2 my-2 rounded-full"
        :class="{
          'bg-purple-500': !deleteDisabled,
          'bg-gray-300': deleteDisabled,
          'hover:bg-purple-700': !deleteDisabled
        }"
      >
        削除
      </button>
      <button
        :disabled="renameDisabled"
        @click="renameItem"
        class="text-white px-2 my-2 rounded-full"
        :class="{
          'bg-purple-500': !renameDisabled,
          'bg-gray-300': renameDisabled,
          'hover:bg-purple-700': !renameDisabled
        }"
      >
        改名
      </button>
      <FolderNameDialog v-model="folderNameDialogVisible" @folderAdded="handleFolderAdded" />
    </div>
    <CustomTree :data="data" @selected="selectedHandler" />
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import CustomTree from '@/components/CustomTree.vue'
import FolderNameDialog from '@/components/FolderNameDialog.vue'
import createData from '@/data/createData'
import { v4 as uuidv4 } from 'uuid'

const folderNameDialogVisible = ref(false)
const currentId = ref('')
const currentLabel = ref('')
const isFolder = ref(false)

const data = reactive(createData())

const selectedHandler = ({ id, label, isFolder: isFolderValue }) => {
  currentId.value = id
  currentLabel.value = label
  isFolder.value = isFolderValue
}

const handleFolderAdded = folderName => {
  alert(
    `${folderName}が入力されたよ。現在のフォルダ名は${
      currentLabel.value ? currentLabel.value : '未指定'
    }`
  )
  if (currentId.value) {
  } else {
    data.push({
      id: uuidv4(),
      label: folderName,
      children: []
    })
    console.log(data) // データは更新されるが、CustomTreeは更新されない。
  }
}

const addDocument = () => {
  alert('文書追加')
}

const deleteItem = () => {
  alert('削除')
}

const renameItem = () => {
  alert('改名')
}

// [フォルダを追加]が使用不可
const addFolderDisabled = computed(() => {
  if (isFolder.value) return false
  return !!currentId.value
})

// [文書を追加]が使用不可
const addDocumentDisabled = computed(() => !isFolder.value)

// [削除]が使用不可
const deleteDisabled = computed(() => {
  if (isFolder.value && currentLabel.value === '未分類') return true
  return !!!currentId.value
})

// [改名]が使用不可
const renameDisabled = computed(() => {
  if (isFolder.value && currentLabel.value === '未分類') return true
  return !!!currentId.value
})
</script>

<style></style>
