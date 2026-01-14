import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
export declare class TodosService {
    private todosRepository;
    constructor(todosRepository: Repository<Todo>);
    create(userId: string, todoData: Partial<Todo>): Promise<Todo>;
    findAll(userId: string, page?: number, limit?: number): Promise<{
        data: Todo[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string, userId: string): Promise<Todo>;
    update(id: string, userId: string, updateData: Partial<Todo>): Promise<Todo>;
    remove(id: string, userId: string): Promise<void>;
}
