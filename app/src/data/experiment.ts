export type ExperimentKind =
  | 'axiom_theorem'
  | 'conjecture_open'
  | 'conjecture_proven';

export type GradeBand = 'primary' | 'middle' | 'high';

export type ReviewStatus = 'unreviewed' | 'in_review' | 'verified';

export interface ExperimentSource {
  readonly label: string;
  readonly url: string;
  readonly kind: 'primary' | 'reference';
}

export interface EducationMetadata {
  readonly gradeBands: readonly GradeBand[];
  readonly learningObjectives: readonly string[];
  readonly prerequisites: readonly string[];
  readonly sources: readonly ExperimentSource[];
  readonly reviewStatus: ReviewStatus;
  readonly lastReviewedAt: string | null;
}

export interface ExperimentSummary {
  readonly id: string;
  readonly title: string;
  readonly intro: string;
  readonly category: string;
  readonly kind: ExperimentKind;
  readonly searchAliases: readonly string[];
  readonly stageCount: number;
  readonly pagePath: string;
  readonly education: EducationMetadata;
}

export const EXPERIMENT_KIND_LABELS: Readonly<Record<ExperimentKind, string>> = {
  axiom_theorem: '基础公理 / 定理 / 对象',
  conjecture_open: '尚未证明的猜想',
  conjecture_proven: '已证明的猜想'
};

export const GRADE_BAND_LABELS: Readonly<Record<GradeBand, string>> = {
  primary: '小学',
  middle: '初中',
  high: '高中'
};
