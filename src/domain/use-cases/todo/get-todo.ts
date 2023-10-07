import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

export interface GetTodoUseCase {
    execute(id: number): Promise<TodoEntity | undefined>
}

export class GetTodo implements GetTodoUseCase {
    constructor(
        private readonly repository: TodoRepository
    ){}
    
    execute(id: number) {
        return this.repository.findById(id)
    }
}