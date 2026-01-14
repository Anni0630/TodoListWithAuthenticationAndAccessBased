import { Todo } from '../../todos/entities/todo.entity';
export declare enum UserRole {
    USER = "USER",
    ADMIN = "ADMIN"
}
export declare class User {
    id: string;
    email: string;
    password: string;
    name: string;
    role: UserRole;
    isActive: boolean;
    avatarUrl: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    todos: Todo[];
}
