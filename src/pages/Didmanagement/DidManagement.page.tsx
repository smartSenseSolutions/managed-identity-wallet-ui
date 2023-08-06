import { getDidDocument } from "@miw/APIs/DidManagement.api";
import { useUser } from "@miw/hooks";
import { DidDocumentType } from "@miw/models";
import React, { useEffect, useState } from "react";
import StyledDidManagement from "./DidManagement.module.scss";

type Props = {};

const DidManagement = (props: Props) => {
  const { state } = useUser();
  const [didJson, setDidJson] = useState<DidDocumentType>();
  //     {
  //     id: "did:web:localhost%3A8087:BPNL000000000000",
  //     verificationMethod: [
  //       {
  //         controller: "did:web:localhost%3A8087:BPNL000000000000",
  //         id: "did:web:localhost%3A8087:BPNL000000000000#",
  //         publicKeyJwk: {
  //           crv: "Ed25519",
  //           kty: "OKP",
  //           x: "445TTwxfVWCiej3UwPZKZrEw1t7Kx8vvBdU46gLC548",
  //         },
  //         type: "JsonWebKey2020",
  //       },
  //     ],
  //     "@context": [
  //       "https://www.w3.org/ns/did/v1",
  //       "https://w3c.github.io/vc-jws-2020/contexts/v1",
  //     ],
  //   }

  useEffect(() => {
    callGetDidDocument();
  }, []);

  const callGetDidDocument = () => {
    getDidDocument(state.userDetails.BPN).then((res) => {
      setDidJson(res);
    });
  };

  return (
    <div className={StyledDidManagement.container}>
      {/* <div className={StyledDidManagement.contentContainer}> */}
      <h2 className={StyledDidManagement.title}>DID document</h2>
      <pre className={StyledDidManagement.josnContainer}>
        {JSON.stringify(didJson, null, 2)}
      </pre>
    </div>
    // </div>
  );
};

export default DidManagement;
