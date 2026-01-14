import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersService } from './users/users.service';
import { UserRole } from './users/entities/user.entity';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const usersService = app.get(UsersService);

    const email = process.argv[2];

    if (!email) {
        console.error('Please provide a user email: npm run promote-admin -- yourname@example.com');
        await app.close();
        process.exit(1);
    }

    try {
        const user = await usersService.findByEmail(email);
        if (!user) {
            console.error(`User with email ${email} not found.`);
            await app.close();
            process.exit(1);
        }

        console.log(`Current role for ${email}: ${user.role}`);

        await usersService.update(user.id, { role: UserRole.ADMIN });

        console.log(`Successfully promoted ${email} to ADMIN.`);
    } catch (error) {
        console.error('An error occurred during promotion:', error.message);
    } finally {
        await app.close();
    }
}

bootstrap();
