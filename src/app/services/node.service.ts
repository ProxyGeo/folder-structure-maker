import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Node } from '../node';

// store http request header
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class NodeService {
  // api request url
  private apiUrl = 'http://localhost:5000/nodes';

  // initialize HttpClient
  constructor(private http: HttpClient) {}

  // get node http request
  getNodes(): Observable<Node[]> {
    return this.http.get<Node[]>(this.apiUrl);
  }

  // add node http request
  addNode(node: Node): Observable<Node> {
    return this.http.post<Node>(this.apiUrl, node, httpOptions);
  }

  // delete node http request
  deleteNode(node: Node): Observable<Node> {
    const url = `${this.apiUrl}/${node.id}`;
    return this.http.delete<Node>(url);
  }
}
