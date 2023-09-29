const express = require("express")

const allRoutes = express.Router()
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

allRoutes.post("/all", async (req, res) => {
  const { name } = req.body
  const todo = await prisma.todo.create({
    data: {
      name
    }
  })
  return res.status(201).json(todo)
})

allRoutes.get("/all", async (req, res) => {
  const todo = await prisma.todo.findMany()
  return res.status(200).json(todo)
})

allRoutes.put("/all", async (req, res) => {
  const {name, id, status} = req.body

  const todo = await prisma.todo.update({
    where: {
      id
    },
    data: {
      name, status
    }
  })
  return res.status(200).json(todo);
})

allRoutes.delete("/all/:id", async (request, response) => {
  const { id } = request.params;

  const intId = parseInt(id);

  if (!intId) {
    return response.status(400).json("Id is mandatory");
  }

  const todoAlreadyExist = await prisma.todo.findUnique({
    where: { id: intId },
  });

  if (!todoAlreadyExist) {
    return response.status(404).json("Todo not exist");
  }

  await prisma.todo.delete({ where: { id: intId } });

  return response.status(200).send();
});

module.exports = allRoutes