"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const View_1 = __importDefault(require("./View"));
const previewView_1 = __importDefault(require("./previewView"));
class BookmarksView extends View_1.default {
    constructor() {
        super(...arguments);
        this.parentElement = document.querySelector('.bookmarks__list');
        this.errorMessage = 'No bookmarks yet. Find a recipe and bookmark it.';
    }
    generateMarkup() {
        const bookmarkData = this.data;
        return bookmarkData
            .map((bookMarks) => previewView_1.default.render(bookMarks, false))
            .join('');
    }
}
exports.default = new BookmarksView();
