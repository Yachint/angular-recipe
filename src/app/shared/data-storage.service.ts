import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {map, tap} from "rxjs";
import {Recipe} from "../recipes/recipe.model";
import {RecipeService} from "../recipes/services/recipe.services";

@Injectable({
	providedIn: 'root'
})
export class DataStorageService {
	constructor(
		private http: HttpClient,
		private recipeService: RecipeService
	) {}	

	storeRecipes(){
		const recipes = this.recipeService.getRecipes();
		this.http
			.put(
				'https://angular-test-9f9a8-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json',
				recipes
			)
			.subscribe(result => {
				console.log(result);
			})
	}

	fetchRecipes(){
		return this.http
			.get<Recipe[]>
			('https://angular-test-9f9a8-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json')
			.pipe(map(recipes => {
				return recipes.map(recipe => {
					return {
						...recipe,
						ingredients: recipe.ingredients ? recipe.ingredients : []
					}
				})
			}), tap(result => {
				this.recipeService.setRecipes(result);
			}))
			// .subscribe(result => {
			// 	this.recipeService.setRecipes(result);
			// });
	}
}
