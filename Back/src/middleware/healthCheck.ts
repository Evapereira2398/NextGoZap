import { Request, Response } from 'express';

export async function healthz(req: Request, res: Response) {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
  };
  try {
    res.status(200).send(healthcheck);
  } catch (e: any) {
    healthcheck.message = e;
    res.status(503).send();
  }
}

export async function unhealthy(req: Request, res: Response) {
  res.status(503).send();
  process.exit();
}
