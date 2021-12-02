import { Component, OnInit, Input } from '@angular/core';
import { faFolder, faFile, faTimes } from '@fortawesome/free-solid-svg-icons';

import { NodeSubjectService } from '../../services/node-subject.service';
import { Node } from '../../node';

@Component({
  selector: 'app-add-node-child',
  template: `
    <!-- if parent id and selected node parent id is equal display template -->
    <li *ngIf="parentId === selectedNodeParentId">
      <!-- if node type is valid display app-add-node -->
      <app-add-node 
        *ngIf="isValidNodeType(nodeType)"
        [type]="nodeType"
        (onClose)="onCloseBtnClick()"
        (onAdd)="onAddBtnClick()"
      ></app-add-node>
      <!-- if node type is empty/invalid display show selection of node type template -->
      <div class="type-selector" *ngIf="!isValidNodeType(nodeType)">
        <button (click)="onFolderBtnClick()">
          <fa-icon [icon]="faFolder"></fa-icon> folder
        </button>
        <button (click)="onFileBtnClick()">
          <fa-icon [icon]="faFile"></fa-icon> file
        </button>
        <button class="btn-close" (click)="onCloseBtnClick()">
          <fa-icon [icon]="faTimes"></fa-icon>
        </button>
      </div>
    </li>
  `,
  styles: [
    `
      .type-selector {
        display: flex;
      }
    `,
    `
      .type-selector > button {
        margin-right: 4px;
        padding: 2px;
      }
    `,
    `
      .type-selector > button.btn-close {
        padding: 0px 6px;
        border-radius: 12px;
        border: 1px solid;
      }
    `,
  ],
})
export class AddNodeChildComponent implements OnInit {
  @Input() parentId: string = '';
  selectedNodeParentId: string = '';
  nodeType: 'file' | 'folder' | '' = '';
  faFolder = faFolder;
  faFile = faFile;
  faTimes = faTimes;

  // initialize service
  constructor(private nodeSubjectService: NodeSubjectService) {}

  ngOnInit(): void {
    // initialize subscription to selectedNodeParentId from nodeSubjectService
    this.nodeSubjectService.selectedNodeParentId.subscribe((value) => {
      this.selectedNodeParentId = value;
    });
  }

  // node type validate function
  // return true/false
  isValidNodeType(type: string): boolean {
    return Boolean(type);
  }

  // set node type value to 'folder' function
  onFolderBtnClick() {
    this.nodeType = 'folder';
  }

  // set node type value to 'file' function
  onFileBtnClick() {
    this.nodeType = 'file';
  }

  // app-add-node (onAdd) output event function handling
  // reset node type value to empty '' 
  onAddBtnClick() {
    this.nodeType = '';
  }

  // app-add-node (onClose) output event function handling,
  // and node type selection template for close button on-click handling
  // reset node type value to empty '' and nodeSubjectService.selectedNodeParentId value to empty ''
  onCloseBtnClick() {
    this.nodeType = '';
    this.nodeSubjectService.setSelectedNodeParentId('');
  }
}
