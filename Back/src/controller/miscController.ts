import { Request, Response } from 'express';
import fs from 'fs';
import { logger } from '..';
import config from '../config';
import { backupSessions, restoreSessions } from '../util/manageSession';
import { clientsArray } from '../util/sessionUtil';

export async function backupAllSessions(req: Request, res: Response) {
  const { secretkey } = req.params;

  if (secretkey !== config.secretKey) {
    return res.status(400).json({
      response: 'error',
      message: 'The token is incorrect',
    });
  }

  try {
    res.setHeader('Content-Type', 'application/zip');
    return res.send(await backupSessions(req));
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: 'Error on backup session',
      error: error,
    });
  }
}

export async function restoreAllSessions(req: Request, res: Response) {
  const { secretkey } = req.params;

  if (secretkey !== config.secretKey) {
    return res.status(400).json({
      response: 'error',
      message: 'The token is incorrect',
    });
  }

  try {
    const result = await restoreSessions(req, req.file as any);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json({
      status: false,
      message: 'Error on restore session',
      error: error,
    });
  }
}

export async function takeScreenshot(req: Request, res: Response) {
  try {
    const result = await req.client.takeScreenshot();
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json({
      status: false,
      message: 'Error on take screenshot',
      error: error,
    });
  }
}

export async function clearSessionData(req: Request, res: Response) {
  try {
    const { secretkey, session } = req.params;

    if (secretkey !== config.secretKey) {
      return res.status(400).json({
        response: 'error',
        message: 'The token is incorrect',
      });
    }
    if (req?.client?.page) {
      delete clientsArray[req.params.session];
      await req.client.logout();
    }
    const path = config.customUserDataDir + session;
    const pathToken = __dirname + `../../../tokens/${session}.data.json`;
    if (fs.existsSync(path)) {
      await fs.promises.rm(path, {
        recursive: true,
      });
    }
    if (fs.existsSync(pathToken)) {
      await fs.promises.rm(pathToken);
    }
    return res.status(200).json({ success: true });
  } catch (error: any) {
    logger.error(error);
    return res.status(500).json({
      status: false,
      message: 'Error on clear session data',
      error: error,
    });
  }
}

export async function setLimit(req: Request, res: Response) {
  try {
    const { type, value } = req.body;
    if (!type || !value) throw new Error('Send de type and value');

    const result = await req.client.setLimit(type, value);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(500).json({
      status: false,
      message: 'Error on set limit',
      error: error,
    });
  }
}
