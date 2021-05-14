export interface User {
    name: string;
    email: string;
    role: Role;
    auth0Id: string;
    id?: number | undefined;
    email_verified: boolean;
    expertId?: number | undefined;
    token?: string;
    profilePictureLink: string | undefined;
}

export interface Role {
    name: string;
}

export interface KBError {
    response: ErrorResponse;
}

export interface KBErrorTimeout {
    response: string;
}

export interface ErrorResponse {
    data: ErrorResponseData;
}

export interface ErrorResponseData {
    error: string;
    message: string;
    statusCode: number;
}

export type SiteSettingStatus = {
    value: string;
    isValid: boolean;
};

export type SettingsComponentResult = {
    max_time_to_answer_hrs: number;
    answer_repurchase_rate: number;
    commission_rate: number;
    max_answer_size_mins: number;
};

export type SettingsComponentForm = {
    max_time_to_answer_hrs: number;
    answer_repurchase_rate: number;
    commission_rate: number;
    max_answer_size_mins: number;
};

export type SettingsComponentProps = {
    data: SettingsComponentResult;
};
