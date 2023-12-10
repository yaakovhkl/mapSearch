import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface DataItem {
  type: string;
  subType?: string;
  id: string;
  parentId?: string | undefined;
  name: string;
  status?: string | null;
  children?: DataItem[];
}

@Injectable({
  providedIn: 'root'
})
export class MockServerService {

  private dataUrl = 'assets/mockFlat.json';

  constructor(private http: HttpClient) { }

  fetchData(): Observable<DataItem[]> {
    return this.http.get<DataItem[]>(this.dataUrl);
  }

  filterData(searchTerm: string, type: string): Observable<DataItem[]> {
    return this.fetchData().pipe(
      map(items => {
        
        const filteredItems = items.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()) && item.type === type);
        const parents = filteredItems.filter(item => item.parentId === undefined) as DataItem[];
        let children = filteredItems.filter(item => item.type !== undefined) as DataItem[];

        //Reconstructing the hierarchy
        return parents.map(parent => ({
          ...parent,
          children: children.filter(child => child.parentId === parent.id)
        }));
      })
    );
  }
}
