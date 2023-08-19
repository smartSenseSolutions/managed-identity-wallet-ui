import React, { useEffect, useState } from "react";
import { getMyCreds } from "@miw/APIs";
import { getAlert, useUser } from "@miw/hooks";
import { WalletType } from "@miw/models";
import StyledDidManagement from "./DidManagement.module.scss";
import { Skeleton } from "@mui/material";
import { ARRAY_OF_TEN } from "@miw/utils/constant";
import { Button } from "@miw/stories";
import { copyTextToClipboard } from "@miw/utils/helper";
import { useTranslation } from "react-i18next";

type Props = {};

const DidManagement = (props: Props) => {
  const { state } = useUser();
  const [didJson, setDidJson] = useState<WalletType>();
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  useEffect(() => {
    callGetDidDocument();
  }, []);

  const callGetDidDocument = () => {
    setIsLoading(true);
    getMyCreds(state.userDetails.BPN)
      .then((res) => {
        setDidJson(res);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCopy = () => {
    copyTextToClipboard(JSON.stringify(didJson?.didDocument, null, 2)).then(
      () => {
        getAlert("info", t("LABELS.COPIED"));
      }
    );
  };

  return (
    <div className={StyledDidManagement.container}>
      <div className="personalDetails">
        <h2 className={StyledDidManagement.title}>
          {t("DID_MGMT.PERSONAL_DETAILS")}
        </h2>
        <table className={StyledDidManagement.table}>
          {isLoading ? (
            <>
              <Skeleton variant="text" animation="wave" width={"30rem"} />
              <Skeleton variant="text" animation="wave" width={"30rem"} />
              <Skeleton variant="text" animation="wave" width={"30rem"} />
            </>
          ) : (
            <>
              <tr className="rowContainer">
                <th>{t("DID_MGMT.NAME")} :</th>
                <td>{didJson?.name}</td>
              </tr>
              <tr className="rowContainer">
                <th>{t("DID_MGMT.BPN")} :</th>
                <td>{didJson?.bpn}</td>
              </tr>
              <tr className="rowContainer">
                <th>{t("DID_MGMT.DID")} :</th>
                <td>{didJson?.did}</td>
              </tr>
            </>
          )}
        </table>
      </div>
      <h2 className={StyledDidManagement.title}>{t("DID_MGMT.DID_DOC")}</h2>
      <pre className={StyledDidManagement.josnContainer}>
        {isLoading ? (
          <>
            {ARRAY_OF_TEN.map((item) => (
              <Skeleton
                key={item}
                variant="text"
                animation="wave"
                width={"40rem"}
              />
            ))}
          </>
        ) : (
          <>
            <div className={StyledDidManagement.copyButtonHolder}>
              <Button variant="outlined" onClick={handleCopy}>
                {t("LABELS.COPY_LABEL")}
              </Button>
            </div>
            {JSON.stringify(didJson?.didDocument, null, 2)}
          </>
        )}
      </pre>
    </div>
    // </div>
  );
};

export default DidManagement;
