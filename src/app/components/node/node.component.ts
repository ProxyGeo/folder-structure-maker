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
    <span (mouseenter)="toggleButtons()" (mouseleave)="toggleButtons()">
      <fa-icon [icon]="isTypeFolder(node.type) ? faFolder : faFile"></fa-icon>
      {{ node.name }}
      <span [hidden]="!showButtons">
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
  showButtons: boolean = false;
  faFolder = faFolder;
  faFile = faFile;
  faPlus = faPlus;
  faDelete = faTrash;

  constructor(private nodeSubjectService: NodeSubjectService) {}

  ngOnInit(): void {}

  isTypeFolder(type: string) {
    return type === 'folder';
  }
  
  toggleButtons() {
    this.showButtons = !this.showButtons
  }

  handleAddClick(node: Node) {
    this.nodeSubjectService.setSelectedNodeParentId(node.id);
  }

  handleDeleteClick(node: Node) {
    this.nodeSubjectService.setDestroyNode(node);
  }
}
