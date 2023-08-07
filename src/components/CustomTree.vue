<template>
  <n-tree
    block-line
    :data="data"
    :default-expanded-keys="expandedKeys"
    :selectable="false"
    :node-props="nodeProps"
    :render-switcher-icon="renderSwitcherIconWithExpaned"
    :on-update:expanded-keys="handleExpandedKeysUpdate"
  />
</template>

<script setup lang="ts">
import { h, onMounted, ref, watch } from 'vue';
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
const expandedKeys = ref([]);

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

const handleExpandedKeysUpdate = (keys, options, { node, action }) => {
  expandedKeys.value = keys;

  console.log('Updated Expanded Keys:', keys);
  console.log('Options:', options);
  console.log('Node:', node);
  console.log('Action:', action);

  // 必要に応じて追加の処理を行う
  if (action === 'expand') {
    console.log(`${node.label} has been expanded!`);
  } else if (action === 'collapse') {
    console.log(`${node.label} has been collapsed!`);
  }
};

const loadFromLocalStorage = () => {
  const item = localStorage.getItem('expandedKeys');
  if (item) {
    expandedKeys.value = JSON.parse(item);
  }
};

const saveToLocalStorage = () => {
  const keys = localStorage.setItem('expandedKeys', JSON.stringify(expandedKeys.value));
};

onMounted(() => {
  loadFromLocalStorage();
});

watch (expandedKeys, async(newKeys) => {
  saveToLocalStorage();
});

</script>

<style></style>
