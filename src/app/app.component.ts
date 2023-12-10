import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MockServerService, DataItem } from './mock-server.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'mapSearch';
  searchTerm: string = ''; 

  selectedType: string | null = null; 

  searchResults: any = []; 

  types = [{label: 'Site', value: 'Site'}, {label: 'Zone', value: 'Zone'}]; 
  
  data: DataItem[] = [];

  constructor(private dataService: MockServerService) { }

  onSearchChange(searchTerm: string, type: string) {
    this.dataService.filterData(searchTerm, type).subscribe(filteredData => {

      this.searchResults = filteredData;
    });
  }


}
