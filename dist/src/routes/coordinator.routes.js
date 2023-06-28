"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const v1_routes_1 = __importDefault(require("./v1.routes"));
const coordinatorRouter = (0, express_1.Router)();
coordinatorRouter.use("/v1", v1_routes_1.default);
exports.default = coordinatorRouter;
