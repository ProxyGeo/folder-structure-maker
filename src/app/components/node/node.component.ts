import { Component, OnInit, Input } from '@angular/core';
import {
  faFolder,
  faFile,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

import { NodeSubjectService } from '../../services/node-subject.service';
import { Node } from '../../node';

@Component({
  selector: 'app-node',
  template: `
    <span class="node-wrapper">
      <fa-icon [icon]="isTypeFolder(node.type) ? faFolder : faFile"></fa-icon>
      <p class="node-name">{{ node.name }}</p>
      <!-- show buttons when on hover 'span.node-wrapper' -->
      <span class="node-actions">
        <button *ngIf="isTypeFolder(node.type)" (click)="handleAddClick(node)">
          <fa-icon [icon]="faPlus" [ngStyle]="{ color: 'white' }"></fa-icon>
        </button>
        <button (click)="handleDeleteClick(node)">
          <fa-icon [icon]="faDelete" [ngStyle]="{ color: 'white' }"></fa-icon>
        </button>
      </span>
    </span>
  `,
  styles: [
    `
      .node-wrapper {
        display: flex;
        align-items: center;
      }
    `,
    `
      .node-name {
        margin: 0 4px;
      }
    `,
    `
      .node-actions {
        display: none;
      }
    `,
    `
      .node-wrapper:hover > .node-actions {
        display: block !important;
      }
    `,
    `
      button {
        background-color: black;
        padding: 2px 4px;
        border: none;
        border-radius: 10px;
        margin: 0 2px;
      }
    `,
  ],
})
export class NodeComponent implements OnInit {
  @Input() node: Node = { id: '', name: '', type: '' };
  faFolder = faFolder;
  faFile = faFile;
  faPlus = faPlus;
  faDelete = faTrash;

  // initialize service
  constructor(private nodeSubjectService: NodeSubjectService) {}

  ngOnInit(): void {}

  // validate node type value is equal to 'folder' function
  // return true/false
  isTypeFolder(type: string): boolean {
    return type === 'folder';
  }

  // on add button click function set nodeSubjectService.selectedNodeParentId value to node.id
  handleAddClick(node: Node) {
    this.nodeSubjectService.setSelectedNodeParentId(node.id);
  }

  // on delete button click function set nodeSubjectService.destroyNode value to node
  handleDeleteClick(node: Node) {
    this.nodeSubjectService.setDestroyNode(node);
  }
}
