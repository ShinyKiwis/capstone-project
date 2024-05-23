import { IsNotEmpty } from "class-validator";
import { CreateAssessmentRecordDto } from "./create-assessment-record.dto";

export class CreateAssessmentRecordsDto {
  records: CreateAssessmentRecordDto[];
}