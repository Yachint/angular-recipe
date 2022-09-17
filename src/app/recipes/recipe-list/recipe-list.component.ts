import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
	  new Recipe('A test recipe', 'A test description for the recipe', 'https://www.archanaskitchen.com/images/archanaskitchen/1-Author/pooja/aglio_olio_with_greens.jpg'),
 	  new Recipe('A test recipe', 'A test description for the recipe', 'https://www.archanaskitchen.com/images/archanaskitchen/1-Author/pooja/aglio_olio_with_greens.jpg')
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
