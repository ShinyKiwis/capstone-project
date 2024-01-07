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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SemestersController = void 0;
const common_1 = require("@nestjs/common");
const semesters_service_1 = require("./semesters.service");
const create_semester_dto_1 = require("./dto/create-semester.dto");
const update_semester_dto_1 = require("./dto/update-semester.dto");
let SemestersController = class SemestersController {
    constructor(semestersService) {
        this.semestersService = semestersService;
    }
    create(createSemesterDto) {
        return this.semestersService.create(createSemesterDto);
    }
    findAll() {
        return this.semestersService.findAll();
    }
    findOne(id) {
        return this.semestersService.findOne(+id);
    }
    update(id, updateSemesterDto) {
        return this.semestersService.update(+id, updateSemesterDto);
    }
    remove(id) {
        return this.semestersService.remove(+id);
    }
};
exports.SemestersController = SemestersController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_semester_dto_1.CreateSemesterDto]),
    __metadata("design:returntype", void 0)
], SemestersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SemestersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SemestersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_semester_dto_1.UpdateSemesterDto]),
    __metadata("design:returntype", void 0)
], SemestersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SemestersController.prototype, "remove", null);
exports.SemestersController = SemestersController = __decorate([
    (0, common_1.Controller)('semesters'),
    __metadata("design:paramtypes", [semesters_service_1.SemestersService])
], SemestersController);
//# sourceMappingURL=semesters.controller.js.map