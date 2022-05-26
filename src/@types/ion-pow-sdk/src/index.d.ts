declare module 'ion-pow-sdk' {
  export default class IonProofOfWork {
    static submitIonRequest(getChallengeUri: string, solveChallengeUri: string, requestBody: {}): Promise<string>
  }
}