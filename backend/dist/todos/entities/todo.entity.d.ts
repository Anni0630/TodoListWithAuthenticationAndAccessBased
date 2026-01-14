import { User } from '../../users/entities/user.entity';
export declare class Todo {
    id: string;
    title: string;
    description: string;
    isCompleted: boolean;
    userId: string;
    user: User;
    createdAt: Date;
    updatedAt: Date;
}
