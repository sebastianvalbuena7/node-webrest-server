import { CreateTodoDto, UpdateTodoDto } from "../dtos";
import { TodoEntity } from "../entities/todo.entity";

export abstract class TodoDataSource {
    abstract create(createTodoDto: CreateTodoDto): Promise<TodoEntity>;
    // TODO: paginate
    abstract getAll(): Promise<TodoEntity[]>;
    abstract findById(id: number): Promise<TodoEntity | undefined>;
    abstract updateTodo(id: number, updateTodoDto: UpdateTodoDto): Promise<TodoEntity>;
    abstract deleteById(id: number): void
}