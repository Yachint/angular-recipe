import {EventEmitter, Injectable} from "@angular/core";
import {Ingredient} from "src/app/shared/ingredient.model";
import { Recipe } from "../recipe.model";

@Injectable()
export class RecipeService {

  private instanceId: string;
  recipeSelected = new EventEmitter<Recipe>();

  constructor(){
	  this.instanceId = Math.random().toString();
	  console.log('Recipe Service: ', this.instanceId);
  }

  private recipes: Recipe[] = [
	  new Recipe('Aglio e Olio', 'Spaghetti aglio e olio is a traditional Italian pasta dish from Naples.', 'https://www.archanaskitchen.com/images/archanaskitchen/1-Author/pooja/aglio_olio_with_greens.jpg', [
		  new Ingredient('Spaghetti', 2),
	  	  new Ingredient('Garlic', 3),
		  new Ingredient('Butter', 1)
	  ]),

 	  new Recipe('Spicy Schnitzel', 'A schnitzel is a thin slice of meat. The meat is usually thinned by pounding with a meat tenderizer.', 'https://www.simplyrecipes.com/thmb/Fn4mOjcb_KxZJHPgkbCH22Qbz6Q=/4256x2832/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Chicken-Schnitzel-LEAD-07-d2bcfa86a4b34eb0afaad2840b757c0e.jpg', [
		  new Ingredient('Meat Slice', 1),
		  new Ingredient('French Fries', 20)
	  ])
  ];
	
  getRecipes(){
	  return this.recipes.slice();
  }
}
