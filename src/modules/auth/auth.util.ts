import { Credential } from '@generated/prisma';
import { Request } from 'express';

export type TCredential = Omit<Credential, 'password'>;

export type TAuthGuardRequest = Request & { credential: TCredential };

export function setCredentialToRequest(req: Request, credential: TCredential) {
  const newReq = req as TAuthGuardRequest;
  newReq.credential = credential;
}

export function getCredentialFromRequest(req: Request): TCredential {
  const authReq = req as TAuthGuardRequest;
  return authReq.credential;
}
