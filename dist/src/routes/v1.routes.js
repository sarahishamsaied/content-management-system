"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
/** User Routes **/
const user_routes_1 = __importDefault(require("./v1/user.routes"));
const post_routes_1 = __importDefault(require("./v1/post.routes"));
const university_routes_1 = __importDefault(require("./v1/university.routes"));
const router = (0, express_1.Router)();
router.use("/users", user_routes_1.default);
router.use("/posts", post_routes_1.default);
router.use("/uni", university_routes_1.default);
exports.default = router;
