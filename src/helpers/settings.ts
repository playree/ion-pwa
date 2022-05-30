import { dexieDb, SettingsModel } from '../dexie';

export class Settings {
  urlOperation: string;
  urlResolve: string;

  constructor(){
    // デフォルト値
    this.urlOperation = 'https://beta.ion.msidentity.com/api/v1.0/';
    this.urlResolve = 'https://beta.discover.did.microsoft.com/1.0/';
  }

  async load() {
    // indexedDBからLoad
    const dbUrlOperation = await dexieDb.settings.get(SettingsModel.KEYS.URL_OPERATION);
    if (dbUrlOperation) {
      this.urlOperation = dbUrlOperation.value;
    }
    const dbUrlResolve = await dexieDb.settings.get(SettingsModel.KEYS.URL_RESOLVE);
    if (dbUrlResolve) {
      this.urlResolve = dbUrlResolve.value;
    }
  }

  async save() {
    // indexedDBにSave
    await dexieDb.settings.put(new SettingsModel(SettingsModel.KEYS.URL_OPERATION, this.urlOperation));
    await dexieDb.settings.put(new SettingsModel(SettingsModel.KEYS.URL_RESOLVE, this.urlResolve));
  }

  static async load() {
    const settings = new Settings();
    await settings.load();
    return settings;
  }

  static async clear() {
    await dexieDb.settings.clear();
  }
}