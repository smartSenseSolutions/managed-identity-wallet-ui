import { getDidDocument } from "@miw/APIs/DidManagement.api";
import { useUser } from "@miw/hooks";
import { DidDocumentType } from "@miw/models";
import React, { useEffect, useState } from "react";
import StyledDidManagement from "./DidManagement.module.scss";

type Props = {};

const DidManagement = (props: Props) => {
  const { state } = useUser();
  const [didJson, setDidJson] = useState<DidDocumentType>();

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
      <h2 className={StyledDidManagement.title}>DID document</h2>
      <pre className={StyledDidManagement.josnContainer}>
        {JSON.stringify(didJson, null, 2)}
      </pre>
    </div>
    // </div>
  );
};

export default DidManagement;
