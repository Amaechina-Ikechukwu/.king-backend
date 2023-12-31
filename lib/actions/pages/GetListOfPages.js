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
const axios_1 = __importDefault(require("axios"));
const database_1 = require("firebase-admin/database");
class GetListOfPages {
    ListOfPages(userId, uuid) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const usertoken = yield this.GetUserToken(uuid);
            try {
                const response = yield axios_1.default.get(`https://graph.facebook.com/v17.0/${userId}/accounts?
  access_token=${usertoken}`, {
                    params: {
                        access_token: usertoken,
                    },
                });
                // Assuming the response data is an object with an 'accounts' property that contains an array of page objects,
                // extract the 'name' property from each page object and return as an array of strings.
                const pages = response.data;
                return pages;
            }
            catch (error) {
                console.error("Error response status:", (_a = error.response) === null || _a === void 0 ? void 0 : _a.status);
                console.error("Error response data:", (_b = error.response) === null || _b === void 0 ? void 0 : _b.data);
                throw new Error("Error fetching data: " + error);
            }
        });
    }
    GetUserToken(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, database_1.getDatabase)()
                .ref(`users/${uuid}`)
                .on("value", (snapshot) => {
                return snapshot.token;
            }, (error) => {
                throw new Error(error);
            });
        });
    }
}
exports.default = GetListOfPages;
//# sourceMappingURL=GetListOfPages.js.map