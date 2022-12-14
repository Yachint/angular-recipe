import { Injectable } from "@angular/core";
import {Subject} from "rxjs";
import {Ingredient} from "src/app/shared/ingredient.model";
import {ShoppingListService} from "src/app/shopping-list/services/shopping-list.service";
import { Recipe } from "../recipe.model";

@Injectable()
export class RecipeService {
  public recipesChanged = new Subject<Recipe[]>();
  private instanceId: string;

  constructor(private shoppingListService: ShoppingListService){
	  this.instanceId = Math.random().toString();
	  console.log('Recipe Service: ', this.instanceId);
  }

  // private recipes: Recipe[] = [
	  // new Recipe(0, 'Aglio e Olio', 'Spaghetti aglio e olio is a traditional Italian pasta dish from Naples.', 'https://www.archanaskitchen.com/images/archanaskitchen/1-Author/pooja/aglio_olio_with_greens.jpg', [
		  // new Ingredient('Spaghetti', 2),
	  	  // new Ingredient('Garlic', 3),
		  // new Ingredient('Butter', 1)
	  // ]),

 	  // new Recipe(1, 'Spicy Schnitzel', 'A schnitzel is a thin slice of meat. The meat is usually thinned by pounding with a meat tenderizer.', 'https://www.simplyrecipes.com/thmb/Fn4mOjcb_KxZJHPgkbCH22Qbz6Q=/4256x2832/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Chicken-Schnitzel-LEAD-07-d2bcfa86a4b34eb0afaad2840b757c0e.jpg', [
		  // new Ingredient('Meat Slice', 1),
		  // new Ingredient('French Fries', 20)
	  // ])
  // ];
  
  private recipes: Recipe[] = [];
	
  setRecipes(fetchedRecipes: Recipe[]){
	 this.recipes = fetchedRecipes;
	 this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes(){
	  return this.recipes.slice();
  }

  getRecipe(index: number): Recipe {
	  return { ...this.recipes[index] }
  }

  addIngredientsToShpList(ingredients: Ingredient[]){
	this.shoppingListService.addIngredients(ingredients);	
  }

  addRecipe(recipe: Recipe){
	 this.recipes.push(recipe); 
	 this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe){
	this.recipes[index] = newRecipe;
	this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipes(index: number){
	  this.recipes.splice(index, 1);
	  this.recipesChanged.next(this.recipes.slice());
  }

  getLatestId = (): number => this.recipes.length;

}
