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
const school_routes_1 = __importDefault(require("./v1/school.routes"));
const diploma_routes_1 = __importDefault(require("./v1/diploma.routes"));
const company_routes_1 = __importDefault(require("./v1/company.routes"));
const comment_routes_1 = __importDefault(require("./v1/comment.routes"));
const like_router_1 = __importDefault(require("./v1/like.router"));
const auth_routes_1 = __importDefault(require("./v1/auth.routes"));
const router = (0, express_1.Router)();
router.use("/users", user_routes_1.default);
router.use("/posts", post_routes_1.default);
router.use("/uni", university_routes_1.default);
router.use("/school", school_routes_1.default);
router.use("/diploma", diploma_routes_1.default);
router.use("/company", company_routes_1.default);
router.use("/comments", comment_routes_1.default);
router.use("/likes", like_router_1.default);
router.use("/auth", auth_routes_1.default);
exports.default = router;
