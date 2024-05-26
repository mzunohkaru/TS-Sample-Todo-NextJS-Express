import express from "express";

import prisma from "../utils/db";

const router = express.Router();

router.get("/", async (req, res) => {
  const todo = await prisma.todo.findMany();
  res.status(200).json(todo);
});

router.post("/", async (req, res) => {
  const { title } = req.body;
  const todo = await prisma.todo.create({
    data: { title },
  });
  res.status(201).json(todo);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { isCompleted } = req.body;
  await prisma.todo.update({
    where: { id: Number(id) },
    data: { isCompleted },
  });
  res.status(204).json({ message: "Todo updated successfully" });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.todo.delete({
    where: { id: Number(id) },
  });
  res.status(204).json({ message: "Todo deleted successfully" });
});

export default router;
