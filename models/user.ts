import { IMicroserviceApiError } from "../shared/api/microserviceApi";

export interface IUserLoginResult {
    error?: string
    resendWelcomeEmailToken?: string
    success: boolean
}

export interface ILoginResult {
    accessToken: string
    refreshToken: string
    isEmailConfirmed: string
    resendWelcomeEmailToken: string,
    errors: IMicroserviceApiError[],
    defaultCountry: string | null,
    defaultCurrency: string | null,
}

export interface IUserAddress {
    id: number,
    isDefault: boolean,
    contactName: string,
    addressLine1: string,
    addressLine2: string,
    addressLine3: string,
    city: string,
    county: string,
    postCode: string,
    countryId: number,
    countryName: string,
    phone: string
}

export interface IRegistrationResult {
    resendWelcomeEmailToken: string
    accessToken: string
    refreshToken: string
    errors: IMicroserviceApiError[]
}

export interface IUserRegister {
    identityEmail: string
    displayName: string
    firstName: string
    lastName: string
    password: string
    newsletter: boolean
    wishlist: number[]
}