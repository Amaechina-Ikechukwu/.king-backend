"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function VerifyToken(req, res, next) {
    var _a;
    const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "No token provided" });
    }
    else {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, ".king@(#&($)%*%&$(");
            req.user = decoded; // Attach the decoded user information to the request object
            next();
        }
        catch (error) {
            res.status(403).json({ message: "Invalid token" });
        }
    }
}
exports.default = VerifyToken;
//# sourceMappingURL=verifytoken.js.map