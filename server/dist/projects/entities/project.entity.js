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
exports.Project = void 0;
const semester_entity_1 = require("../../semesters/entities/semester.entity");
const typeorm_1 = require("typeorm");
const project_status_enum_1 = require("../project-status.enum");
const requirement_entity_1 = require("./requirement.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const student_entity_1 = require("../../users/entities/student.entity");
const major_entity_1 = require("../../programs/entities/major.entity");
const branch_entity_1 = require("../../programs/entities/branch.entity");
let Project = class Project {
    constructor(project) {
        Object.assign(this, project);
    }
};
exports.Project = Project;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Project.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Project.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Project.prototype, "stage", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Project.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Project.prototype, "tasks", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Project.prototype, "references", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Project.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => semester_entity_1.Semester),
    __metadata("design:type", semester_entity_1.Semester)
], Project.prototype, "semester", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => requirement_entity_1.Requirement, (requirement) => requirement.project),
    __metadata("design:type", Array)
], Project.prototype, "requirements", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_entity_1.User),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Project.prototype, "supervisors", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => student_entity_1.Student, (student) => student.project),
    __metadata("design:type", Array)
], Project.prototype, "students", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => major_entity_1.Major),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Project.prototype, "majors", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => branch_entity_1.Branch),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Project.prototype, "branches", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Project.prototype, "limit", void 0);
exports.Project = Project = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [Object])
], Project);
//# sourceMappingURL=project.entity.js.map