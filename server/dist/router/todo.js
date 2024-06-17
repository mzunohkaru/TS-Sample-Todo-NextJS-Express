"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../utils/db"));
const router = express_1.default.Router();
router.get("/", async (req, res, next) => {
    try {
        const todo = await db_1.default.todo.findMany();
        res.status(200).json(todo);
    }
    catch (error) {
        next(error);
    }
});
router.post("/", async (req, res, next) => {
    try {
        const { title } = req.body;
        const todo = await db_1.default.todo.create({
            data: { title },
        });
        res.status(201).json(todo);
    }
    catch (error) {
        next(error);
    }
});
router.put("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, isCompleted } = req.body;
        const todo = await db_1.default.todo.update({
            where: { id: Number(id) },
            data: { title, isCompleted },
        });
        res.status(201).json(todo);
    }
    catch (error) {
        next(error);
    }
});
router.delete("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const todo = await db_1.default.todo.delete({
            where: { id: Number(id) },
        });
        res.status(201).json(todo);
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
