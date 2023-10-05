import { Router } from "express"
import { TodosController } from "./controller"

export class TodoRoutes {
    static get routes(): Router {
        const router = Router()
        const todoController = new TodosController()

        router.get('/', (req, res) => todoController.getTodos(req, res))
        router.get('/:id', todoController.getTodoById)
        router.post('/', (req, res) => todoController.createTodo(req, res))
        router.put('/:id', todoController.updateTodo)
        router.delete('/:id', todoController.deleteTodo)

        return router
    }
}