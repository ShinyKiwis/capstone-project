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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepository = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const common_1 = require("@nestjs/common");
let UsersRepository = class UsersRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(user_entity_1.User, dataSource.createEntityManager());
        this.dataSource = dataSource;
    }
    async createUser(createUserDto) {
        const { id, username, email, name } = createUserDto;
        const user = this.create({
            id,
            username,
            email,
            name
        });
        try {
            await this.save(user);
        }
        catch (error) {
            if (error.code === '23505') {
                throw new common_1.ConflictException('User already exists');
            }
            else {
                throw new common_1.InternalServerErrorException();
            }
        }
        return user;
    }
    async getUserById(id) {
        const found = await this.findOne({
            where: { id },
            relations: { roles: true },
        });
        const foundStudent = await this.findOne({
            where: { id },
        });
        if (!found) {
            throw new common_1.NotFoundException(`User with ID "${id}" not found`);
        }
        let result;
        if (foundStudent) {
            result = { ...result, ...foundStudent };
        }
        return found;
    }
    async updateOrCreateAUser(createUserDto) {
        await this.upsert(createUserDto, ['id']);
        const user = await this.getUserById(createUserDto.id);
        return user;
    }
    async assignRoles(id, assignRolesDto) {
        const user = await this.getUserById(id);
        user.roles = assignRolesDto.roles;
        await this.save(user);
        return user;
    }
    async getAllInstructors() {
        const query = this.createQueryBuilder('user').leftJoin('user.roles', 'roles').where('roles.id=:id', { id: 2 }).select(['user.id', 'user.name', 'user.email']);
        const lecturer = await query.getMany();
        return lecturer;
    }
};
exports.UsersRepository = UsersRepository;
exports.UsersRepository = UsersRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], UsersRepository);
//# sourceMappingURL=users.repository.js.map