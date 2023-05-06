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
exports.uploadRecipe = exports.deleteBookmark = exports.addBookmark = exports.updateServings = exports.getSearchResultsPage = exports.loadSearchResults = exports.loadRecipe = exports.state = void 0;
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
    bookmarks: [],
};
const createRecipeObject = function (data) {
    const { recipe } = data.data;
    return Object.assign({ id: recipe.id, image: recipe.image_url, title: recipe.title, cookingTime: recipe.cooking_time, ingredients: recipe.ingredients, publisher: recipe.publisher, servings: recipe.servings, sourceUrl: recipe.source_url }, (recipe.key && { key: recipe.key }));
};
const loadRecipe = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, helpers_1.AJAX)(`${config_1.API_URL}${id}?key=${config_1.API_KEY}`);
            exports.state.recipe = createRecipeObject(data);
            if (exports.state.bookmarks.some((bookmark) => bookmark.id === id)) {
                exports.state.recipe.bookmarked = true;
            }
            else {
                exports.state.recipe.bookmarked = false;
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
            const data = (yield (0, helpers_1.AJAX)(`${config_1.API_URL}?search=${query}&key=${config_1.API_KEY}`));
            if ('recipes' in data.data)
                exports.state.search.result = data.data.recipes.map((rec) => {
                    return Object.assign({ id: rec.id, title: rec.title, image: rec.image_url, publisher: rec.publisher }, (rec.key && { key: rec.key }));
                });
            exports.state.search.page = 1;
        }
        catch (error) {
            throw error;
        }
    });
};
exports.loadSearchResults = loadSearchResults;
(0, exports.loadSearchResults)('https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza');
const getSearchResultsPage = function (page = 1) {
    exports.state.search.page = page;
    const start = (page - 1) * exports.state.search.resultsPerPage; // 0;
    const end = page * exports.state.search.resultsPerPage; // 9;
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
const persistBookmarks = function () {
    localStorage.setItem('bookmarks', JSON.stringify(exports.state.bookmarks));
};
const addBookmark = function (recipe) {
    // Add bookmark
    exports.state.bookmarks.push(recipe);
    // Mark current recipe as bookmark
    if (recipe.id === exports.state.recipe.id) {
        exports.state.recipe.bookmarked = true;
    }
    persistBookmarks();
};
exports.addBookmark = addBookmark;
const deleteBookmark = function (id) {
    const index = exports.state.bookmarks.findIndex((el) => el.id === id);
    exports.state.bookmarks.splice(index, 1);
    if (id === exports.state.recipe.id) {
        exports.state.recipe.bookmarked = false;
    }
    persistBookmarks();
};
exports.deleteBookmark = deleteBookmark;
const init = function () {
    const storage = localStorage.getItem('bookmarks');
    if (storage)
        exports.state.bookmarks = JSON.parse(storage);
};
init();
const uploadRecipe = function (newRecipe) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ingredients = Object.entries(newRecipe)
                .filter((entry) => entry[0].startsWith('ingredient') && entry[1] !== '')
                .map((ingredient) => {
                const ingArr = ingredient[1].split(',').map((el) => el.trim());
                if (ingArr.length !== 3)
                    throw new Error('Wrong ingredient format! Please use the correct format :)');
                const [quantity, unit, description] = ingArr;
                return { quantity: quantity ? +quantity : null, unit, description };
            });
            const recipe = {
                title: newRecipe.title,
                source_url: newRecipe.sourceUrl,
                image_url: newRecipe.image,
                publisher: newRecipe.publisher,
                cooking_time: +newRecipe.cookingTime,
                servings: +newRecipe.servings,
                ingredients: ingredients,
            };
            const data = yield (0, helpers_1.AJAX)(`${config_1.API_URL}?key=${config_1.API_KEY}`, recipe);
            exports.state.recipe = createRecipeObject(data);
            (0, exports.addBookmark)(exports.state.recipe);
        }
        catch (error) {
            throw error;
        }
    });
};
exports.uploadRecipe = uploadRecipe;
