import { Component, OnDestroy, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs';
import {RecipeService} from '../services/recipe.services';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode: boolean = false;
  paramsSubscription: Subscription
  recipeForm: FormGroup

  constructor(
	  private route: ActivatedRoute,
	  private recipeService: RecipeService
  ) { }

  ngOnInit(): void {
	 this.paramsSubscription = this.route.params.subscribe((params: Params) => {
		 this.id = +params['id'];
		 this.editMode = params['id'] != null;
		 console.log(this.editMode);
		 this.initForm();
	 });
  }

  ngOnDestroy(): void {
  	this.paramsSubscription.unsubscribe();
  }

  private initForm() {
	 let recipeName = '';
	 let recipeImagePath = '';
	 let recipeDescription = '';

	 if(this.editMode){
		 const recipe = this.recipeService.getRecipe(this.id);
		 recipeName = recipe.name;
		 recipeImagePath = recipe.imageUrl;
		 recipeDescription = recipe.description;
	 }

	this.recipeForm = new FormGroup({
		'name': new FormControl(recipeName),
		'imagePath': new FormControl(recipeImagePath),
		'description': new FormControl(recipeDescription)
	});	 
  }
}
