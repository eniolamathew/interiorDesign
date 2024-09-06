
export interface INextJsApiError{
    property: string | undefined
    errors: string[]
}

export interface INextJsApiExption {
    errors: INextJsApiError[]
    payload: any
}

class NextJsApi {
    async processAsync<T>(method: string, targetApiUrl: string, body: object | undefined | string, headers: any, extractPayload: boolean = true): Promise<T> {
        var result = await fetch(targetApiUrl, {
            method: method,
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin', headers: {
                'Content-Type': 'application/json',
                ...headers
            },
            body: JSON.stringify(body)
        })
        
        let json = await result.json();
        if (result.status == 400) {
            console.log("NextJsApi targetApiUrl : "+JSON.stringify(json))
            throw json
        }
        if (result.status == 200) {
            let payload = json as T
            if(extractPayload){
                return (payload as any).payload
            }
            return (payload as any)
        }
        if (result.status == 401) {
            throw { errors: json.errors, payload: json.payload } as INextJsApiExption
        }

        throw `Api Post failed ${result.status} ${targetApiUrl} ${await result.text()}`
    }

    async postAsync<T>(targetApiUrl: string, body: any = undefined, headers: any = undefined, extractPayload: boolean = true): Promise<T> {
        return await this.processAsync<T>("POST", targetApiUrl, body, headers, extractPayload);
    }

    async deleteAsync<T>(targetApiUrl: string, body: any = undefined, headers: any = undefined, extractPayload: boolean = true): Promise<T> {
        return await this.processAsync<T>("DELETE", targetApiUrl, body, headers, extractPayload);
    }

    async putAsync<T>(targetApiUrl: string, body: any= undefined, headers: any = undefined, extractPayload: boolean = true): Promise<T> {
        return await this.processAsync<T>("PUT", targetApiUrl, body, headers, extractPayload);
    }

    async getAsync<T>(targetApiUrl: string, body: any = undefined, headers: any = undefined, extractPayload: boolean = true): Promise<T> {
        return (await this.processAsync<T>("GET", targetApiUrl, body, headers, extractPayload));
    }

}

export default new NextJsApi()