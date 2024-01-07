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
exports.ResourcesService = void 0;
const common_1 = require("@nestjs/common");
const resources_repository_1 = require("./resources.repository");
let ResourcesService = class ResourcesService {
    constructor(resourcesRepository) {
        this.resourcesRepository = resourcesRepository;
    }
    async createAResource(createResourceDto) {
        return this.resourcesRepository.createResource(createResourceDto);
    }
    async getAllResources() {
        return this.resourcesRepository.find();
    }
    findOne(id) {
        return `This action returns a #${id} resource`;
    }
    update(id, updateResourceDto) {
        return `This action updates a #${id} resource`;
    }
    async deleteAResource(id) {
        const result = await this.resourcesRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Resource with Id "${id}" not found`);
        }
    }
};
exports.ResourcesService = ResourcesService;
exports.ResourcesService = ResourcesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [resources_repository_1.ResourcesRepository])
], ResourcesService);
//# sourceMappingURL=resources.service.js.map