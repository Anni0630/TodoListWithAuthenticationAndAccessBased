import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TodosModule } from './todos/todos.module';

@Module({
    imports: [DatabaseModule, UsersModule, AuthModule, TodosModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
