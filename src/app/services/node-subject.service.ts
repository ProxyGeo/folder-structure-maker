import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Node } from '../node';

@Injectable({
  providedIn: 'root',
})
export class NodeSubjectService {
  constructor() {}
  newNode = new BehaviorSubject<Node | null>(null);
  destroyNode = new BehaviorSubject<Node | null>(null);
  selectedNodeParentId = new BehaviorSubject<string>('');

  setNewNode(node: Node | null) {
    this.newNode.next(node);
  }

  setSelectedNodeParentId(value: string) {
    this.selectedNodeParentId.next(value);
  }

  setDestroyNode(value: Node | null) {
    this.destroyNode.next(value);
  }
}
