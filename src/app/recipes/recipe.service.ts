import { Recipe } from "./recipe.model";
import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe(
            'Schnitzel',
            'tasty schnitzel',
            'https://i.pinimg.com/originals/30/17/db/3017dbc3c2ee82045641b2a181e75ea8.jpg',
            [
                new Ingredient('Meat', 1),
                new Ingredient("French fries", 20)
            ]
        ),
        new Recipe(
            'Burger',
            'fat burger',
            'https://cdn1-www.dogtime.com/assets/uploads/2011/03/puppy-development.jpg',
            [
                new Ingredient('Buns', 2),
                new Ingredient("Meat", 1)
            ]
        )
    ];

    constructor(private slService: ShoppingListService){}

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }
}