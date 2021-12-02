import { Component, OnInit, Input } from '@angular/core';
import { faFolder, faFile, faTimes } from '@fortawesome/free-solid-svg-icons';

import { NodeSubjectService } from '../../services/node-subject.service';
import { Node } from '../../node';

@Component({
  selector: 'app-add-node-child',
  template: `
    <li *ngIf="parentId === selectedNodeParentId">
      <app-add-node 
        *ngIf="isValidNodeType(nodeType)"
        [type]="nodeType"
        (onClose)="onCloseBtnClick()"
        (onAdd)="onAddBtnClick()"
      ></app-add-node>
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

  constructor(private nodeSubjectService: NodeSubjectService) {}

  ngOnInit(): void {
    this.nodeSubjectService.selectedNodeParentId.subscribe((value) => {
      this.selectedNodeParentId = value;
    });
  }

  isValidNodeType(type: string) {
    return Boolean(type);
  }

  onFolderBtnClick() {
    this.nodeType = 'folder';
  }

  onFileBtnClick() {
    this.nodeType = 'file';
  }

  onAddBtnClick() {
    this.nodeType = '';
  }

  onCloseBtnClick() {
    this.nodeType = '';
    this.nodeSubjectService.setSelectedNodeParentId('');
  }
}
