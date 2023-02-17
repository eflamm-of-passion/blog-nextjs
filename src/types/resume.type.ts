export type ResumeData = {
  brief: string[];
  contactDetails: ContactDetailsData;
  languages: Language[];
  introduction: string;
  experiences: ExperienceData[];
  volunteering: ExperienceData[];
  education: EducationData[];
};

export type ContactDetailsData = {
  firstName: string;
  lastName: string;
  mail: string;
  phone: string;
  city: string;
  age: string;
  driverLicense: string;
  linkedin: string;
  github: string;
  blog: string;
};

export type ExperienceData = {
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  startDate: string;
  endDate: string;
  duration: string;
  description: MissionData;
};

export type MissionData = {
  summary: string;
  tasks: string[];
  projects?: ProjectData[];
  stack?: string;
};

export type ProjectData = {
  summary: string;
  tasks: string[];
};

export type EducationData = {
  title: string;
  institution: string;
  startYear: string;
  endYear: string;
};

export type Language = {
  language: string;
  level: string;
};
