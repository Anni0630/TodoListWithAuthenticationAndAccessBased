import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { TodosService } from './todos.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('todos')
@UseGuards(JwtAuthGuard)
export class TodosController {
    constructor(private readonly todosService: TodosService) { }

    @Post()
    create(@Request() req, @Body() todoData) {
        return this.todosService.create(req.user.userId, todoData);
    }

    @Get()
    findAll(
        @Request() req,
        @Query('page') page: string,
        @Query('limit') limit: string,
    ) {
        return this.todosService.findAll(
            req.user.userId,
            parseInt(page) || 1,
            parseInt(limit) || 10,
        );
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Request() req) {
        return this.todosService.findOne(id, req.user.userId);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Request() req, @Body() updateData) {
        return this.todosService.update(id, req.user.userId, updateData);
    }

    @Delete(':id')
    remove(@Param('id') id: string, @Request() req) {
        return this.todosService.remove(id, req.user.userId);
    }
}
