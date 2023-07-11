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
const comment_1 = __importDefault(require("../../../models/comment"));
class CommentStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield comment_1.default.findAll({});
                return data;
            }
            catch (error) {
                throw new Error("An Error Occurred");
            }
        });
    }
    create(comment) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const addedComment = yield comment_1.default.create(comment);
                return addedComment;
            }
            catch (error) {
                throw new Error(`an error occurred ${error}`);
            }
        });
    }
    update(body, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const found = yield comment_1.default.findByPk(id);
                if (!found)
                    throw new Error("Cannot find comment");
                found.update({ body });
                return found;
            }
            catch (error) {
                throw new Error(`An error occurred: ${error}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comment = yield comment_1.default.findByPk(id);
                if (!comment)
                    throw new Error("Comment not found");
                return comment;
            }
            catch (error) {
                throw new Error(`${error}`);
            }
        });
    }
    deleteComment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const found = yield comment_1.default.findByPk(id);
                if (!found)
                    throw new Error("Comment not found");
                yield found.destroy();
            }
            catch (error) {
                throw new Error(`An error occurred: ${error}`);
            }
        });
    }
}
exports.default = CommentStore;
