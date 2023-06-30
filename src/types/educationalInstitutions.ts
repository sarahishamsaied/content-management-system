import { EducationInstitutionAttributes } from "../../models/education_institution";

interface UniversityAttributes extends EducationInstitutionAttributes {}

interface SchoolAttributes extends EducationInstitutionAttributes {}

interface DiplomaAttributes extends EducationInstitutionAttributes {}

export { UniversityAttributes, SchoolAttributes, DiplomaAttributes };
