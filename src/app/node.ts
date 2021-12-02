export interface Node {
  id: string;
  name: string;
  type: 'folder' | 'file' | '';
  parent?: string;
}

export interface NodeGroups {
  [key: string]: Node[]
}
