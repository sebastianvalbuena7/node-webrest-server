import { CreateTodoDto, TodoDataSource, TodoEntity, TodoRepository, UpdateTodoDto } from "../../domain";

export class TodoRepositoryImpl implements TodoRepository {

    constructor(
        private readonly datasource: TodoDataSource
    ) { }

    create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        return this.datasource.create(createTodoDto);
    }
    getAll(): Promise<TodoEntity[]> {
        return this.datasource.getAll();
    }
    findById(id: number): Promise<TodoEntity | undefined> {
        return this.datasource.findById(id);
    }
    updateTodo(id: number, updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        return this.datasource.updateTodo(id, updateTodoDto);
    }
    deleteById(id: number): void {
        return this.datasource.deleteById(id);
    }

}