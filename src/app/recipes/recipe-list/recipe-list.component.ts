import { Component, OnDestroy, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import { Recipe } from '../recipe.model';
import {RecipeService} from '../services/recipe.services';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipeSubsription: Subscription;
  recipes: Recipe[];
	
  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
	 this.recipes = this.recipeService.getRecipes();
	 this.recipeSubsription = this.recipeService.recipesChanged.subscribe((recipes: Recipe[]) => {
		 this.recipes = recipes;
		 console.log('Recipes refreshed! ', recipes);
	 });
  }

  ngOnDestroy(): void {
  	this.recipeSubsription.unsubscribe();
  }	

}
