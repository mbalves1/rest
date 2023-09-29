const express = require("express")

const allTodos = [{name: "Murilo", status: false}]
const allRoutes = express.Router()

allRoutes.post("/all", (req, res) => {
  const { name } = req.body
  allTodos.push({ name, status: false })
  console.log(req);
  return res.status(201).json(allTodos)
})

allRoutes.get("/all", (req, res) => {
  return res.status(200).json(allTodos)
})

module.exports = allRoutes