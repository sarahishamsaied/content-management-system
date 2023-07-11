"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isAdmin = (req, res, next) => {
    try {
        const { user } = req.body;
        if (!user.is_admin)
            return res.status(401).json({ message: "Unauthorized" });
        next();
    }
    catch (error) {
        res.status(401).json({ message: error.message });
    }
};
exports.default = isAdmin;
