"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const View_1 = __importDefault(require("./View"));
const previewView_1 = __importDefault(require("./previewView"));
class ResultsView extends View_1.default {
    constructor() {
        super(...arguments);
        this.parentElement = document.querySelector('.results');
    }
    generateMarkup() {
        const paginationObj = this.data;
        return paginationObj
            .map((result) => previewView_1.default.render(result, false))
            .join('');
    }
}
exports.default = new ResultsView();
