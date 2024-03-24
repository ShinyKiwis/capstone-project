import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './entities/project.entity';
import { ProjectsRepository } from './projects.repository';
import { ProjectStatus } from './project-status.enum';
import { GetProjectsFilterDto } from './dto/get-projects-filter.dto';
var mammoth = require('mammoth');
import { UpdateProjectDto } from './dto/update-project.dto';
import { GetProjectsByStatusDto } from './dto/get-projects-by-status.dto';
import { ApproveProjectDto } from './dto/approve-project.dto';
import { RejectProjectDto } from './dto/reject-project.dto';
import { ApproveProjectsDto } from './dto/approve-projects.dto';
import { join } from 'path';
import { createWriteStream, unlink } from 'fs';
import { CreateProjectFromFileDto } from './dto/create-project-from-file.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly projectsRepository: ProjectsRepository) {}

  async createProject(createProjectDto: CreateProjectDto) {
    return this.projectsRepository.createProject(createProjectDto);
  }

  async getProjects(filterDto: GetProjectsFilterDto) {
    return this.projectsRepository.getProjects(filterDto);
  }

  async getProjectByCode(code: number) {
    return this.projectsRepository.getProjectByCode(code);
  }

  async approveAProject(approveProjectDto: ApproveProjectDto) {
    return this.projectsRepository.approveProject(approveProjectDto);
  }

  async rejectAProject(rejectProjectDto: RejectProjectDto) {
    return this.projectsRepository.rejectProject(rejectProjectDto);
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

  async approveProjects(approveProjectsDto: ApproveProjectsDto) {
    return this.projectsRepository.approveProjects(approveProjectsDto);
  }

  async deleteProject(code: number) {
    const result = await this.projectsRepository.delete(code);
    if (result.affected === 0) {
      throw new NotFoundException(`Project with Code "${code}" not found`);
    }
  }

  async updateAProject(id: number, updateProjectDto: UpdateProjectDto) {
    return this.projectsRepository.updateAProject(id, updateProjectDto);
  }

  async getProjectsByStatus(getProjectsByStatusDto: GetProjectsByStatusDto) {
    return this.projectsRepository.getProjectsByStatus(getProjectsByStatusDto);
  }

  currentTime() {
    return Date.now() / 1000;
  }

  extractProjectName(inputText: string) {
    console.log(inputText);
    const startString = 'Project name:';
    const endString = 'Instructor1';
    const regexPattern = new RegExp(`${startString}([\\s\\S]*?)${endString}`);
    const match = inputText.match(regexPattern);
    let extractedText = match && match[1] ? match[1].trim() : null;
    extractedText = extractedText.replace('\n', '');
    // let resultExtractedText = extractedText.split(':').map((text) => {
    //   return text.trim();
    // });

    let result = { name: extractedText.trim() };
    // console.log(result);
    return result;
  }

  extractProjectInstructors(text: string) {
    const emailStartDelimiter = 'Email1: ';
    const instructorStartDelimiter = 'Instructor1: ';

    const emailStartIndex = text.indexOf(emailStartDelimiter);
    const instructorStartIndex = text.indexOf(instructorStartDelimiter);

    let emailEndIndex = text.indexOf(
      '\n',
      emailStartIndex + emailStartDelimiter.length,
    );
    if (emailEndIndex === -1) {
      emailEndIndex = text.length;
    }

    let instructorEndIndex = text.indexOf(
      '\n',
      instructorStartIndex + instructorStartDelimiter.length,
    );
    if (instructorEndIndex === -1) {
      instructorEndIndex = text.length;
    }

    const emailContent = text
      .substring(emailStartIndex + emailStartDelimiter.length, emailEndIndex)
      .trim();
    const instructorContent = text
      .substring(
        instructorStartIndex + instructorStartDelimiter.length,
        instructorEndIndex,
      )
      .trim();

    // Log the extracted content
    let resultArray = instructorContent
      .replace(/(Instructor\d*)/g, '')
      .split(':')
      .map((item) => item.trim());
    const instructors = {};
    for (let i = 0; i < resultArray.length; i++) {
      instructors[`Instructor${i + 1}:`] = resultArray[i];
    }
    resultArray = emailContent
      .replace(/(Email\d*)/g, '')
      .split(':')
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

  extractProgram(inputText: string) {
    let regexPattern = /Program:[^\n]*/;
    let match = inputText.match(regexPattern);
    let extractedText = match ? match[0].trim() : null;
    // Match the strings after ✔ and before ☐ or endline character
    regexPattern = /✔\s*([^☐\n]+)/g;
    extractedText = extractedText
      .match(regexPattern)[0]
      .replace('✔', '')
      .trim();

    // console.log(extractedText);
    return {
      program: extractedText,
    };
  }

  extractBranch(inputText: string) {
    let regexPattern = /Branch:[^\n]*/;
    let match = inputText.match(regexPattern);
    let extractedText = match ? match[0].trim() : null;
    // Match the strings after ✔ and before ☐ or endline character
    regexPattern = /✔\s*([^☐\n]+)/g;
    extractedText = extractedText
      .match(regexPattern)[0]
      .replace('✔', '')
      .trim();

    // console.log(extractedText);
    return {
      branch: extractedText,
    };
  }

  extractNumberOfStudents(inputText: string) {
    const regexPattern = /Number of students:\s*(\d+)/;
    const match = inputText.match(regexPattern);

    // Extract the matched number
    const numberOfStudents = match ? parseInt(match[1], 10) : null;
    // console.log(numberOfParticipants);
    return {
      numberOfStudents: numberOfStudents,
    };
  }

  extractStudents(inputText: string) {
    const regexPattern = /([^\n]+)\s*-\s*(\d+)(?=[\s\S]*Description)/g;
    const matches = [...inputText.matchAll(regexPattern)];

    const studentInfo = matches.map((match) => ({
      name: match[1].trim(),
      studentID: match[2],
    }));

    // console.log(studentInfo);
    return {
      students: studentInfo,
    };
  }

  extractDescription(inputText) {
    const regexPattern = new RegExp(`Description:([\\s\\S]*?)Task/Mission`);
    const match = inputText.match(regexPattern);
    const extractedText = match && match[1] ? match[1].trim() : null;

    // console.log(extractedText);
    return {
      description: extractedText,
    };
  }

  extractTask(inputText) {
    const regexPattern = new RegExp(`Task/Mission([\\s\\S]*?)References`);
    const match = inputText.match(regexPattern);
    const extractedText = match && match[1] ? match[1].trim() : null;

    // console.log(extractedText);
    return {
      task: extractedText,
    };
  }

  extractRefs(inputText) {
    const startString = 'References:';
    const regexPattern = new RegExp(`${startString}([\\s\\S]*)`);
    const match = inputText.match(regexPattern);
    const extractedText = match && match[1] ? match[1].trim() : null;

    return {
      references: extractedText,
    };
  }

  async extractProject(filepath) {
    let path = './../../';
    try {
      let result = await mammoth.extractRawText({ path: filepath });
      let text = result.value;
      let startTime = this.currentTime();

      let extractedName = this.extractProjectName(text);
      let extractedInstructors = this.extractProjectInstructors(text);
      let extractedProgram = this.extractProgram(text);
      let extractedBranch = this.extractBranch(text);
      let extractedNumberOfStudents = this.extractNumberOfStudents(text);
      let extractedStudents = this.extractStudents(text);
      let extractedDescription = this.extractDescription(text);
      let extractedTask = this.extractTask(text);
      let extractedReferences = this.extractRefs(text);

      let project: CreateProjectFromFileDto = {
        name: extractedName.name,
        instructors: extractedInstructors.instructors,
        emails: extractedInstructors.emails,
        program: extractedProgram.program,
        branch: extractedBranch.branch,
        limit: extractedNumberOfStudents.numberOfStudents,
        students: extractedStudents.students,
        description: extractedDescription.description,
        tasks: extractedTask.task,
        references: extractedReferences.references,
      };
      // project = { ...project, ...this.extractProjectName(text) };
      // project = { ...project, ...this.extractProjectInstructors(text) };
      // project = { ...project, ...this.extractProgram(text) };
      // project = { ...project, ...this.extractBranch(text) };
      // project = { ...project, ...this.extractNumberOfStudents(text) };
      // project = { ...project, ...this.extractStudents(text) };
      // project = {
      //   ...project,
      //   ...this.extractInfo(
      //     text,
      //     'description',
      //     'Description:',
      //     'Task/Mission',
      //   ),
      // };
      // project = {
      //   ...project,
      //   ...this.extractInfo(text, 'task', 'Task/Mission', 'References'),
      // };
      // project = { ...project, ...this.extractRefs(text) };
      console.log(project);
      // this.projectsRepository.createProject({
      //   name: project.title,
      //   description: project.description,
      // })
      this.projectsRepository.createProjectFromFile(project);
    } catch (error) {
      // console.log(error);
      throw error;
    }
    // console.log('hahahhihihih')
  }
  // async processProjectFile(file: Express.Multer.File) {
  //   const uploadFileName = file.filename;
  //   const uploadDir = '../../uploads/';
  //   const uploadFilePath = join(uploadDir, uploadFileName);
  //   await this.saveFile(file.buffer, uploadFileName);
  //   console.log(uploadFilePath);
  //   this.extractProject(uploadFilePath);
  //   await this.deleteFile(uploadFilePath);
  // }

  // private saveFile(fileBuffer: Buffer, filePath: string): Promise<void> {
  //   return new Promise((resolve, reject) => {
  //     const writeStream = createWriteStream(filePath);
  //     writeStream.write(fileBuffer);
  //     writeStream.end();

  //     writeStream.on('finish', () => resolve());
  //     writeStream.on('error', (error) => reject(error));
  //   });
  // }

  // private deleteFile(filePath: string): Promise<void> {
  //   return new Promise((resolve, reject) => {
  //     unlink(filePath, (error) => {
  //       if (error) {
  //         reject(error);
  //       } else {
  //         resolve();
  //       }
  //     });
  //   });
  // }
}
