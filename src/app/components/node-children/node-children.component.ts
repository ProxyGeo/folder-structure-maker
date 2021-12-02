import { Component, OnInit, Input } from '@angular/core';

import { NodeSubjectService } from '../../services/node-subject.service';
import { Node, NodeGroups } from '../../node';

@Component({
  selector: 'app-node-children',
  template: `
    <!-- list node children -->
    <li *ngFor="let child of children">
      <app-node [node]="child"></app-node>
      <ul>
        <!-- if node child has group from nodeGroups create another app-node-children -->
        <app-node-children
          *ngIf="nodeGroups[child.id]"
          [children]="nodeGroups[child.id]"
          [nodeGroups]="nodeGroups"
        ></app-node-children>
        <!-- bind app-add-node-child here, will display on add new node-child to selected parent-node  -->
        <app-add-node-child [parentId]="child.id"></app-add-node-child>
      </ul>
    </li>
  `,
})
export class NodeChildrenComponent implements OnInit {
  @Input() children: Node[] = [];
  @Input() nodeGroups: NodeGroups = {};
  selectedNodeParentId: string = '';

  // initialize service
  constructor(private nodeSubjectService: NodeSubjectService) {}

  ngOnInit(): void {
    // initialize subscription to selectedNodeParentId from nodeSubjectService
    this.nodeSubjectService.selectedNodeParentId.subscribe((value) => {
      this.selectedNodeParentId = value;
    });
  }
}
