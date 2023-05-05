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
exports.AJAX = exports.timeout = void 0;
const config_1 = require("./config");
const timeout = function (s) {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};
exports.timeout = timeout;
function AJAX(url, uploadData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const fetchCall = uploadData
                ? fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(uploadData),
                })
                : fetch(url);
            console.log('AJAX');
            console.log(fetchCall);
            const res = yield Promise.race([fetchCall, (0, exports.timeout)(config_1.TIMEOUT_SEC)]);
            const data = yield res.json();
            if (!res.ok && data.status === 'fail') {
                const errorMessage = data.message || 'An error occurred';
                throw new Error(`${errorMessage} status: ${res.status}`);
            }
            return data;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.AJAX = AJAX;
