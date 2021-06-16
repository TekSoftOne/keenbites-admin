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
    id: number;
    max_time_to_answer_hrs: number;
    answer_repurchase_rate: number;
    commission_rate: number;
    max_answer_size_mins: number;
    createdAt: Date;
};

export type SettingsComponentForm = {
    id: number;
    max_time_to_answer_hrs: number;
    answer_repurchase_rate: number;
    commission_rate: number;
    max_answer_size_mins: number;
};

export type SettingsComponentProps = {
    data: SettingsComponentResult;
    updatedEmit: (uniqueId: string) => void;
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
    onlyFirstBuy?: boolean;
    requestId?: number;
    answererId?: number;
    pageSkip?: number;
    pageTake?: number;
    pricePerQuestionMin?: number;
    pricePerQuestionMax?: number;
    showOnlyDisputed?: boolean;
    status?: RequestStatus[];
    disputeStatus?: DisputeStatus[];
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
export type ToogleStatus = {
    id: number | undefined;
    isTrue: boolean | undefined;
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
    disputeStatus: DisputeStatusItem;
}

export interface DisputeStatusItem {
    name: DisputeStatus;
    id: number;
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
    isMarketPlace: boolean;
    isBlacklisted: boolean;
};

export interface RefundStatus {
    status?: string;
    failureReason?: string;
}

export type RequestStatus = ResponseStatus;

export type ResponseStatus =
    | 'requested'
    | 'expired'
    | 'answered'
    | 'cancelled'
    | 'declined';

export type DisputeStatus = 'ongoing' | 'refunded' | 'rejected';

export enum DisputeStatusType {
    ongoing = 'ongoing',
    refunded = 'refunded',
    rejected = 'rejected',
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

export interface ProfilesQuery {
    search?: string;
    isFeatured?: boolean;
    languageProficency?: string[];
    profileType?: string;
    profileId?: string;
    pageSkip?: number;
    pageTake?: number;
    pricePerQuestionMin?: number;
    pricePerQuestionMax?: number;
    reducePriceRate?: number;
    includeUnmarketPlace?: boolean;
    includeBlacklisted?: boolean;
}
export type ProfileQueryResultItem = ProfileDetail;
export interface ProfileQueryResult {
    items: ProfileQueryResultItem[];
    totalItems: number;
}

export type AudioPlayerProps = {
    url: string;
};

export interface WindowSize {
    innerWidth: number;
    innerHeight: number;
}

export type MediaPlayerState = {
    playing: boolean;
    seeking: boolean;
    played: number;
    loaded: number;
    loadedSeconds: number;
    playedSeconds: number;
    volume: number;
    muted: boolean;
};

export type MediaProgressState = {
    played: number;
    loaded: number;
    loadedSeconds: number;
    playedSeconds: number;
};

export type PurchaseType = 'paid' | 'refunded';

export interface PurchaseForDisputeResultList {
    items: PurchaseForDisputeResultItem[];
    at: Date;
    totalItems: number;
}

export interface PurchaseForDisputeResultItem {
    id: number;
    createdAt: Date;
    amount: number;
    currency: string;
    customerId: string;
    orderRef: string;
    purchaseType: PurchaseType;
    purchaseInformation: any;
    request: PurchaseForDisputeRequestResult;
    client: PurchaseForDisputeClient;
    answer: PurchaseForDisputeAnswer;
}

export interface PurchaseForDisputeRequestResult {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    question: string;
    isAnonymous: boolean;
    price: number;
    user: any;
    answerer: PurchaseForDisputeAnswerer;
}

export interface PurchaseForDisputeAnswerer {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    name: string;
    title: string;
    price: string;
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
    introductoryMessage: string;
    isMarketPlace: boolean;
    isBlacklisted: boolean;
    walletId: string;
}

export interface PurchaseForDisputeClient {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    aboutMe: string;
    name: string;
    title: string;
    profilePictureLink: string;
    deletedAt: Date | undefined;
}

export interface PurchaseForDisputeAnswer {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    rate: number | null;
    noOfBuy: number;
    dispute: PurchaseForDispute;
    media: PurchaseForDisputeAnswerMedia;
}

export interface PurchaseForDisputeAnswerMedia {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    link: string;
    description: string;
    isKeptInLibrary: boolean;
    isBlacklisted: boolean;
    deviceLocation: string;
    uploaded: boolean;
}

export interface PurchaseForDispute {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    reason: string;
    disputeStatus: DisputeStatusItem;
}

export interface ReadyTransferitem {
    userId: number;
    transfered: number;
    amount: number;
    walletId: string;
    userName: string;
}

export interface TransferForm {
    amount: number;
    currency: string;
    connectId: string;
}

export interface TransferResult {
    id: string; //'tr_1J2yKrK3TH7oyRSDw5WZoVTA';
    object: string; //'transfer';
    amount: number;
    amount_reversed: number;
    balance_transaction: string; //'txn_1J2yKrK3TH7oyRSDAWAR1vii';
    created: number; //Unix datetime
    currency: string; //usd
    description: null | string;
    destination: string; //'acct_1J1UKF2f9bS1YLHE';
    destination_payment: string; //'py_1J2yKr2f9bS1YLHEMGflmBnW';
    livemode: boolean;
    metadata: any; //{}
    reversals: any;
    reversed: boolean;
    source_transaction: null | any;
    source_type: string; //'card';
    transfer_group: null | any;
}
