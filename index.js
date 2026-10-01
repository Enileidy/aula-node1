const express = require("express")
const { Sequelize } = require("sequelize")
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "my-database.db"
})
sequelize.authenticate()
const Task = sequelize.define("Task", {
    description: {
    type: Sequelize.STRING
},
done: {
    type: Sequelize.BOOLEAN
}
})
sequelize.sync()
const app = express()
app.use(express.json())

app.get("/tasks", async function(req, res) {
    const tasks = await Task.findAll()
    res.json(tasks)
})

app.get("/tasks/:id", async function(req, res) {
    const taskId = req.params.id
    const task = await Task.findByPk(taskId)

    if (task == null) {
        return res.status(404).send("Tarefa não encontrada")
    }

    res.json(task)
})

app.put("/tasks/:id", async function(req, res) {
const taskId = req.params.id
const body = req.body
const task = await Task.findByPk(taskId)

if (task == null) {
    return res.status(404).send("Tarefa não encontrada")
}
await task.update(body)

res.json(task)

})
app.delete("/tasks/:id", async function(req, res) {
const taskId = req.params.id
const task = await Task.findByPk(taskId)

if (task == null) {
    return res.status(404).send("Tarefa não encontrada")
}
await task.destroy()
res.send("Tarefa " + taskId + " excluída")

})

app.post("/tasks", async function(req, res) {
const body = req.body
const task = await Task.create(body)
res.json(task)
})

app.listen(8080, function() {
    console.log("Servidor iniciado")
})