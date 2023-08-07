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
        @click="documentNameDialogVisible = true"
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
      <DocumentNameDialog v-model="documentNameDialogVisible" @documentAdded="handleDocumentAdded" />
    </div>
    <CustomTree :data="data" @selected="selectedHandler" />
  </div>
</template>

<script setup lang="ts">
import { computed, h, reactive, ref } from 'vue';
import CustomTree from '../components/CustomTree.vue';
import FolderNameDialog from '../components/FolderNameDialog.vue';
import DocumentNameDialog from '../components/DocumentNameDialog.vue';
import { addDocumentDataById, addFolderDataById, createData } from '../data/createData';
import { TreeOption } from 'naive-ui';
import { faArrowLeftRotate } from '@fortawesome/free-solid-svg-icons';


const folderNameDialogVisible = ref(false);
const documentNameDialogVisible = ref(false);
const currentId = ref('');
const currentLabel = ref('');
const isFolder = ref(false);

const data: TreeOption[] = reactive(createData());

const selectedHandler = ({ id, label, isFolder: isFolderValue }) => {
  currentId.value = id;
  currentLabel.value = label;
  isFolder.value = isFolderValue;
};

const handleFolderAdded = folderName => {
  addFolderDataById(data, currentId.value, folderName);
};

const handleDocumentAdded = documentName => {
  addDocumentDataById(data, currentId.value, documentName);
}

const deleteItem = () => {
  alert('削除');
};

const renameItem = () => {
  alert('改名');
};

// [フォルダを追加]が使用不可
const addFolderDisabled = computed(() => {
  if (isFolder.value) return false;
  return !!currentId.value;
});

// [文書を追加]が使用不可
const addDocumentDisabled = computed(() => !isFolder.value);

// [削除]が使用不可
const deleteDisabled = computed(() => {
  if (isFolder.value && currentLabel.value === '未分類') return true;
  return !!!currentId.value;
});

// [改名]が使用不可
const renameDisabled = computed(() => {
  if (isFolder.value && currentLabel.value === '未分類') return true;
  return !!!currentId.value;
});
</script>

<style></style>
