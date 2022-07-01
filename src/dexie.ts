import { Dexie, Table } from 'dexie';
import JwkEs256k from '@decentralized-identity/ion-sdk/dist/lib/models/JwkEs256k'

import { DidModel, PrivateKeyModel, VcModel } from './helpers/didTools';

// スキーマの修正がある場合、この値を変更する必要あり
const SCHEMA_VERSION = 2

export class SettingsModel {
  key: string;
  value: any;
  constructor(key: string, value: any) {
    this.key = key;
    this.value = value;
  };

  static KEYS = {
    URL_OPERATION: 'URL_OPERATION',
    URL_RESOLVE: 'URL_RESOLVE',
    NEED_CHALLENGE: 'NEED_CHALLENGE',
  }
};

export class DidInfoModel {
  key: string;
  didlong: string;
  signingPrivateKey: JwkEs256k;
  recoveryPrivateKey: JwkEs256k;
  updatePrivateKey: JwkEs256k;
  constructor(
    key: string, 
    didlong: string,
    signingPrivateKey: JwkEs256k,
    recoveryPrivateKey: JwkEs256k,
    updatePrivateKey: JwkEs256k
    ) {
    this.key = key;
    this.didlong = didlong;
    this.signingPrivateKey = signingPrivateKey;
    this.recoveryPrivateKey = recoveryPrivateKey;
    this.updatePrivateKey = updatePrivateKey;
  };

  static KEY = 'KEY';
};

interface IonPwaDatabase extends Dexie {
  settings: Table<SettingsModel, string>;
  did: Table<DidModel, string>;
  privatekey: Table<PrivateKeyModel, string>;
  vc: Table<VcModel, number>;
};
export const dexieDb = new Dexie('ionpwa-db') as IonPwaDatabase;

dexieDb.version(SCHEMA_VERSION).stores({
  settings: 'key',
  did: 'id',
  privatekey: 'id',
  vc: '++id',
});