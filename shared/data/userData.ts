import { ILoginResult, IRegistrationResult, IUserRegister } from "../../models/user";
import microserviceApi, { IMicroserviceApiResult } from "../api/microserviceApi"

class UserData {
    _baseUrl = "/escentualcustomer";

    public async loginAsync(userName: string, password: string): Promise<IMicroserviceApiResult<ILoginResult>> {
        let result = await microserviceApi.postAsync<ILoginResult>(this._baseUrl + "/login", { userName: userName, password: password })
        if (result && result.errors && result.errors.length > 0) {
            result.statusCode = 401;
        }
        return result
    }

    public async registerUserAsync(registration: IUserRegister): Promise<IMicroserviceApiResult<IRegistrationResult>> {
        return await microserviceApi.postAsync<ILoginResult>(this._baseUrl + "/register", registration)
    }

    public async completeRegistrationAsync(token: string): Promise<IMicroserviceApiResult<boolean>> {
        return await microserviceApi.postAsync<boolean>(this._baseUrl + "/confirmemail", {}, { Authorization: "Bearer " + token })
    }

    public async resendWelcomeEmailAsync(token: string): Promise<IMicroserviceApiResult<boolean>> {
        return await microserviceApi.postAsync<boolean>(this._baseUrl + "/resendwelcomeemail", undefined, { Authorization: "Bearer " + token })
    }

    public async requestPasswordResetAsync(email: string): Promise<IMicroserviceApiResult<boolean>> {
        return await microserviceApi.postAsync<boolean>(this._baseUrl + "/requestpasswordreset", { email: email })
    }
}

export default new UserData();