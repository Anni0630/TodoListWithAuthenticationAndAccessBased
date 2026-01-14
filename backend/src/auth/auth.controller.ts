import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Post('signup')
    async signup(@Body() userData) {
        return this.authService.signup(userData);
    }

    @Post('logout')
    async logout(@Request() req) {
        // Client should just discard the token, but we can implement server-side logout if needed
        return { message: 'Signed out successfully' };
    }
}
