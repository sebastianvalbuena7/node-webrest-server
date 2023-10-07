import { TodoRepository } from "../../repositories/todo.repository";

export interface DeleteTodoUseCase {
    execute(id: number): void
}

export class DeleteTodo implements DeleteTodoUseCase {
    constructor(
        private readonly repository: TodoRepository
    ){}
    
    execute(id: number) {
        this.repository.deleteById(id)
    }
}