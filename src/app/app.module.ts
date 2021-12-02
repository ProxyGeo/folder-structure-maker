import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { NodesComponent } from './components/nodes/nodes.component';
import { NodeChildrenComponent } from './components/node-children/node-children.component';
import { NodeComponent } from './components/node/node.component';
import { AddNodeComponent } from './components/add-node/add-node.component';
import { AddNodeChildComponent } from './components/add-node-child/add-node-child.component';

@NgModule({
  declarations: [
    AppComponent,
    NodesComponent,
    NodeChildrenComponent,
    NodeComponent,
    AddNodeComponent,
    AddNodeChildComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
