import { h } from 'vue'
import { repeat } from 'seemly'
import { NButton, TreeOption } from 'naive-ui'
import { v4 as uuidv4 } from 'uuid'

const createLabel = (level: number): string  => {
  if (level === 4) return 'Level 4'
  if (level === 3) return 'Level 3'
  if (level === 2) return 'Level 2'
  if (level === 1) return 'Level 1'
  return ''
}


// ダミーの初期データを作成
export const createData = (level = 3, baseKey = ''): TreeOption[] => {
  if (!level) return [];
  return repeat(6 - level, undefined).map((_, index) => {
    const key = '' + baseKey + level + index
    const label = createLabel(level)
    return {
      label,
      key,
      children: level > 1 ? createData(level - 1, key) :  undefined,
    }
  })
}

// idで指定したフォルダ以下に新規フォルダを追加
export const addFolderDataById = (tree: TreeOption[], id: string, name: string): void => {
  const createFolderData =(name: string) => {
    return {
      label: name,
      key: uuidv4(),
      children: [],
    }
  }

  if (!id) {
    const newData = createFolderData(name);
    tree.push(newData);
    return;
  }

  tree.forEach((node) => {
    if (node.key === id) {
      const newData = createFolderData(name);

      if (!node.children) node.children = [];
      node.children.push(newData);
      return;
    }
    if (node.children) {
      addFolderDataById(node.children, id, name);
    }
  });
};


// idで指定したフォルダ以下に新規文書を追加
export const addDocumentDataById = (tree: TreeOption[], id: string, name: string): void => {
  const createDocumentData =(name: string) => {
    return {
      label: name,
      key: uuidv4(),
    }
  }

  if (!id) {
    const newData = createDocumentData(name);
    tree.push(newData);
    return;
  }

  tree.forEach((node) => {
    if (node.key === id) {
      const newData = createDocumentData(name);

      if (!node.children) node.children = [];
      node.children.push(newData);
      return;
    }
    if (node.children) {
      addDocumentDataById(node.children, id, name);
    }
  });
};