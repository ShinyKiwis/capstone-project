import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './entities/project.entity';
import { ProjectsRepository } from './projects.repository';
import { ProjectStatus } from './project-status.enum';
import { GetProjectsFilterDto } from './dto/get-projects-filter.dto';
import mammoth from 'mammoth';

@Injectable()
export class ProjectsService {
  constructor(private readonly projectsRepository: ProjectsRepository) { }

  async createProject(createProjectDto: CreateProjectDto) {
    return this.projectsRepository.createProject(createProjectDto);
  }

  async getProjects(filterDto: GetProjectsFilterDto) {
    return this.projectsRepository.getProjects(filterDto);
  }

  async getProjectByCode(code: number) {
    return this.projectsRepository.getProjectByCode(code);
  }

  async updateProjectStatus(
    code: number,
    status: ProjectStatus,
  ): Promise<Project> {
    const project = await this.getProjectByCode(code);
    project.status = status;
    await this.projectsRepository.save(project);
    return project;
  }

  // async update(code: number, updateProjectDto: UpdateProjectDto) {
  //   const project = await this.projectsRepository.findOneBy({ code });
  //   project.stage = updateProjectDto.stage;
  //   project.status = updateProjectDto.status;
  //   project.detail = updateProjectDto.detail;
  //   await this.projectsRepository.save(project);
  // }

  async deleteProject(code: number) {
    const result = await this.projectsRepository.delete(code);
    if (result.affected === 0) {
      throw new NotFoundException(`Project with Code "${code}" not found`);
    }
  }

  currentTime() {
    return Date.now() / 1000;
  }

  extractProjectTitle(inputText: string) {
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
    // console.log(result);
    return result;
  }

  extractProjectInstructors(text: string) {
    const emailStartDelimiter = "Email1: ";
    const cbhdStartDelimiter = "CBHD1: ";

    const emailStartIndex = text.indexOf(emailStartDelimiter);
    const cbhdStartIndex = text.indexOf(cbhdStartDelimiter);

    let emailEndIndex = text.indexOf(
      "\n",
      emailStartIndex + emailStartDelimiter.length
    );
    if (emailEndIndex === -1) {
      emailEndIndex = text.length;
    }

    let cbhdEndIndex = text.indexOf(
      "\n",
      cbhdStartIndex + cbhdStartDelimiter.length
    );
    if (cbhdEndIndex === -1) {
      cbhdEndIndex = text.length;
    }

    const emailContent = text
      .substring(emailStartIndex + emailStartDelimiter.length, emailEndIndex)
      .trim();
    const cbhdContent = text
      .substring(cbhdStartIndex + cbhdStartDelimiter.length, cbhdEndIndex)
      .trim();

    // Log the extracted content
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

    // console.log(result);
    return {
      instructors: instructors,
      emails: emails,
    };
  }

  extractMajor(inputText: string) {
    let regexPattern = /Ngành:[^\n]*/;
    let match = inputText.match(regexPattern);
    let extractedText = match ? match[0].trim() : null;
    // Match the strings after ✔ and before ☐ or endline character
    regexPattern = /✔\s*([^☐\n]+)/g;
    extractedText = extractedText.match(regexPattern)[0].replace("✔", "").trim();

    // console.log(extractedText);
    return {
      major: extractedText,
    };
  }

  extractBranch(inputText: string) {
    let regexPattern = /Chương trình đào tạo:[^\n]*/;
    let match = inputText.match(regexPattern);
    let extractedText = match ? match[0].trim() : null;
    // Match the strings after ✔ and before ☐ or endline character
    regexPattern = /✔\s*([^☐\n]+)/g;
    extractedText = extractedText.match(regexPattern)[0].replace("✔", "").trim();

    // console.log(extractedText);
    return {
      branch: extractedText,
    };
  }

  extractNumberOfParticipants(inputText: string) {
    const regexPattern = /Số lượng sinh viên thực hiện:\s*(\d+)/;
    const match = inputText.match(regexPattern);

    // Extract the matched number
    const numberOfParticipants = match ? parseInt(match[1], 10) : null;
    // console.log(numberOfParticipants);
    return {
      numberOfParticipants: numberOfParticipants,
    };
  }

  extractParticipants(inputText: string) {
    const regexPattern = /([^\n]+)\s*-\s*(\d+)(?=[\s\S]*Description)/g;
    const matches = [...inputText.matchAll(regexPattern)];

    const studentInfo = matches.map((match) => ({
      name: match[1].trim(),
      studentID: match[2],
    }));

    // console.log(studentInfo);
    return {
      pariticipants: studentInfo,
    };
  }

  extractInfo(inputText, type, startString, endString) {
    const regexPattern = new RegExp(`${startString}([\\s\\S]*?)${endString}`);
    const match = inputText.match(regexPattern);
    const extractedText = match && match[1] ? match[1].trim() : null;

    // console.log(extractedText);
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
    }
  }

  extractProject(filepath) {
    let path = "../../";
    console.log(path + filepath);
    mammoth
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
        console.log(project)
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
