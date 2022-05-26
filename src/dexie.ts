import { Dexie, Table } from 'dexie';
import JwkEs256k from '@decentralized-identity/ion-sdk/dist/lib/models/JwkEs256k'

// スキーマの修正がある場合、この値を変更する必要あり
const SCHEMA_VERSION = 2;

export class SettingsModel {
  key: string;
  value: any;
  constructor(key: string, value: any) {
    this.key = key;
    this.value = value;
  };

  static KEYS = {
    ION_NODE_URL: 'ION_NODE_URL',
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
  didinfo: Table<DidInfoModel, string>;
};
export const dexieDb = new Dexie('ionpwa-db') as IonPwaDatabase;
dexieDb.version(SCHEMA_VERSION).stores({
  settings: 'key',
  didinfo: 'key',
});
