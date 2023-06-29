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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cors_config_1 = __importDefault(require("./config/cors.config"));
const coordinator_routes_1 = __importDefault(require("./src/routes/coordinator.routes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("./swagger.json"));
const fs_1 = __importDefault(require("fs"));
const customCss = fs_1.default.readFileSync("./src/swagger.css", "utf8");
dotenv_1.default.config();
const sequelize_config_1 = __importDefault(require("./config/sequelize.config"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)(cors_config_1.default));
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default, { customCss }));
const startDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("starting");
        yield sequelize_config_1.default.sync();
        console.log("finished");
        yield sequelize_config_1.default.authenticate();
        console.log("Connection has been established successfully.");
    }
    catch (error) {
        console.log("an error occurred");
        console.log(error);
    }
});
startDatabase();
app.use(coordinator_routes_1.default);
const port = process.env.PORT || 3000;
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
