import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getProfile(req: any): Promise<import("./entities/user.entity").User>;
    updateProfile(req: any, updateData: any): Promise<import("./entities/user.entity").User>;
    softDelete(req: any): Promise<void>;
    uploadAvatar(req: any, file: Express.Multer.File): Promise<{
        avatarUrl: string;
    }>;
    findAll(): Promise<import("./entities/user.entity").User[]>;
    update(id: string, updateData: any): Promise<import("./entities/user.entity").User>;
    remove(id: string): Promise<void>;
}
