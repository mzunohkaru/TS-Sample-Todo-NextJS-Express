import express from "express";

import prisma from "../utils/db";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const todo = await prisma.todo.findMany();
    res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { title } = req.body;
    const todo = await prisma.todo.create({
      data: { title },
    });
    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, isCompleted } = req.body;
    const todo = await prisma.todo.update({
      where: { id: Number(id) },
      data: { title, isCompleted },
    });
    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await prisma.todo.delete({
      where: { id: Number(id) },
    });
    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
});

export default router;
