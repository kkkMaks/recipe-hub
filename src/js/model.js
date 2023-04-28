"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadRecipe = exports.state = void 0;
const helpers_1 = require("./helpers");
const config_1 = require("./config");
exports.state = {
    recipe: {},
};
const loadRecipe = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, helpers_1.getJson)(`${config_1.API_URL}/${id}`);
            if (data.status === 'success') {
                const recipe = data.data.recipe;
                exports.state.recipe = {
                    id: recipe.id,
                    image: recipe.image_url,
                    title: recipe.title,
                    cookingTime: recipe.cooking_time,
                    ingredients: recipe.ingredients,
                    publisher: recipe.publisher,
                    servings: recipe.servings,
                    sourceUrl: recipe.source_url,
                };
            }
        }
        catch (error) {
            exports.state.recipe = {};
            console.error(`<Y ${error} `);
            throw error;
        }
    });
};
exports.loadRecipe = loadRecipe;
