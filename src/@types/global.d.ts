import { EnvType } from '../shared/config/env.config';

declare global {
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface ProcessEnv extends EnvType {}
  }

  export type Maybe<T> = T | null | undefined;

  export type Value = string | number | symbol;

  export type LooseAutoComplete<T extends Value> = T | Omit<Value, T>;
}
