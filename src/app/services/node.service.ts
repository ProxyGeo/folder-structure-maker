import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Node } from '../node';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class NodeService {
  private apiUrl = 'http://localhost:5000/nodes';

  constructor(private http: HttpClient) {}

  getNodes(): Observable<Node[]> {
    return this.http.get<Node[]>(this.apiUrl);
  }

  addNode(node: Node): Observable<Node> {
    return this.http.post<Node>(this.apiUrl, node, httpOptions);
  }

  deleteNode(node: Node): Observable<Node> {
    const url = `${this.apiUrl}/${node.id}`;
    return this.http.delete<Node>(url);
  }
}
