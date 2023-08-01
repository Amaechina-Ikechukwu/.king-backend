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
const database_1 = require("firebase-admin/database");
class AddUserToDatabase {
    /**
     * async  AddUser
     */
    AddUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, database_1.getDatabase)()
                .ref("users/" + (data === null || data === void 0 ? void 0 : data.userid))
                .set(data)
                .then(() => {
                return "done";
            })
                .catch((err) => {
                throw new Error(err);
            });
        });
    }
}
exports.default = AddUserToDatabase;
//# sourceMappingURL=AddUserToFirebase.js.map