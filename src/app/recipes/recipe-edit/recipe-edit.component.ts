import { Component, OnDestroy, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Recipe} from '../recipe.model';
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
	  private recipeService: RecipeService,
	  private router: Router
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
	 let recipeId = this.editMode ? this.id : this.recipeService.getLatestId();
	 let recipeName = '';
	 let recipeImagePath = '';
	 let recipeDescription = '';
	 let recipeIngredients = new FormArray([]);

	 if(this.editMode){
		 const recipe = this.recipeService.getRecipe(this.id);
		 recipeName = recipe.name;
		 recipeImagePath = recipe.imageUrl;
		 recipeDescription = recipe.description;
		 if(recipe.ingredients){
			 for (let ingredient of recipe.ingredients){
				 recipeIngredients.push(new FormGroup({
					 'name': new FormControl(ingredient.name, Validators.required),
					 'amount': new FormControl(ingredient.amount, [
						 Validators.required,
						 Validators.pattern(/^[1-9]+[0-9]*$/)
					 ])
				 }))
			 }
		 }
	 }

	this.recipeForm = new FormGroup({
		'id': new FormControl(recipeId),
		'name': new FormControl(recipeName, Validators.required),
		'imageUrl': new FormControl(recipeImagePath, Validators.required),
		'description': new FormControl(recipeDescription, Validators.required),
		'ingredients': recipeIngredients
	});	 
  }

  onDeleteIngredient(index: number){
	  (this.recipeForm.get("ingredients") as FormArray).removeAt(index);
  }

  onSubmit(){
	// console.log(this.recipeForm.value);
	  
	//----> We can avoid this approach since the structure of our form is same as the class structure
	// const newRecipe = new Recipe(
	// 	this.recipeForm.value['id'],
	// 	this.recipeForm.value['name'],
	// 	this.recipeForm.value['description'],
	// 	this.recipeForm.value['imagePath'],
	// 	this.recipeForm.value['ingredients']
	// );
	
	if(this.editMode){
		this.recipeService.updateRecipe(this.id, this.recipeForm.value);
	} else {
		this.recipeService.addRecipe(this.recipeForm.value);
	}

	this.onCancel();
  }

  onCancel(){
	this.router.navigate(['../'], { relativeTo: this.route });	  
  }

  onAddIngredient(){
	(this.recipeForm.get('ingredients') as FormArray).push(new FormGroup({
		'name': new FormControl(null, Validators.required),
		'amount': new FormControl(null, [
			 Validators.required,
			 Validators.pattern(/^[1-9]+[0-9]*$/)
		])
	}));
  }

  get controls(){
	  return (this.recipeForm.get('ingredients') as FormArray).controls;
  }
}
