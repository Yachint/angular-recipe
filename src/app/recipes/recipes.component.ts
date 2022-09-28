import { Component, OnInit } from '@angular/core';
import {RecipeService} from './services/recipe.services';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {

  ngOnInit(): void {
  }

}
