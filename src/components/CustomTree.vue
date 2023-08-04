<template>
  <n-tree
    block-line
    :data="data"
    :default-expanded-keys="defaultExpandedKeys"
    :selectable="false"
    :node-props="nodeProps"
    :render-switcher-icon="renderSwitcherIconWithExpaned"
  />
</template>

<script setup lang="ts">
import { h, ref } from 'vue';
import { NIcon, TreeOption } from 'naive-ui';
import { FolderOpenOutline, FolderOutline } from '@vicons/ionicons5';

const props = defineProps({
  data: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['selected']);

// 最初に展開するノード
const defaultExpandedKeys = ref(['30', '31']);

const nodeProps = ({ option }: { option: TreeOption }) => {
  // クリックされたときの処理
  const onClick = () => {
    const isFolder = typeof option.children !== 'undefined';
    emit('selected', { id: option.key, label: option.label, isFolder });
  };
  return { onClick };
};

// アイコンは https://www.xicons.org/ のionicons5のもの
const renderSwitcherIconWithExpaned = ({ expanded }: { expanded: boolean }) =>
  h(NIcon, null, {
    default: () => h(expanded ? FolderOpenOutline : FolderOutline)
  });

</script>

<style></style>
