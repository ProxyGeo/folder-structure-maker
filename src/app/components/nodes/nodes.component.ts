import { Component, OnInit } from '@angular/core';

import { NodeService } from '../../services/node.service';
import { NodeSubjectService } from '../../services/node-subject.service';
import { Node, NodeGroups } from '../../node';

@Component({
  selector: 'app-nodes',
  template: `
    <div>
      <!-- show/hide add root folder template -->
      <button (click)="toggleAddRootNode()">Add root folder</button>
      <!-- list nodeGroups['root'] group -->
      <ul *ngFor="let node of nodeGroups['root']">
        <li class="root">
          <app-node [node]="node"></app-node>
        </li>
        <!-- if root node has group from nodeGroups create app-node-children -->
        <app-node-children
          *ngIf="nodeGroups[node.id]"
          [children]="nodeGroups[node.id]"
          [nodeGroups]="nodeGroups"
        ></app-node-children>
        <!-- bind app-add-node-child here, will display on add new node-child to selected root-node  -->
        <app-add-node-child [parentId]="node.id"></app-add-node-child>
      </ul>
      <!-- bind app-add-node here, will display on add new root node  -->
      <app-add-node
        *ngIf="addRootNode"
        [type]="'folder'"
        (onClose)="toggleAddRootNode()"
      ></app-add-node>
    </div>
  `,
  styles: [
    `
      button {
        background-color: black;
        color: white;
        margin: 12px 0;
        padding: 8px 10px;
        border: none;
        border-radius: 4px;
      }
    `,
  ],
})
export class NodesComponent implements OnInit {
  // store nodes
  nodes: Node[] = [];
  // store node groups
  nodeGroups: NodeGroups = { root: [] };
  addRootNode: boolean = false;

  // initialize services
  constructor(
    private nodeService: NodeService,
    private nodeSubjectService: NodeSubjectService
  ) {}

  ngOnInit(): void {
    // initialize nodes list
    this.nodeService.getNodes().subscribe((nodes) => {
      this.nodes = nodes;
      // initialize node list grouping by Node.parent id
      this.processNodeGroups(nodes);
    });

    // initialize subscription to newNode from nodeSubjectService
    this.nodeSubjectService.newNode.subscribe((newNode) => {
      if (newNode) this.addNode(newNode);
    });

    // initialize subscription to destroyNode from nodeSubjectService
    this.nodeSubjectService.destroyNode.subscribe((destroyNode) => {
      if (destroyNode) this.deleteNode(destroyNode);
    });
  }

  // parse Node[] data
  // group Nodes by Node.parent id
  processNodeGroups(nodes: Node[]) {
    (nodes || []).forEach((node: Node) => {
      this.addToNodeGroups(node);
    });
  }

  // add new node or node-group to nodeGroups
  addToNodeGroups(node: Node) {
    // node don't have parent add to root group
    if (!node.parent) {
      this.nodeGroups = {
        ...this.nodeGroups,
        [`root`]: [...this.nodeGroups[`root`], node],
      };
    } else {
      // if node.parent has existing group from nodeGroups
      // add node to existing group
      if (!this.nodeGroups.hasOwnProperty(`${node.parent}`)) {
        this.nodeGroups = {
          ...this.nodeGroups,
          [`${node.parent}`]: [node],
        };
      } else {
        // node.parent has no group from nodeGroups
        // add new group with the value [node]
        this.nodeGroups = {
          ...this.nodeGroups,
          [`${node.parent}`]: [...this.nodeGroups[`${node.parent}`], node],
        };
      }
    }
  }

  // delete node or node-group from nodeGroups
  deleteFromNodeGroups(node: Node) {
    // create a copy of this.nodeGroups
    let copyNodeGroups: NodeGroups = { ...this.nodeGroups };
    // if node has existing group
    // remove group
    if (copyNodeGroups[`${node.id}`]) {
      const { [`${node.id}`]: deleteGroup, ...otherProps } = copyNodeGroups;
      copyNodeGroups = { ...otherProps };
    }
    // if node has no parent
    // remove node from root group
    if (!node.parent) {
      const updatedGroup = (copyNodeGroups['root'] || []).filter(
        (n) => n.id !== node.id
      );
      copyNodeGroups = { ...copyNodeGroups, root: updatedGroup };
    } else {
      // if node has a parent
      // remove node from parent group
      const updatedGroup = (copyNodeGroups[`${node.parent}`] || []).filter(
        (n) => n.id !== node.id
      );
      copyNodeGroups = { ...copyNodeGroups, [`${node.parent}`]: updatedGroup };
    }
    // assign new value to this.nodeGroups
    this.nodeGroups = { ...copyNodeGroups };
  }

  // handling of delete nodes request to nodeService
  async deleteNode(node: Node) {
    // create variable to store node[s] to be remove
    let nodesToRemove: Node[] = [];
    // create a copy of this.nodeGroups
    const copyNodeGroups: NodeGroups = this.nodeGroups;
    // process/get node[s] to be remove
    const getNodesToRemove = (node: Node) => {
      // add node to nodesToRemove
      nodesToRemove = [...nodesToRemove, node];
      // initial process of removing node from this.nodeGroups
      this.deleteFromNodeGroups(node);
      // if node has a group
      // loop through the group and self call getNodesToRemove to repeat the process
      if (copyNodeGroups[`${node.id}`]) {
        copyNodeGroups[`${node.id}`].forEach((node) => {
          getNodesToRemove(node);
        });
      }
    };
    // initialize getNodesToRemove
    getNodesToRemove(node);
    
    /*
    *
    * JSON Sever use demo purpose only, to http request.
    * DELETE request is done this way because JSON Server did not support remove many on single request
    * Note: request to JSON Server crash on subsequent request but application will not be block 
    *
    */ 
    // dispatch delete node[s] to nodeService
    // loop through nodesToRemove and delete
    for (const removeNode of nodesToRemove) {
      await this.nodeService.deleteNode(removeNode).subscribe();
    }
    // set setDestroyNode = null from nodeSubjectService
    this.nodeSubjectService.setDestroyNode(null);
  }

  // handling of add node request to nodeService
  addNode(node: Node) {
    // add newNode to nodesGroups
    this.addToNodeGroups(node);
    // dispatch addNode request
    this.nodeService.addNode(node).subscribe();
    // set setSelectedNodeParentId = '' from nodeSubjectService
    this.nodeSubjectService.setSelectedNodeParentId('');
    // set addRootNode = false
    this.addRootNode = false;
  }

  // toggle add new root directory/node
  toggleAddRootNode() {
    this.addRootNode = !this.addRootNode;
  }
}
