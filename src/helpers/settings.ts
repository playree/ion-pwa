import { dexieDb, SettingsModel } from '../dexie';

export class Settings {
  ionNodeUrl:string;

  constructor(){
    // デフォルト値
    this.ionNodeUrl = 'https://beta.ion.msidentity.com/api/v1.0/';
  }

  async load() {
    // indexedDBからLoad
    const dbIonNodeUrl = await dexieDb.settings.get(SettingsModel.KEYS.ION_NODE_URL);
    if (dbIonNodeUrl) {
      this.ionNodeUrl = dbIonNodeUrl.value;
    }
  }

  async save() {
    // indexedDBにSave
    await dexieDb.settings.put(new SettingsModel(SettingsModel.KEYS.ION_NODE_URL, this.ionNodeUrl));
  }

  static async load() {
    const settings = new Settings();
    await settings.load();
    return settings;
  }
}