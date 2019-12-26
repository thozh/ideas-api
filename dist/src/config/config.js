"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
exports.Config = {
    port: process.env.PORT,
    postgres_user: process.env.POSTGRES_USER,
    postgres_password: process.env.POSTGRES_PASSWORD,
};
//# sourceMappingURL=config.js.map