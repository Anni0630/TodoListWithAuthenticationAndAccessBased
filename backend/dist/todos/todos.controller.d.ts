import { TodosService } from './todos.service';
export declare class TodosController {
    private readonly todosService;
    constructor(todosService: TodosService);
    create(req: any, todoData: any): Promise<import("./entities/todo.entity").Todo>;
    findAll(req: any, page: string, limit: string): Promise<{
        data: import("./entities/todo.entity").Todo[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string, req: any): Promise<import("./entities/todo.entity").Todo>;
    update(id: string, req: any, updateData: any): Promise<import("./entities/todo.entity").Todo>;
    remove(id: string, req: any): Promise<void>;
}
