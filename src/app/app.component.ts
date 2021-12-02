import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="toolbar">
      <span>Folder Structure Maker</span>
    </div>
    <app-nodes></app-nodes>
  `,
})
export class AppComponent {}
