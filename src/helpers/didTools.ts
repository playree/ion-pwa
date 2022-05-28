import { IonDid, IonDocumentModel, IonKey, IonRequest } from '@decentralized-identity/ion-sdk';
import JwkEs256k from '@decentralized-identity/ion-sdk/dist/lib/models/JwkEs256k';
import IonProofOfWork from 'ion-pow-sdk';
import { dexieDb } from '../dexie';
import urljoin from 'url-join';

export class DidTool {
  static ACTION_PATH = {
    OPERATIONS: 'operations',
    PROOF: 'proof-of-work-challenge',
  };

  static async create(ionNodeUrl: string, signingKeyId: string = 'signing-key') {
    // 鍵生成
    const [recoveryKey, recoveryPrivateKey] = await IonKey.generateEs256kOperationKeyPair();
    const [updateKey, updatePrivateKey] = await IonKey.generateEs256kOperationKeyPair();
    const [signingKey, signingPrivateKey] = await IonKey.generateEs256kDidDocumentKeyPair({id: signingKeyId});
    const publicKeys = [signingKey];

    // DID作成リクエスト
    const document : IonDocumentModel = {
      publicKeys
    };
    const input = { recoveryKey, updateKey, document };
    const createRequest = IonRequest.createCreateRequest(input);
    const longFormDid = IonDid.createLongFormDid(input);
    const longFormSuffixData = longFormDid.substring(longFormDid.lastIndexOf(':') + 1);

    const resText = await IonProofOfWork.submitIonRequest(
      urljoin(ionNodeUrl, DidTool.ACTION_PATH.PROOF),
      urljoin(ionNodeUrl, DidTool.ACTION_PATH.OPERATIONS),
      JSON.stringify(createRequest)
    );
    if (!resText) {
      return null;
    };

    // 各種パラメータ生成
    const resObj = JSON.parse(resText);
    const did: string = resObj.didDocument.id;
    const didParts = did.split(':');
    const scheme = didParts[0];
    const didSuffix = didParts[didParts.length - 1];
    let method = didParts[1];
    if (didParts.length === 4) {
      method +=  ':' +  didParts[2];
    };
    const published = resObj.didDocumentMetadata.method.published;

    const didModel = new DidModel(
      scheme,
      method,
      didSuffix,
      longFormSuffixData,
      signingKeyId,
      published
    );

    return {
      didModel: didModel,
      signingPrivateKey: signingPrivateKey,
      recoveryPrivateKey: recoveryPrivateKey,
      updatePrivateKey: updatePrivateKey,
    };
  };

  static async save(didModel: DidModel) {
    await dexieDb.did.put(didModel);
  }

  static async load() {
    return await dexieDb.did.get(DidModel.ID);
  };
};

export class PrivateKeyTool {
  static RESERVE_ID = {
    RECOVERY: '@RECOVERY',
    UPDATE: '@UPDATE'
  }

  static async save(id: string, privateKey: JwkEs256k) {
    await dexieDb.privatekey.put(new PrivateKeyModel(id, privateKey));
  };
  static async load(id: string) {
    return await dexieDb.privatekey.get(id);
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
  published: boolean;

  constructor(
    scheme: string = '',
    method: string = '',
    didSuffix: string = '',
    longFormSuffixData: string = '',
    signingKeyId: string = DidModel.SIGNING_KEY,
    published = false
    ) {
    this.id = DidModel.ID;
    this.scheme = scheme;
    this.method = method;
    this.didSuffix = didSuffix;
    this.longFormSuffixData = longFormSuffixData;
    this.signingKeyId = signingKeyId;
    this.published = published;
  };

  static ID = 'onlyid';
  static SIGNING_KEY = 'signing-key';
};

export class PrivateKeyModel {
  id: string;
  privateKey: JwkEs256k;

  constructor(id: string, privateKey: JwkEs256k) {
    this.id = id;
    this.privateKey = privateKey;
  };
};