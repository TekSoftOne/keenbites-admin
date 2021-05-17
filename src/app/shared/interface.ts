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

export interface RequestQuery {
    clientId?: number;
    expertId?: number;
    status?: string[];
    pageSkip?: number;
    pageTake?: number;
    expiredDate?: number;
}

export interface RequestQueryResult {
    items: RequestQueryResultItem[];
    totalItems: number;
    at: Date;
}

export type RequestQueryResultItem = {
    id: number;
    question: string;
    user: UserResult;
    requestStatus: RequestStatusResult;
    isAnonymous: true;
    answerer: ProfileDetail;
    language: Language;
    price: number;
    answer?: AnswerItemResult;
    createdAt: Date;
    updatedAt: Date;
    purchase: PurchaseResult;
};

export type AnsweredQueryResultItem = AnswerDetail;

export interface AnsweredQueryResult {
    items: AnsweredQueryResultItem[];
    totalItems: number;
    at: Date;
}

export type AnswerDetail = {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    rate: number | null;
    request: RequestOfAnswerResult;
    dispute: DisputeResult;
    media?: MediaItemResult;
    user?: UserResult;
    noOfBuy?: number;
};

export type RequestOfAnswerResult = {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    question: string;
    isAnonymous: boolean;
    price: number;
    user: UserResult;
    language: Language;
    answerer: ProfileResult;
    answer: AnswerDetail;
};

export interface AnsweredQuery {
    question?: string;
    languageProficency?: string[];
    profileType?: string;
    userId?: number;
    requestId?: number;
    answererId?: number;
    pageSkip?: number;
    pageTake?: number;
    pricePerQuestionMin?: number;
    pricePerQuestionMax?: number;
    showOnlyDisputed?: boolean;
    status?: string[];
    includeLibrary?: boolean;
    ownerIdCheck?: number;
    includeBlacklisted?: boolean;
}

export interface Language {
    name: string;
    id: number;
}

export interface AnswerItemResult {
    id: number;
    media: MediaItemResult;
    rate: 0;
    dispute?: DisputeResult;
}
export type ToogleBlacklistStatus = {
    id: number | undefined;
    isBlacklisted: boolean | undefined;
};

export interface PurchaseResult {
    requestId: number;
    orderRef: string;
    customerId?: string;
    amount: number;
    currency: string;
    billingAddress: BillingAddressForm | null;
}
export interface BillingAddressForm {
    address: string;
    state: string;
    city: string;
    country: string;
    postcode: string;
    constactNumber: string;
}

export interface DisputeResult {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    reason: string;
}

export interface MediaItemResult {
    id: number;
    language: Language;
    link: string;
    description: string;
    isKeptInLibrary: boolean;
    isBlacklisted: boolean;
    deviceLocation: string;
    uploaded: boolean;
    answerRate?: AnswerRateResult;
    answers?: AnswerResultShorten[];
    createdAt: Date;
    updatedAt: Date;
}

export interface AnswerResultShorten {
    id: number;
    user: UserResult;
}

export type AnswerRateResult = {
    id: number;
    averageRate: number;
    numberOfPurchases: number;
};

export interface UserResult {
    id: number;
    auth0Id: string;
    purchaseInformation: PurchaseInformation;
    roles: Role[];
    questionerClient: ClientResult;
    questionerExpert: ProfileResult;
}

export interface ProfileResult extends ProfileDetail {}

export interface PurchaseInformation {
    id: number;
    address: string;
    state: string;
    city: string;
    postcode: string;
    country: string;
    contactNumber: string;
}

export interface ClientResult {
    user: UserResult;
    aboutMe: string;
    name: string;
    title: string;
    profilePictureLink: string;
    deletedAt: Date | null;
}

export type ProfileDetail = {
    id: number;
    languages: Language[];
    subjects: Subject[];
    profileType: ProfileType;
    deletedAt: Date;
    name: string;
    title: string;
    price: number;
    isPayWhatYouWant: boolean;
    introVideoLink: string;
    profilePictureLink: string;
    profileId: string;
    headLine: string;
    aboutMe: string;
    facebook: string;
    linkedIn: string;
    instagram: string;
    youTube: string;
    at: string;
    numberOfPurchases: number | null;
    averageRate: number | null;
    introductoryMessage: 'string';
};

export interface RefundStatus {
    status?: string;
    failureReason?: string;
}

export enum RequestStatusType {
    requested = 'requested',
    expired = 'expired',
    answered = 'answered',
    cancelled = 'cancelled',
    declined = 'declined',
}

export enum RefundStatuses {
    pending = 'pending',
    succeeded = 'succeeded',
    failed = 'failed',
}

export interface RequestItemResult {
    id: number;
    question: string;
    user: UserResult;
    requestStatus: RequestStatusResult;
    isAnonymous: true;
    answerer: ProfileDetail;
    language: Language;
    price: number;
    answer?: AnswerItemResult;
    createdAt: Date;
    updatedAt: Date;
    purchase: PurchaseResult;
}

export interface Subject {
    name: string;
    id: number;
}
export interface ProfileType {
    name: string;
    id: number;
}
export interface RequestStatusResult {
    name: string;
    id: number;
}
