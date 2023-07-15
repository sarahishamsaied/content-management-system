"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GoogleOAuthConfig = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
};
exports.default = GoogleOAuthConfig;
