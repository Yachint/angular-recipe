import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard.service';
import { GreeterComponent } from './greeter/greeter.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipesComponent } from './recipes.component';
import { RecipeResolverService } from './resolvers/recipes-resolver.service';

const routes: Routes = [
    {
        path: '',
        component: RecipesComponent,
        children: [
            { path: '', component: GreeterComponent, pathMatch: 'full' },
            { path: 'new', component: RecipeEditComponent },
            { path: ':id', component: RecipeDetailComponent },
            { path: ':id/edit', component: RecipeEditComponent },
        ],
        resolve: [RecipeResolverService],
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RecipeRoutingModule {}
