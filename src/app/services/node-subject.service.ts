import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Node } from '../node';

@Injectable({
  providedIn: 'root',
})
export class NodeSubjectService {
  constructor() {}
  // store new node for creation
  newNode = new BehaviorSubject<Node | null>(null);
  // store existing node for deletion
  destroyNode = new BehaviorSubject<Node | null>(null);
  // store selected node id that will be parent of new node
  selectedNodeParentId = new BehaviorSubject<string>('');

  // sets newNode value 
  setNewNode(node: Node | null) {
    this.newNode.next(node);
  }

  // sets destroyNode value
  setDestroyNode(value: Node | null) {
    this.destroyNode.next(value);
  }

  // sets selectedNodeParentId value
  setSelectedNodeParentId(value: string) {
    this.selectedNodeParentId.next(value);
  }
}
