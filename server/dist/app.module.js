"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const users_module_1 = require("./users/users.module");
const projects_module_1 = require("./projects/projects.module");
const typeorm_1 = require("@nestjs/typeorm");
const semesters_module_1 = require("./semesters/semesters.module");
const roles_module_1 = require("./roles/roles.module");
const resources_module_1 = require("./resources/resources.module");
const auth_module_1 = require("./auth/auth.module");
const programs_module_1 = require("./programs/programs.module");
const faculties_module_1 = require("./faculties/faculties.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            projects_module_1.ProjectsModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5434,
                username: 'postgres',
                password: 'postgres',
                database: 'eduvaDb',
                autoLoadEntities: true,
                synchronize: true,
            }),
            semesters_module_1.SemestersModule,
            roles_module_1.RolesModule,
            resources_module_1.ResourcesModule,
            auth_module_1.AuthModule,
            programs_module_1.ProgramsModule,
            faculties_module_1.FacultiesModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map