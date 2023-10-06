import { Request, Response } from "express"
import { prisma } from '../../data/postgres'
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos"

export class TodosController {
    constructor() { }

    public getTodos = async (req: Request, res: Response) => {
        const todos = await prisma.todo.findMany()
        res.json(todos)
    }

    public getTodoById = async (req: Request, res: Response) => {
        const id = +req.params.id;

        if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' })

        const todo = await prisma.todo.findUnique({
            where: {
                id
            }
        });

        (todo)
            ? res.json(todo)
            : res.status(404).json({ error: `Todo with id ${id} not found` });
    }

    public createTodo = async (req: Request, res: Response) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body);

        if (error) return res.status(400).json({ error });

        const todo = await prisma.todo.create({
            data: createTodoDto!
        })

        res.json(todo)
    }

    public updateTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.create({...req.body, id})

        if (error) return res.status(400).json({ error });

        const todo = await prisma.todo.findFirst({
            where: { id }
        });

        if (!todo) return res.status(404).json({ error: `Tdo with id ${id} not found` });

        const todoSaved = await prisma.todo.update({
            where: { id },
            data: updateTodoDto?.values!
        })

        res.json(todoSaved)
    }

    public deleteTodo = async (req: Request, res: Response) => {
        const id = +req.params.id
        if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' });

        const todo = prisma.todo.findUnique({
            where: {
                id
            }
        });

        if (!todo) return res.status(404).json({ error: `Tdo with id ${id} not found` });

        await prisma.todo.delete({
            where: {
                id
            }
        });

        res.status(200).json()
    }
}