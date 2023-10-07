import { prisma } from "../../data/postgres";
import { CreateTodoDto, TodoDataSource, TodoEntity, UpdateTodoDto } from "../../domain";

export class TodoDataSourceImpl implements TodoDataSource {
    async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        const todo = await prisma.todo.create({
            data: createTodoDto!
        });

        return TodoEntity.fromObject(todo);
    }

    async getAll(): Promise<TodoEntity[]> {
        const todos = await prisma.todo.findMany();

        return todos.map(todo => TodoEntity.fromObject(todo))
    }

    async findById(id: number): Promise<TodoEntity | undefined> {
        const todo = await prisma.todo.findUnique({
            where: { id }
        });

        if (!todo) throw `Todo with id ${id} not found`;

        return TodoEntity.fromObject(todo);
    }

    async updateTodo(id: number, updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        const todo = await prisma.todo.findUnique({
            where: { id }
        });

        if (!todo) throw `Todo with id ${id} not found`;

        const todoSaved = await prisma.todo.update({
            where: { id },
            data: updateTodoDto?.values!
        });

        return TodoEntity.fromObject(todoSaved);
    }

    async deleteById(id: number) {
        const todo = prisma.todo.findUnique({
            where: { id }
        });

        if (!todo) throw `Todo with id ${id} not found`;

        const deleteTodo = await prisma.todo.delete({
            where: {
                id
            }
        });

        return TodoEntity.fromObject(deleteTodo);
    }
}