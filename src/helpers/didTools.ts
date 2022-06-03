import { IonDid, IonDocumentModel, IonKey, IonRequest } from '@decentralized-identity/ion-sdk';
import JwkEs256k from '@decentralized-identity/ion-sdk/dist/lib/models/JwkEs256k';
import IonProofOfWork from 'ion-pow-sdk';
import { dexieDb } from '../dexie';
import urljoin from 'url-join';
import { fetch } from 'cross-fetch';
import base64url from 'base64url';
import { createHash } from 'crypto';
import { ES256K } from '@transmute/did-key-secp256k1';

export class DidTool {
  static ACTION_PATH = {
    OPERATIONS: 'operations',
    IDENTIFIERS: 'identifiers',

    PROOF: 'proof-of-work-challenge',
  };

  static async create(url: string, signingKeyId: string = 'signing-key') {
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
      urljoin(url, DidTool.ACTION_PATH.PROOF),
      urljoin(url, DidTool.ACTION_PATH.OPERATIONS),
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

  static async resolve(url: string, did: string) {
    const res = await fetch(urljoin(url, DidTool.ACTION_PATH.IDENTIFIERS, did));
    if (res.status !== 200) {
      return {
        error: {
          status: res.status,
          text: await res.text()
        }
      }
    }
    return await res.json();
  }

  static async save(didModel: DidModel) {
    await dexieDb.did.put(didModel);
  }

  static async load() {
    const didModel = await dexieDb.did.get(DidModel.ID);
    if (didModel) {
      return new DidModel(
        didModel.scheme,
        didModel.method,
        didModel.didSuffix,
        didModel.longFormSuffixData,
        didModel.signingKeyId,
        didModel.published
      );
    }
    return null;
  };

  static async clear() {
    await dexieDb.did.clear();
  }
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
  static async clear() {
    await dexieDb.privatekey.clear();
  }
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

  get did() {
    return [this.scheme, this.method, this.didSuffix].join(':');
  }

  get didLong() {
    return [this.scheme, this.method, this.didSuffix, this.longFormSuffixData].join(':');
  }

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

export class VerifiableTool {
  static decodeJWS(jwsString: string): JWTObject {
    const jwsParse = jwsString.split('.');
    return {
      header: JSON.parse(base64url.decode(jwsParse[0])),
      payload: JSON.parse(base64url.decode(jwsParse[1])),
      jws: jwsString
    };
  };

  static generateSub(jwk: any) {
    const sha256 = createHash('sha256');
    const hash = sha256.update(JSON.stringify(jwk)).digest();
    return base64url.encode(hash);
  };

  static generateHash(text: any) {
    const sha256 = createHash('sha256');
    const hash = sha256.update(text).digest();
    return base64url.toBase64(base64url.encode(hash));
  };

  static async signJws(header: any, payload: any, privateJwk: any){
    switch(privateJwk.crv){
      case 'secp256k1':
        return ES256K.sign(payload, privateJwk, header);
      default: throw new Error('Unsupported cryptographic type');
    };
  };

  static async verifyJws(jws: string, publicJwk: any){
    switch(publicJwk.crv){
      case 'secp256k1':
        return ES256K.verify(jws, publicJwk);
      default: throw new Error('Unsupported cryptographic type');
    };
  };
}

export type JWTObject = {
  header: any,
  payload: any,
  jws: string,
}
