import { Request, Response } from 'express';

function returnSucess(
  res: Response,
  session: string,
  phone: string | null,
  data?: any
) {
  res.status(201).json({
    status: 'Success',
    response: {
      message: 'Information retrieved successfully.',
      contact: phone,
      session: session,
      data: data,
    },
  });
}

function returnError(
  req: Request,
  res: Response,
  session: string,
  error?: any
) {
  req.logger.error(error);
  res.status(400).json({
    status: 'Error',
    response: {
      message: 'Error retrieving information',
      session: session,
      log: error,
    },
  });
}

export async function getBusinessProfilesProducts(req: Request, res: Response) {
  const session = req.session;
  const { phone } = req.body;

  try {
    const results: any = [];

    for (const contato of phone) {
      results.push(await req.client.getBusinessProfilesProducts(contato));
    }

    returnSucess(res, session, phone, results);
  } catch (error) {
    returnError(req, res, session, error);
  }
}
export async function getOrderbyMsg(req: Request, res: Response) {
  const session = req.session;
  const { messageId } = req.body;

  try {
    const result = await req.client.getOrderbyMsg(messageId);

    returnSucess(res, session, null, result);
  } catch (error) {
    returnError(req, res, session, error);
  }
}
