export class TodoEntity {
    constructor(
        public id: number,
        public text: string,
        public completedAt?: Date
    ) { }

    static fromObject(object: any): TodoEntity {
        const { id, text, completedAt } = object;

        if (!text) throw 'Text is required';
        if (!id) throw 'Id is required';
        if (!completedAt) throw 'completedAt is required'

        return new TodoEntity(id, text, completedAt)
    }
}