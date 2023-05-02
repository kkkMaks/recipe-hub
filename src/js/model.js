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
exports.updateServings = exports.getSearchResultsPage = exports.loadSearchResults = exports.loadRecipe = exports.state = void 0;
const helpers_1 = require("./helpers");
const config_1 = require("./config");
exports.state = {
    recipe: {},
    search: {
        query: '',
        result: [],
        resultsPerPage: config_1.RES_PER_PAGE,
        page: 1,
    },
};
const loadRecipe = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = (yield (0, helpers_1.getJson)(`${config_1.API_URL}${id}`));
            if ('recipe' in data.data) {
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
            throw error;
        }
    });
};
exports.loadRecipe = loadRecipe;
const loadSearchResults = function (query) {
    return __awaiter(this, void 0, void 0, function* () {
        // `https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza`;
        try {
            exports.state.search.query = query;
            const data = (yield (0, helpers_1.getJson)(`${config_1.API_URL}?search=${query}`));
            if ('recipes' in data.data)
                exports.state.search.result = data.data.recipes.map((rec) => {
                    return {
                        id: rec.id,
                        title: rec.title,
                        image: rec.image_url,
                        publisher: rec.publisher,
                    };
                });
        }
        catch (error) {
            console.log(`My erorr ${error}`);
            throw error;
        }
    });
};
exports.loadSearchResults = loadSearchResults;
(0, exports.loadSearchResults)('https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza');
const getSearchResultsPage = function (page = 1) {
    exports.state.search.page = page;
    // 38
    // 0 - 12
    // 12 - 24
    // 24 - 36
    // 36 - 48
    const start = (page - 1) * exports.state.search.resultsPerPage; // 0;
    const end = page * exports.state.search.resultsPerPage; // 9;
    // console.log('getSearchResultsPage');
    // console.log(state.search.result.slice(start, end));
    return exports.state.search.result.slice(start, end);
};
exports.getSearchResultsPage = getSearchResultsPage;
const updateServings = function (newServings) {
    const coefficient = newServings / exports.state.recipe.servings;
    exports.state.recipe.ingredients.forEach((ingredient) => {
        ingredient.quantity = ingredient.quantity * coefficient;
    });
    exports.state.recipe.servings = newServings;
};
exports.updateServings = updateServings;
