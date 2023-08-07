import { getWalletList } from "@miw/APIs/VcManagement.api";
import { CreateWallete } from "@miw/component";
import { CertificateType } from "@miw/models";
import { Button, Dialog, ThreeDotItemMenu } from "@miw/stories";
import { itemsProps } from "@miw/types/common";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type Props = {};

const VcManagemanegement = (props: Props) => {
  const { t } = useTranslation();

  const [issueCertificateDialogue, setIssueCertificateDialogue] =
    useState<CertificateType>(null);
  const menuItems = [
    { id: 1, value: "issuer", label: t("VC_MANAGEMENT.ISSUER") },
    { id: 2, value: "membership", label: t("VC_MANAGEMENT.MEMBERSHIP") },
    { id: 3, value: "framework", label: t("VC_MANAGEMENT.FRAMEWORK") },
    { id: 4, value: "dismantler", label: t("VC_MANAGEMENT.DOSMANTLER") },
  ];
  const handleMenuClick = (clickedItem: {
    id: number;
    value: CertificateType;
    label: string;
  }) => {
    setIssueCertificateDialogue(clickedItem.value);
  };
  // const callGetWallet = () => {
  //   const param = {
  //     page: 0,
  //     size: 2147483647,
  //     sortColumn: "createdAt",
  //     sortBy: "desc",
  //   };
  //   getWalletList(param).then((res) => {
  //     console.log(res);
  //   });
  // };

  // useEffect(() => {
  //   callGetWallet();
  // }, []);

  return (
    <section className="container">
      <div className="header">
        <div className="left">
          <h2 className="title">List of credential issued by Root Wallet</h2>
        </div>
        <ThreeDotItemMenu
          menuItems={menuItems}
          handleItemClick={handleMenuClick}
        />
      </div>
      <Dialog
        isOpen={issueCertificateDialogue !== null}
        showFooter={false}
        header="Create Wallet"
        key={"Create Wallet"}
        content={<CreateWallete />}
        minHeight="30rem"
        isShowCloseIcon
        onClose={() => setIssueCertificateDialogue(null)}
      />
    </section>
  );
};

export default VcManagemanegement;
