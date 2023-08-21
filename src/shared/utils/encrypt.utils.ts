/* eslint-disable @typescript-eslint/no-namespace */
import { MD5, TripleDES, enc } from 'crypto-js';

export interface IAuthenticatedUser {
  user: {
    user_id: string;
    email: string;
  };
}

export namespace Authenticate {
  export interface IAuthToken {
    id: string;
    email: string;
  }
  export interface IAuthenticatedUser {
    user: IAuthToken;
  }
}

export const encryptUtils = {
  encrypt: (data: Authenticate.IAuthToken, token: string): string => {
    const key = MD5(token).toString();
    const payload = TripleDES.encrypt(JSON.stringify(data), key).toString();
    return payload;
  },

  decrypt: (
    data: string,
    token: string,
  ): Authenticate.IAuthenticatedUser['user'] => {
    const key = MD5(token).toString();
    const payload = TripleDES.decrypt(data, key).toString(enc.Utf8);
    return JSON.parse(payload);
  },
};
