import { Dexie, Table } from 'dexie';

// スキーマの修正がある場合、この値を変更する必要あり
const SCHEMA_VERSION = 1;

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

interface IonPwaDatabase extends Dexie {
  settings: Table<SettingsModel, string>;
};

export const dexieDb = new Dexie('ionpwa-db') as IonPwaDatabase;
dexieDb.version(SCHEMA_VERSION).stores({
  settings: 'key, value',
});
