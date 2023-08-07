<template>
  <el-dialog v-model="visible" :title="props.title" width="30%">
    <span>{{ props.description }}</span>
    <el-input v-model="name" :placeholder="props.placeholder" :description="props.description" class="mt-2" />
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

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
    default: false
  },
  title: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});
const emit = defineEmits(['update:modelValue', 'confirm']);

const visible = computed({
  get() {
    return props.modelValue;
  },
  set(visible) {
    emit('update:modelValue', visible);
  }
});

const name = ref('');

const closeDialog = () => {
  visible.value = false;
};

const confirmDialog = () => {
  if (name.value === '') {
    alert('何も入力されていません。');
    return;
  }
  emit('confirm', name.value);
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
