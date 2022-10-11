import { Component, OnDestroy, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../services/recipe.services';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  recipe: Recipe;
  recipeSubscription: Subscription;

  constructor(
	  private router: Router,
	  private recipeService: RecipeService,
	  private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
	  this.recipeSubscription = this.route.params.subscribe((params: Params) => {
			this.recipe = this.recipeService.getRecipe(+params['id']);		
		    console.log('Subscription fired for: ', this.recipe.name);
	  })
  }

  ngOnDestroy(): void {
  	this.recipeSubscription.unsubscribe();
  }
	
  onAddToShpList(){
	this.recipeService.addIngredientsToShpList(this.recipe.ingredients);	
  }

  deleteRecipe(){
	  this.recipeService.deleteRecipes(this.recipe.id);
	  this.router.navigate(['../'], { relativeTo: this.route });
  }
}
