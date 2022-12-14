import { Component, OnDestroy, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from './services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  ingredientsSubscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
	  this.ingredients = this.shoppingListService.getIngredients();
	  this.ingredientsSubscription = this.shoppingListService.ingredientsChanged.subscribe(
		  (newIngredients: Ingredient[]) => {
			  this.ingredients = newIngredients;
		  }
	  )
  }

  onEditItem(index: number): void {
	  this.shoppingListService.startedEditing.next(index);
  }

  ngOnDestroy(): void {
  	this.ingredientsSubscription.unsubscribe();
  }

}
