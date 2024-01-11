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
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const projects_repository_1 = require("./projects.repository");
const mammoth_1 = require("mammoth");
let ProjectsService = class ProjectsService {
    constructor(projectsRepository) {
        this.projectsRepository = projectsRepository;
    }
    async createProject(createProjectDto) {
        return this.projectsRepository.createProject(createProjectDto);
    }
    async getProjects(filterDto) {
        return this.projectsRepository.getProjects(filterDto);
    }
    async getProjectByCode(code) {
        return this.projectsRepository.getProjectByCode(code);
    }
    async updateProjectStatus(code, status) {
        const project = await this.getProjectByCode(code);
        project.status = status;
        await this.projectsRepository.save(project);
        return project;
    }
    async deleteProject(code) {
        const result = await this.projectsRepository.delete(code);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Project with Code "${code}" not found`);
        }
    }
    async updateAProject(id, updateProjectDto) {
        return this.projectsRepository.updateAProject(id, updateProjectDto);
    }
    currentTime() {
        return Date.now() / 1000;
    }
    extractProjectTitle(inputText) {
        const startString = "Tên đề tài:";
        const endString = "CBHD1";
        const regexPattern = new RegExp(`${startString}([\\s\\S]*?)${endString}`);
        const match = inputText.match(regexPattern);
        let extractedText = match && match[1] ? match[1].trim() : null;
        extractedText = extractedText
            .replace("\n", "")
            .replace("Tiếng Việt:", "")
            .replace("Tiếng Anh", "");
        let resultExtractedText = extractedText.split(":").map((text) => {
            return text.trim();
        });
        let result = {
            vietnameseTitle: resultExtractedText[0],
            englishTitle: resultExtractedText[1],
        };
        return result;
    }
    extractProjectInstructors(text) {
        const emailStartDelimiter = "Email1: ";
        const cbhdStartDelimiter = "CBHD1: ";
        const emailStartIndex = text.indexOf(emailStartDelimiter);
        const cbhdStartIndex = text.indexOf(cbhdStartDelimiter);
        let emailEndIndex = text.indexOf("\n", emailStartIndex + emailStartDelimiter.length);
        if (emailEndIndex === -1) {
            emailEndIndex = text.length;
        }
        let cbhdEndIndex = text.indexOf("\n", cbhdStartIndex + cbhdStartDelimiter.length);
        if (cbhdEndIndex === -1) {
            cbhdEndIndex = text.length;
        }
        const emailContent = text
            .substring(emailStartIndex + emailStartDelimiter.length, emailEndIndex)
            .trim();
        const cbhdContent = text
            .substring(cbhdStartIndex + cbhdStartDelimiter.length, cbhdEndIndex)
            .trim();
        let resultArray = cbhdContent
            .replace(/(CBHD\d*)/g, "")
            .split(":")
            .map((item) => item.trim());
        const instructors = {};
        for (let i = 0; i < resultArray.length; i++) {
            instructors[`CBHD${i + 1}:`] = resultArray[i];
        }
        resultArray = emailContent
            .replace(/(Email\d*)/g, "")
            .split(":")
            .map((item) => item.trim());
        const emails = {};
        for (let i = 0; i < resultArray.length; i++) {
            emails[`Email${i + 1}:`] = resultArray[i];
        }
        return {
            instructors: instructors,
            emails: emails,
        };
    }
    extractMajor(inputText) {
        let regexPattern = /Ngành:[^\n]*/;
        let match = inputText.match(regexPattern);
        let extractedText = match ? match[0].trim() : null;
        regexPattern = /✔\s*([^☐\n]+)/g;
        extractedText = extractedText.match(regexPattern)[0].replace("✔", "").trim();
        return {
            major: extractedText,
        };
    }
    extractBranch(inputText) {
        let regexPattern = /Chương trình đào tạo:[^\n]*/;
        let match = inputText.match(regexPattern);
        let extractedText = match ? match[0].trim() : null;
        regexPattern = /✔\s*([^☐\n]+)/g;
        extractedText = extractedText.match(regexPattern)[0].replace("✔", "").trim();
        return {
            branch: extractedText,
        };
    }
    extractNumberOfParticipants(inputText) {
        const regexPattern = /Số lượng sinh viên thực hiện:\s*(\d+)/;
        const match = inputText.match(regexPattern);
        const numberOfParticipants = match ? parseInt(match[1], 10) : null;
        return {
            numberOfParticipants: numberOfParticipants,
        };
    }
    extractParticipants(inputText) {
        const regexPattern = /([^\n]+)\s*-\s*(\d+)(?=[\s\S]*Description)/g;
        const matches = [...inputText.matchAll(regexPattern)];
        const studentInfo = matches.map((match) => ({
            name: match[1].trim(),
            studentID: match[2],
        }));
        return {
            pariticipants: studentInfo,
        };
    }
    extractInfo(inputText, type, startString, endString) {
        const regexPattern = new RegExp(`${startString}([\\s\\S]*?)${endString}`);
        const match = inputText.match(regexPattern);
        const extractedText = match && match[1] ? match[1].trim() : null;
        return {
            [type]: extractedText,
        };
    }
    extractRefs(inputText) {
        const startString = "References:";
        const regexPattern = new RegExp(`${startString}([\\s\\S]*)`);
        const match = inputText.match(regexPattern);
        const extractedText = match && match[1] ? match[1].trim() : null;
        return {
            references: extractedText
        };
    }
    extractProject(filepath) {
        let path = "../../";
        console.log(path + filepath);
        mammoth_1.default
            .extractRawText({ path: path + filepath })
            .then((result) => {
            let text = result.value;
            let startTime = this.currentTime();
            let project = {};
            project = { ...project, ...this.extractProjectTitle(text) };
            project = { ...project, ...this.extractProjectInstructors(text) };
            project = { ...project, ...this.extractMajor(text) };
            project = { ...project, ...this.extractBranch(text) };
            project = { ...project, ...this.extractNumberOfParticipants(text) };
            project = { ...project, ...this.extractParticipants(text) };
            project = { ...project, ...this.extractInfo(text, "description", "Description:", "Task/Mission") };
            project = { ...project, ...this.extractInfo(text, "task", "Task/Mission", "References") };
            project = { ...project, ...this.extractRefs(text) };
            console.log(this.currentTime() - startTime);
            console.log(project);
        })
            .catch((error) => {
            console.error(error);
        });
    }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [projects_repository_1.ProjectsRepository])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map