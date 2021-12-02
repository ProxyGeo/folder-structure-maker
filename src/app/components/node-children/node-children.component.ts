import { Component, OnInit, Input } from '@angular/core';

import { NodeSubjectService } from '../../services/node-subject.service';
import { Node, NodeGroups } from '../../node';

@Component({
  selector: 'app-node-children',
  template: `
    <li *ngFor="let child of children">
      <app-node [node]="child"></app-node>
      <ul>
        <app-node-children
          *ngIf="nodeGroups[child.id]"
          [children]="nodeGroups[child.id]"
          [nodeGroups]="nodeGroups"
        ></app-node-children>
        <app-add-node-child [parentId]="child.id"></app-add-node-child>
      </ul>
    </li>
  `,
})
export class NodeChildrenComponent implements OnInit {
  @Input() children: Node[] = [];
  @Input() nodeGroups: NodeGroups = {};
  selectedNodeParentId: string = '';

  constructor(private nodeSubjectService: NodeSubjectService) {}

  ngOnInit(): void {
    this.nodeSubjectService.selectedNodeParentId.subscribe((value) => {
      this.selectedNodeParentId = value;
    });
  }
}
