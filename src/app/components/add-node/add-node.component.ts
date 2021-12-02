import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import * as uuid from 'uuid';

import { NodeSubjectService } from '../../services/node-subject.service';
import { Node } from '../../node';

@Component({
  selector: 'app-add-node',
  template: `
    <form autocomplete="off">
      <input
        type="text"
        name="name"
        [(ngModel)]="name"
        id="name"
        autocomplete="off"
      />
      <button [ngStyle]="{ 'background-color': 'black' }" (click)="onSubmit()">
        <fa-icon [icon]="faPlus" [ngStyle]="{ color: 'white' }"></fa-icon>
      </button>
      <button
        [ngStyle]="{ 'background-color': 'white' }"
        (click)="onClose.emit()"
      >
        <fa-icon [icon]="faTimes" [ngStyle]="{ color: 'black' }"></fa-icon>
      </button>
    </form>
  `,
  styles: [
    `
      form {
        display: flex;
        align-items: center;
      }
    `,
    `
      button {
        padding: 1px 4px;
        margin: 0 2px;
        border: 1px solid black;
        border-radius: 4px;
      }
    `,
  ],
})
export class AddNodeComponent implements OnInit {
  @Input() type: 'folder' | 'file' | '' = '';
  @Output() onClose: EventEmitter<any> = new EventEmitter();
  @Output() onAdd: EventEmitter<any> = new EventEmitter();
  name: string = '';
  parent: string = '';
  faPlus = faPlus;
  faTimes = faTimes;

  constructor(private nodeSubjectService: NodeSubjectService) {}

  ngOnInit(): void {
    // initialize subscription to selectedNodeParentId from nodeSubjectService
    this.nodeSubjectService.selectedNodeParentId.subscribe((value) => {
      this.parent = value;
    });
  }

  // on submit form handling
  onSubmit() {
    // if name is empty alert validation
    if (!this.name) {
      alert('Please enter name!');
      return;
    }
    // build newNode value
    const newNode: Node = {
      id: uuid.v4(),
      name: this.name,
      type: this.type,
      parent: this.parent,
    };
    // set newNode to nodeSubjectService
    this.nodeSubjectService.setNewNode(newNode);
    // emit onAdd action
    this.onAdd.emit();
    // reset name value
    this.name = '';
  }
}
