import { EducationInstitutionAttributes } from "../../models/education_institution";
export interface BaseEducationInstitutionAttributes
  extends EducationInstitutionAttributes {
  id: number;
}

interface UniversityAttributes extends BaseEducationInstitutionAttributes {
  education_institution_id: number;
}

interface SchoolAttributes extends BaseEducationInstitutionAttributes {
  education_institution_id: number;
}

interface DiplomaAttributes extends BaseEducationInstitutionAttributes {
  education_institution_id: number;
}

export { UniversityAttributes, SchoolAttributes, DiplomaAttributes };
