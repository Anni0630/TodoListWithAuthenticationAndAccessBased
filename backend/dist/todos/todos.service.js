"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const todo_entity_1 = require("./entities/todo.entity");
let TodosService = class TodosService {
    constructor(todosRepository) {
        this.todosRepository = todosRepository;
    }
    async create(userId, todoData) {
        const todo = this.todosRepository.create({
            ...todoData,
            userId,
        });
        return this.todosRepository.save(todo);
    }
    async findAll(userId, page = 1, limit = 10) {
        const [data, total] = await this.todosRepository.findAndCount({
            where: { userId },
            order: { createdAt: 'DESC' },
            take: limit,
            skip: (page - 1) * limit,
        });
        return { data, total, page, limit };
    }
    async findOne(id, userId) {
        const todo = await this.todosRepository.findOne({ where: { id } });
        if (!todo) {
            throw new common_1.NotFoundException('Todo not found');
        }
        if (todo.userId !== userId) {
            throw new common_1.ForbiddenException('You do not have access to this todo');
        }
        return todo;
    }
    async update(id, userId, updateData) {
        const todo = await this.findOne(id, userId);
        Object.assign(todo, updateData);
        return this.todosRepository.save(todo);
    }
    async remove(id, userId) {
        const todo = await this.findOne(id, userId);
        await this.todosRepository.remove(todo);
    }
};
exports.TodosService = TodosService;
exports.TodosService = TodosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(todo_entity_1.Todo)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TodosService);
//# sourceMappingURL=todos.service.js.map