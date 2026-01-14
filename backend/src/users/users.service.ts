import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async create(userData: Partial<User>): Promise<User> {
        const existingUser = await this.usersRepository.findOne({ where: { email: userData.email } });
        if (existingUser) {
            throw new ConflictException('User with this email already exists');
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const user = this.usersRepository.create({
            ...userData,
            password: hashedPassword,
            role: UserRole.USER, // Default role
        });

        return this.usersRepository.save(user);
    }

    async findByEmail(email: string): Promise<User | undefined> {
        return this.usersRepository.findOne({
            where: { email, isActive: true },
            select: ['id', 'email', 'password', 'name', 'role', 'isActive', 'avatarUrl'],
        });
    }

    async findById(id: string): Promise<User> {
        const user = await this.usersRepository.findOne({ where: { id, isActive: true } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async update(id: string, updateData: Partial<User>): Promise<User> {
        const user = await this.findById(id);
        Object.assign(user, updateData);
        if (updateData.password) {
            user.password = await bcrypt.hash(updateData.password, 10);
        }
        return this.usersRepository.save(user);
    }

    async softDelete(id: string): Promise<void> {
        const user = await this.findById(id);
        user.isActive = false;
        await this.usersRepository.save(user);
        await this.usersRepository.softDelete(id);
    }

    async findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }
}
