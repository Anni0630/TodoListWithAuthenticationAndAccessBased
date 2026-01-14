import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosService {
    constructor(
        @InjectRepository(Todo)
        private todosRepository: Repository<Todo>,
    ) { }

    async create(userId: string, todoData: Partial<Todo>): Promise<Todo> {
        const todo = this.todosRepository.create({
            ...todoData,
            userId,
        });
        return this.todosRepository.save(todo);
    }

    async findAll(userId: string, page: number = 1, limit: number = 10): Promise<{ data: Todo[]; total: number; page: number; limit: number }> {
        const [data, total] = await this.todosRepository.findAndCount({
            where: { userId },
            order: { createdAt: 'DESC' },
            take: limit,
            skip: (page - 1) * limit,
        });

        return { data, total, page, limit };
    }

    async findOne(id: string, userId: string): Promise<Todo> {
        const todo = await this.todosRepository.findOne({ where: { id } });
        if (!todo) {
            throw new NotFoundException('Todo not found');
        }
        if (todo.userId !== userId) {
            throw new ForbiddenException('You do not have access to this todo');
        }
        return todo;
    }

    async update(id: string, userId: string, updateData: Partial<Todo>): Promise<Todo> {
        const todo = await this.findOne(id, userId);
        Object.assign(todo, updateData);
        return this.todosRepository.save(todo);
    }

    async remove(id: string, userId: string): Promise<void> {
        const todo = await this.findOne(id, userId);
        await this.todosRepository.remove(todo);
    }
}
