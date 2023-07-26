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


export const createData = (level = 3, baseKey = ''): TreeOption[] | undefined => {
  if (!level) return undefined
  return repeat(6 - level, undefined).map((_, index) => {
    const key = '' + baseKey + level + index
    const label = createLabel(level)
    return {
      label,
      key,
      children: createData(level - 1, key),
      suffix: () =>
        h(
          NButton,
          { text: true, type: 'primary' },
          { default: () => 'なんか説明' }
        ),
      prefix: () =>
        h(NButton, { text: true, type: 'primary' }, { default: () => '後でアイコン付ける' })
    }
  })
}

export const createFolderData =(name: string) => {
  return {
    label: name,
    key: uuidv4(),
    children: [],
    suffix: () =>
      h(
        NButton,
        { text: true, type: 'primary' },
        { default: () => 'なんか説明' }
      ),
    prefix: () =>
      h(NButton, { text: true, type: 'primary' }, { default: () => 'フォルダ' })
  }
}