"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SearchView {
    constructor() {
        this.parentElement = document.querySelector('.search');
    }
    getQuery() {
        var _a;
        return (_a = this.parentElement) === null || _a === void 0 ? void 0 : _a.querySelector('.search__field').value;
    }
    clearInput() {
        var _a;
        (_a = this.parentElement) === null || _a === void 0 ? void 0 : _a.querySelector('.search__field').value = '';
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
