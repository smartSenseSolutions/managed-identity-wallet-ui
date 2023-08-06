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

export type { DidDocumentType };
