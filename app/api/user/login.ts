import { ILoginResult } from '../../../models/user';
import type { NextApiResponse, NextApiRequest } from 'next'
import userData from '../../../shared/data/userData';
import { IMicroserviceApiResult } from '../../../shared/api/microserviceApi';

export default async function handler(
    _req: NextApiRequest,
    res: NextApiResponse<IMicroserviceApiResult<ILoginResult>>
) {
    let result = await userData.loginAsync(_req.body.userName as string, _req.body.password as string)
    res.status(result.statusCode).json(result)
}