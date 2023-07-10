import { v4 as uuidv4 } from 'uuid'

interface Tree {
  id: string
  label: string
  children?: Tree[]
}

const createData = (): Tree[] => [
  {
    id: uuidv4(),
    label: '未分類',
    children: [
      {
        id: uuidv4(),
        label: '文書1'
      },
      {
        id: uuidv4(),
        label: '文書2'
      }
    ]
  },
  {
    id: uuidv4(),
    label: 'フォルダ1',
    children: [
      {
        id: uuidv4(),
        label: '文書3'
      },
      {
        id: uuidv4(),
        label: '文書4'
      },
      {
        id: uuidv4(),
        label: '文書5'
      }
    ]
  },
  {
    id: uuidv4(),
    label: 'フォルダ2',
    children: [
      {
        id: uuidv4(),
        label: '文書6'
      }
    ]
  }
]

export default createData;