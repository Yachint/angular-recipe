import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {GreeterComponent} from "./recipes/greeter/greeter.component";
import {RecipeDetailComponent} from "./recipes/recipe-detail/recipe-detail.component";
import {RecipeEditComponent} from "./recipes/recipe-edit/recipe-edit.component";

import {RecipesComponent} from "./recipes/recipes.component";
import {RecipeResolverService} from "./recipes/resolvers/recipes-resolver.service";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";

const appRoutes: Routes = [
	{ path: '', redirectTo: '/recipes', pathMatch: 'full' },
	{ path: 'recipes', component: RecipesComponent, children:[
		{ path: '', component: GreeterComponent, pathMatch: 'full' },
		{ path: 'new', component: RecipeEditComponent },
		{ path: ':id', component: RecipeDetailComponent},
		{ path: ':id/edit', component: RecipeEditComponent}
	], resolve: [RecipeResolverService] },
	{ path: 'shopping-list', component: ShoppingListComponent }
]

@NgModule({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule]
})
export class AppRoutingModule {

}
