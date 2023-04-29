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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("core-js/stable"); // for polyfilling everything else
require("regenerator-runtime"); // for polyfilling async/await
const model_1 = require("./model");
const recipeView_1 = __importDefault(require("./views/recipeView"));
const searchView_1 = __importDefault(require("./views/searchView"));
const resultView_1 = __importDefault(require("./views/resultView"));
const controlRecipes = function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = window.location.hash.slice(1);
            if (!id)
                return;
            recipeView_1.default.renderSpinner();
            // 1) Loading data
            yield (0, model_1.loadRecipe)(id);
            const recipe = model_1.state.recipe; //return {}
            if (!recipe)
                throw new Error('Id not found');
            // 2) Rendering data
            recipeView_1.default.render(recipe);
        }
        catch (error) {
            recipeView_1.default.clear();
            recipeView_1.default.renderError(error);
            console.error(error);
        }
    });
};
const controlSearchResults = function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = searchView_1.default.getQuery();
            if (!query)
                return;
            resultView_1.default.renderSpinner();
            yield (0, model_1.loadSearchResults)(query);
            const data = model_1.state.search.result;
            // render data
            resultView_1.default.render(data);
        }
        catch (error) {
            resultView_1.default.clear();
            resultView_1.default.renderError(error);
        }
    });
};
const init = function () {
    recipeView_1.default.addHandlerRender(controlRecipes);
    searchView_1.default.addHandlerSearch(controlSearchResults);
};
init();
