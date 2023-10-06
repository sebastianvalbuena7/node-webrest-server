export class CreateTodoDto {
    constructor(
        readonly text: string,
        readonly completedAt: Date
    ) { }

    static create(props: { [key: string]: any }): [string?, CreateTodoDto?] {
        const { text, completedAt } = props

        if (!completedAt) return ['CompletedAt property is required', undefined]

        if (!text) return ['Text property is required', undefined]

        return [undefined, new CreateTodoDto(text, new Date(completedAt))];
    }
}