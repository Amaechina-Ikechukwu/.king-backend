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
const express_1 = require("express");
const AddUserToFirebase_1 = __importDefault(require("../actions/auth/AddUserToFirebase"));
const CreateUserFirebase_1 = __importDefault(require("../actions/auth/CreateUserFirebase"));
const GetLongLiveUserToken_1 = __importDefault(require("../actions/auth/GetLongLiveUserToken"));
const uuid_1 = require("uuid");
const requestvalidator_1 = require("../middleware/requestvalidator");
// const createUserFirebase = new CreateUserFirebase()
const authRouter = (0, express_1.Router)();
const createUserFirebase = new CreateUserFirebase_1.default();
authRouter.post("/getusertoken", (0, requestvalidator_1.requestValidator)(["userid", "token"]), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = yield (0, GetLongLiveUserToken_1.default)(req.body.token);
    try {
        const newUUID = (0, uuid_1.v4)();
        const body = {
            userid: req.body.userid,
            token: token,
            uuid: newUUID,
        };
        const result = yield createUserFirebase.CreateUser(body);
        yield new AddUserToFirebase_1.default().AddUser(body);
        res.status(200).json({ result });
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
exports.default = authRouter;
//# sourceMappingURL=authroutes.js.map