import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-recipes',
    templateUrl: './recipes.component.html',
    styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {
        // Better to use resolvers since they will ensure route
        // dependent data is loaded before the component loads
        // this.dataStorageService.fetchRecipes().subscribe();
    }
}
