import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Ingredient} from 'src/app/shared/ingredient.model';
import {ShoppingListService} from '../services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') form: NgForm;
  editSubscription: Subscription;
  editMode: boolean = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
	this.editSubscription = this.shoppingListService.startedEditing.subscribe((index: number) => {
		this.editMode = true;
		this.editedItemIndex = index;
		this.editedItem = this.shoppingListService.getIngredient(index);
		this.form.setValue({
			name: this.editedItem.name,
			amount: this.editedItem.amount
		});
	});	
  }

  ngOnDestroy(): void {
	this.editSubscription.unsubscribe();
  }

  onClear(){
	  this.editMode = false;
	  this.form.reset();
  }

  onDelete(){
	this.shoppingListService.deleteIngredient(this.editedItemIndex);
	this.onClear();
  }

  onSubmit(){
	  const value = this.form.value;
	  const newIngredient = new Ingredient(value.name, value.amount);
	  if(this.editMode){
		this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
	  } else {
	  	this.shoppingListService.addIngredient(newIngredient);
	  }
	  this.editMode = false;
	  this.form.reset();
  }

}
