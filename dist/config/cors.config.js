"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const acceptedOrigins = ["http://localhost:4200", "http://localhost:3000"];
const corsOptions = {
    origin: (origin, callback) => {
        if (acceptedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error("Origin not allowed by CORS"));
        }
    },
    optionsSuccessStatus: 200,
};
exports.default = corsOptions;
