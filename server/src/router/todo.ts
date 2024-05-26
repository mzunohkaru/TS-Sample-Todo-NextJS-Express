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
  const { title, isCompleted } = req.body;
  const todo = await prisma.todo.update({
    where: { id: Number(id) },
    data: { title, isCompleted },
  });
  res.status(201).json(todo);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const todo = await prisma.todo.delete({
    where: { id: Number(id) },
  });
  res.status(201).json(todo);
});

export default router;
