export interface RightsInterface {
    logs?: number;
    jobs?: number;
    users?: number;
    ssh?: number;
    organization?: number;
}
export interface OrganizationInterface {
    id: number;
    name: string;
    created_at: number;
    ownerUserEntityId: number;
}
export interface AuthUserInterface {
    banned_to: number;
    rights: RightsInterface;
    email: string;
    id: number;
    fio: string;
    phone: string;
    orgEntities: OrganizationInterface[];
    orgSelectedId: number;
}

export interface ResultWithMessage<T> {
    message: string;
    result: T;
    error?: string;
}

export interface ConfigInterface {
    API_HOST: string;
    PRODUCTION: boolean;
}
