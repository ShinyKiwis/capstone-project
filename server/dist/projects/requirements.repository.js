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
exports.RequirementRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const requirement_entity_1 = require("./entities/requirement.entity");
let RequirementRepository = class RequirementRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(requirement_entity_1.Requirement, dataSource.createEntityManager());
        this.dataSource = dataSource;
    }
    async createRequirement(createRequirementDto) {
        const { projectCode, attribute, operator, value } = createRequirementDto;
        const requirement = this.create({
            projectCode,
            attribute,
            operator,
            value,
        });
        await this.save(requirement);
        return requirement;
    }
};
exports.RequirementRepository = RequirementRepository;
exports.RequirementRepository = RequirementRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], RequirementRepository);
//# sourceMappingURL=requirements.repository.js.map