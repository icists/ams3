import { ValueType } from 'react-select/lib/types';

export enum Sex { Male, Female, Other };

// Interface storing Application Form Informations
export interface IApplicationForm {
    // Personal Informations
    nameFirst: string;
    nameLast: string;
    sex?: Sex;
    birthDate?: string;
    nationality?: ValueType<JSX.Element>;
    school: ValueType<{
        value: string;
        label: string;
    }>;
    major: string;

    // Contact
    phoneNumber: string;
    notificationEmail: string;

    essay: string;

    // Agreements, supports, and other optional stuffs
    groupState: boolean;
    groupName: string;
    provisionAgreement: boolean;
    visaSupport: boolean;
    financialAid: boolean;
    prevParticipation: boolean;

    channel: string;
    otherChannel: string;

    paymentCheck: boolean;

    // Form maintainence
    lastUpdate: string | undefined;
}

// Interface storing Apllication Component State
export interface IApplicationState {
    ableToSave: boolean;
}

export interface IApplicationOptions {
    countries: JSX.Element[];
    schools: Array<{
        value: string;
        label: string;
    }>;
    genders: JSX.Element[];
    channels: JSX.Element[];
    ages: JSX.Element[];
}