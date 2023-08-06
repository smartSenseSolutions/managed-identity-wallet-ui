type WalletProps = {
  name: string;
  did: string;
  bpn: string;
  algorithm: string;
  didDocument: {
    id: string;
    verificationMethod: {
      controller: string;
      id: string;
      publicKeyJwk: {
        crv: string;
        kty: string;
        x: string;
      };
      type: string;
    }[];
    "@context": string[];
  };
};
export type { WalletProps };
