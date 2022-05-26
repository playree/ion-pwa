import { dexieDb, SettingsModel } from '../dexie'

export class Settings {
  ionNodeUrl:string;

  constructor(){
    this.ionNodeUrl = 'https://beta.ion.msidentity.com/api/v1.0/';
  }

  async load() {
    const dbIonNodeUrl = await dexieDb.settings.get(SettingsModel.KEYS.ION_NODE_URL);
    if (dbIonNodeUrl) {
      this.ionNodeUrl = dbIonNodeUrl.value;
    }
    return this;
  }

  async save() {
    let dbIonNodeUrl = await dexieDb.settings.get(SettingsModel.KEYS.ION_NODE_URL);
    if (dbIonNodeUrl) {
      dbIonNodeUrl.value = this.ionNodeUrl;
      await dexieDb.settings.update(dbIonNodeUrl.key, dbIonNodeUrl)
    } else {
      dbIonNodeUrl = new SettingsModel(SettingsModel.KEYS.ION_NODE_URL, this.ionNodeUrl);
      await dexieDb.settings.add(dbIonNodeUrl)
    }
  }
}