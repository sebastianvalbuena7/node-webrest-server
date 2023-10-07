import { Router } from "express"
import { TodosController } from "./controller"
import { TodoDataSourceImpl } from "../../infrastructure/datasource/todo.datasource.impl"
import { TodoRepositoryImpl } from "../../infrastructure/repositories/todo.repository.impl"

export class TodoRoutes {
    static get routes(): Router {
        const router = Router()

        const datasource = new TodoDataSourceImpl()

        const todoRepository = new TodoRepositoryImpl(datasource)

        const todoController = new TodosController(todoRepository)

        router.get('/', (req, res) => todoController.getTodos(req, res))
        router.get('/:id', todoController.getTodoById)
        router.post('/', (req, res) => todoController.createTodo(req, res))
        router.put('/:id', todoController.updateTodo)
        router.delete('/:id', todoController.deleteTodo)

        return router
    }
}