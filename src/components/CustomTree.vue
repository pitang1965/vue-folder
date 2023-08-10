<template>
  <n-tree block-line :data="data" :default-expanded-keys="expandedKeys" :selectable="true" :node-props="nodeProps"
    :render-switcher-icon="renderSwitcherIconWithExpaned" :on-update:expanded-keys="handleExpandedKeysUpdate"
    :style="styleObject" class="tree" :class="{ 'is-dark': isDark }" />
</template>

<script setup lang="ts">
import { computed, h, onMounted, reactive, ref, watch } from 'vue';
import { NIcon, useOsTheme, TreeOption } from 'naive-ui';
import { FolderOpenOutline, FolderOutline } from '@vicons/ionicons5';

const props = defineProps({
  data: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['selected']);

// Naive UI関連（ツリーデータとダークモード対応）
const osThemeRef = useOsTheme();
const isDark = computed(() => (osThemeRef.value === 'dark'));
const styleObject = computed(() => ({
  backgroundColor: isDark.value ? '#464646' : '#f2f2f2',
  '--n-node-text-color': isDark.value ? '#fff' : '#555'
}));

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

watch(expandedKeys, async (newKeys) => {
  saveToLocalStorage();
});

</script>

<style>
.tree svg path {
  stroke: #555;
}

.tree.is-dark svg path {
  stroke: #fff;
}
</style>
