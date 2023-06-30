"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const university_handler_1 = require("../../handlers/educational institutions/university.handler");
const universityRouter = (0, express_1.Router)();
universityRouter.get("/", university_handler_1.index);
universityRouter.post("/", university_handler_1.create);
universityRouter.get("/:id", university_handler_1.show);
universityRouter.put("/:id", university_handler_1.update);
exports.default = universityRouter;
