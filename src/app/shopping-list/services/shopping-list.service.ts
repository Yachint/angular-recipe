import {EventEmitter, Injectable} from "@angular/core";
import { Ingredient } from "src/app/shared/ingredient.model";

@Injectable()
export class ShoppingListService {

  private instanceId: string;
  public ingredientsChanged = new EventEmitter<Ingredient[]>();
  private ingredients: Ingredient[] = [
	  new Ingredient('Apples', 5),
	  new Ingredient('Tomatoes', 10)
  ];

  constructor(){
	  this.instanceId = Math.random().toString();
	  console.log('ShoppingListService: ', this.instanceId);
  }

  getIngredients(): Ingredient[] {
	  return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient){
	  this.ingredients.push(ingredient);
	  this.ingredientsChanged.emit(this.ingredients.slice());
  }
}
