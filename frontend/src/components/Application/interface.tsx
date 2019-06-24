// Interface storing Application Form Informations
export interface IApplicationForm {
  // Personal Informations
  nameFirst: string;
  nameLast: string;
  sex: string;
  birthDate: string;
  nationality: string;
  school: string;
  major: string;

  // Contact
  phoneNumber: string;
  notificationEmail: string;
  recommender: string;

  essayTopic: string;
  essay: string;
  essayWordCount: number;

  // Agreements, supports, and other optional stuffs
  groupState: boolean;
  groupName: string;
  provisionAgreement: boolean;
  visaSupport: boolean;
  financialAid: boolean;
  financialAidEssay: string;
  dormUse: boolean;
  prevParticipation: boolean;

  channel: string;
  otherChannel: string;

  paymentCheck: boolean;

  // Form maintainence
  lastUpdate: string;
}

// Interface storing Apllication Component State
export interface IApplicationState {
}

export interface IApplicationOptions {
    countries: JSX.Element[];
    genders: JSX.Element[];
    channels: JSX.Element[];
}