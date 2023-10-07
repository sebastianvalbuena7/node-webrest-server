import { Request, Response } from "express"
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos"
import { TodoRepository } from "../../domain"

export class TodosController {
    constructor(
        private readonly todoRepository: TodoRepository
    ) { }

    public getTodos = async (req: Request, res: Response) => {
        const todos = await this.todoRepository.getAll();
        return res.json(todos);
    }

    public getTodoById = async (req: Request, res: Response) => {
        const id = +req.params.id;

        try {
            const todo = await this.todoRepository.findById(id);
            return res.json(todo)
        } catch (error) {
            res.status(404).json(error);
        }
    }

    public createTodo = async (req: Request, res: Response) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body);

        if (error) return res.status(400).json({ error });

        const todo = await this.todoRepository.create(createTodoDto!)
        return res.json(todo)
    }

    public updateTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id })

        const updatedTodo = await this.todoRepository.updateTodo(id, updateTodoDto!)
        return res.json(updatedTodo)
    }

    public deleteTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' });

        const deletedTodo = this.todoRepository.deleteById(id);
        res.json(deletedTodo);
    }
}