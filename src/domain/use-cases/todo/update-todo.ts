import { UpdateTodoDto } from "../../dtos";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

export interface UpdateTodoUseCase {
    execute(id: number, dto: UpdateTodoDto): Promise<TodoEntity>
}

export class UpdateTodo implements UpdateTodoUseCase {
    constructor(
        private readonly repository: TodoRepository
    ){}

    execute(id: number, dto: UpdateTodoDto): Promise<TodoEntity> {
        return this.repository.updateTodo(id, dto);
    }
}