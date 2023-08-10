type DidDocumentType = {
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
};

type WalletType = {
  name: string;
  did: string;
  bpn: string;
  algorithm: string;
  didDocument: DidDocumentType;
};

export type { DidDocumentType, WalletType };
