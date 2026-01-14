"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const users_service_1 = require("./users/users.service");
const user_entity_1 = require("./users/entities/user.entity");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const usersService = app.get(users_service_1.UsersService);
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
        await usersService.update(user.id, { role: user_entity_1.UserRole.ADMIN });
        console.log(`Successfully promoted ${email} to ADMIN.`);
    }
    catch (error) {
        console.error('An error occurred during promotion:', error.message);
    }
    finally {
        await app.close();
    }
}
bootstrap();
//# sourceMappingURL=promote-admin.js.map