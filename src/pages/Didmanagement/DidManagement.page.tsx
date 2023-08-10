import { getDidDocument } from "@miw/APIs/DidManagement.api";
import { useUser } from "@miw/hooks";
import { DidDocumentType, WalletType } from "@miw/models";
import React, { useEffect, useState } from "react";
import StyledDidManagement from "./DidManagement.module.scss";
import { getMyCreds } from "@miw/APIs";

type Props = {};

const DidManagement = (props: Props) => {
  const { state } = useUser();
  const [didJson, setDidJson] = useState<WalletType>();

  useEffect(() => {
    callGetDidDocument();
  }, []);

  const callGetDidDocument = () => {
    // getDidDocument(state.userDetails.BPN).then((res) => {
    getMyCreds(state.userDetails.BPN).then((res) => {
      setDidJson(res);
    });
  };

  return (
    <div className={StyledDidManagement.container}>
      <div className="personalDetails">
        <h2 className={StyledDidManagement.title}>Personal Details</h2>
        <table className={StyledDidManagement.table}>
          {didJson &&
            Object.entries(didJson).map((item) => {
              if (typeof item[1] === "string")
                return (
                  <tr className="rowContainer">
                    <th>{item[0]} :</th>
                    <td>{item[1]}</td>
                  </tr>
                );
            })}
        </table>
      </div>
      <h2 className={StyledDidManagement.title}>DID document</h2>
      <pre className={StyledDidManagement.josnContainer}>
        {JSON.stringify(didJson, null, 2)}
      </pre>
    </div>
    // </div>
  );
};

export default DidManagement;
