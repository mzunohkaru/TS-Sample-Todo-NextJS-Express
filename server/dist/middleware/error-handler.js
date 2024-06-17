"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    console.error('サーバーエラー:', err);
    res.status(500).send({ error: err.message, statusCode: 500 });
};
exports.errorHandler = errorHandler;
