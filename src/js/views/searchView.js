"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SearchView {
    constructor() {
        this.parentElement = document.querySelector('.search');
        this.errorMessage = 'We could not find that recipe. Please try again!';
        this.defaultMessage = 'Start by searching for a recipe or an ingredient. Have fun!';
    }
    getQuery() {
        return this.parentElement.querySelector('.search__field').value;
    }
    clearInput() {
        this.parentElement.querySelector('.search__field').value = '';
    }
    addHandlerSearch(handler) {
        this.parentElement.addEventListener('submit', (e) => {
            e.preventDefault();
            handler();
            this.clearInput();
        });
    }
}
exports.default = new SearchView();
