import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AssessmentScheme } from "./assessment-scheme.entity";
import { PerformanceIndicator } from "./performance-indicator.entity";

@Entity()
export class AssessmentSchemeToPerformanceIndicator {
  @PrimaryGeneratedColumn()
  public assessmentSchemeToPerformanceIndicatorId: number;

  @Column()
  passingGoal: number;

  @ManyToOne(() => AssessmentScheme, { onDelete: 'CASCADE' })
  assessmentScheme: AssessmentScheme;

  @ManyToOne(() => PerformanceIndicator, { onDelete: 'CASCADE', eager: true})
  performanceIndicator: PerformanceIndicator;
}