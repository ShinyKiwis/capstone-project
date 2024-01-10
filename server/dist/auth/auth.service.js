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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const branches_repository_1 = require("../programs/branches.repository");
const majors_repository_1 = require("../programs/majors.repository");
const students_repository_1 = require("../students/students.repository");
const users_repository_1 = require("../users/users.repository");
let AuthService = class AuthService {
    constructor(usersRepository, branchesRepository, majorsRepository, studentsRepository) {
        this.usersRepository = usersRepository;
        this.branchesRepository = branchesRepository;
        this.majorsRepository = majorsRepository;
        this.studentsRepository = studentsRepository;
    }
    async getAuthSession(session, createUserDto) {
        let user = await this.usersRepository.updateOrCreateAUser(createUserDto);
        const student = await this.studentsRepository.getStudentById(user.id);
        if (student) {
            user = { ...user, ...student };
        }
        const branches = await this.branchesRepository.getAllBranches();
        const majors = await this.majorsRepository.getAllMajors();
        const lecturer = await this.usersRepository.getAllInstructors();
        session.authenticated = true;
        session.user = user;
        session.branches = branches,
            session.majors = majors;
        session.instructors = lecturer;
        return session;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository, branches_repository_1.BranchesRepository, majors_repository_1.MajorsRepository, students_repository_1.StudentsRepository])
], AuthService);
//# sourceMappingURL=auth.service.js.map