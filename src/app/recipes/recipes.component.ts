import { Component, OnInit } from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  constructor(private dataStorageService: DataStorageService) {}

  ngOnInit(): void {
	  // Better to use resolvers since they will ensure route
	  // dependent data is loaded before the component loads
	  
	  // this.dataStorageService.fetchRecipes().subscribe();
  }

}
