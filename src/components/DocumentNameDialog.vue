<template>
  <el-dialog v-model="visible" title="文書の追加" width="30%">
    <span>文書名を入力してください。</span>
    <el-input v-model="documentName" placeholder="文書名" class="mt-2" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">Cancel</el-button>
        <el-button @click="confirmDialog" type="primary"> Confirm </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed, ref } from 'vue';
import { ElButton, ElDialog, ElInput, ElMessageBox } from 'element-plus';

const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue', 'documentAdded']);

const visible = computed({
  get() {
    return props.modelValue;
  },
  set(visible) {
    emit('update:modelValue', visible);
  }
});

const documentName = ref('');

const closeDialog = () => {
  visible.value = false;
};

const confirmDialog = () => {
  if (documentName.value === '') {
    alert('何も入力されていません。');
    return;
  }
  emit('documentAdded', documentName.value);
  closeDialog();
};
</script>

<style scoped>
.el-button {
  background-color: #ffffff;
}

.el-button:hover {
  color: #a855f7;
  background-color: #e9d5ff;
}

.el-button--primary {
  background-color: #a855f7;
}

.el-button--primary:hover {
  color: #ffffff;
  background-color: #7e22ce;
}
</style>
