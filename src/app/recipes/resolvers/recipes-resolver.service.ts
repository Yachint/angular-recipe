import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {DataStorageService} from "src/app/shared/data-storage.service";
import {Recipe} from "../recipe.model";
import {RecipeService} from "../services/recipe.services";

@Injectable({
	providedIn: 'root'
})
export class RecipeResolverService implements Resolve<Recipe[]> {
	constructor(
		private dataStorageService: DataStorageService,
		private recipeService: RecipeService
	) {}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
		// The resolve method will automatically subscribe which will fire the request
		// We don't need to tell about data being fetched as we have already done using tap operator
		const recipes = this.recipeService.getRecipes();

		return recipes.length === 0 ? this.dataStorageService.fetchRecipes() : recipes;	
	}	
}
