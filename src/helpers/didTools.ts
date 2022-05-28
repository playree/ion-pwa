import { IonDid, IonDocumentModel, IonKey, IonRequest } from '@decentralized-identity/ion-sdk';
import JwkEs256k from '@decentralized-identity/ion-sdk/dist/lib/models/JwkEs256k';
import IonCreateRequestModel from '@decentralized-identity/ion-sdk/dist/lib/models/IonCreateRequestModel';
import { dexieDb, SettingsModel } from '../dexie';
import { Settings } from '../helpers/settings';

export class DidTool {
  static async create(signingKeyId: string = 'signing-key') {
    const [recoveryKey, recoveryPrivateKey] = await IonKey.generateEs256kOperationKeyPair();
    const [updateKey, updatePrivateKey] = await IonKey.generateEs256kOperationKeyPair();
    const [signingKey, signingPrivateKey] = await IonKey.generateEs256kDidDocumentKeyPair({id: signingKeyId});
    const publicKeys = [signingKey];

    const document : IonDocumentModel = {
      publicKeys
    };
    const input = { recoveryKey, updateKey, document };
    const createRequest = IonRequest.createCreateRequest(input);
    const longFormDid = IonDid.createLongFormDid(input);
    const longFormSuffixData = longFormDid.substring(longFormDid.lastIndexOf(':') + 1);

    await dexieDb.privatekey.put(new PrivateKeyModel(PrivateKeyModel.RESERVE_ID.RECOVERY, recoveryPrivateKey));
    await dexieDb.privatekey.put(new PrivateKeyModel(PrivateKeyModel.RESERVE_ID.UPDATE, updatePrivateKey));

    console.log(longFormSuffixData);

    const settings = await Settings.load();
  };
};

export class DidModel {
  // did = scheme:method:didSuffix:longFormSuffixData
  id: string;
  scheme: string;
  method: string;
  didSuffix: string;
  longFormSuffixData: string;
  signingKeyId: string;

  constructor(
    scheme: string,
    method: string,
    didSuffix: string,
    longFormSuffixData: string,
    signingKeyId: string
    ) {
    this.id = DidModel.KEY;
    this.scheme = scheme;
    this.method = method;
    this.didSuffix = didSuffix;
    this.longFormSuffixData = longFormSuffixData;
    this.signingKeyId = signingKeyId;
  };

  static KEY = 'signing-key';
};

export class PrivateKeyModel {
  id: string;
  privateKey: JwkEs256k;

  constructor(id: string, privateKey: JwkEs256k) {
    this.id = id;
    this.privateKey = privateKey;
  }

  static RESERVE_ID = {
    RECOVERY: '@RECOVERY',
    UPDATE: '@UPDATE'
  }
}