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
exports.SemestersService = void 0;
const common_1 = require("@nestjs/common");
const semester_entity_1 = require("./entities/semester.entity");
const semesters_repository_1 = require("./semesters.repository");
let SemestersService = class SemestersService {
    constructor(semestersRepository) {
        this.semestersRepository = semestersRepository;
    }
    create(createSemesterDto) {
        const semester = new semester_entity_1.Semester(createSemesterDto);
        return this.semestersRepository.save(semester);
    }
    findAll() {
        return `This action returns all semesters`;
    }
    findOne(id) {
        return `This action returns a #${id} semester`;
    }
    update(id, updateSemesterDto) {
        return `This action updates a #${id} semester`;
    }
    remove(id) {
        return `This action removes a #${id} semester`;
    }
};
exports.SemestersService = SemestersService;
exports.SemestersService = SemestersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [semesters_repository_1.SemestersRepository])
], SemestersService);
//# sourceMappingURL=semesters.service.js.map