import { getWalletByRoot, getWalletList } from "@miw/APIs/VcManagement.api";
import { CreateWallete } from "@miw/component";
import { CertificateType, WalletProps } from "@miw/models";
import {
  Button,
  CustomAccordian,
  Dialog,
  Pagination,
  ThreeDotItemMenu,
} from "@miw/stories";
import { itemsProps } from "@miw/types/common";
import React, { Component, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { WalletAccordianHeader, WalleteDetails } from "../Wallet/Wallet.page";
import StyledVcMgmt from "./VcManagemanegement.module.scss";
import IssueMembership from "@miw/component/MemberShip";
import IssueFramework from "@miw/component/Framework";
import IssueDismantler from "@miw/component/Dismantler";

type Props = {};

const VcManagemanegement = (props: Props) => {
  const { t } = useTranslation();
  const [walletList, setWalletList] = useState<WalletProps[]>(null);
  const [issueCertificateDialogue, setIssueCertificateDialogue] =
    useState<CertificateType>(null);
  const menuItems = [
    { id: 1, value: "issuer", label: t("VC_MANAGEMENT.ISSUER") },
    { id: 2, value: "membership", label: t("VC_MANAGEMENT.MEMBERSHIP") },
    { id: 3, value: "framework", label: t("VC_MANAGEMENT.FRAMEWORK") },
    { id: 4, value: "dismantler", label: t("VC_MANAGEMENT.DOSMANTLER") },
  ];
  const dialogueContent = {
    issuer: IssueMembership,
    membership: IssueMembership,
    framework: IssueFramework,
    dismantler: IssueDismantler,
  };
  const handleMenuClick = (clickedItem: {
    id: number;
    value: CertificateType;
    label: string;
  }) => {
    setIssueCertificateDialogue(clickedItem.value);
  };
  const callGetWalletsByRoot = () => {
    const param = {
      // holderId: "BPNL000000000001",
      // vcType: "SummaryCredential",
      page: 0,
      sortColumn: "createdAt",
      sortBy: "desc",
    };
    getWalletByRoot(param).then((res) => {
      setWalletList(res.content);
    });
  };
  useEffect(() => {
    callGetWalletsByRoot();
  }, []);

  const RenderDialogue = () => {
    if (issueCertificateDialogue) {
      const DialogeComponent = dialogueContent[issueCertificateDialogue];
      return (
        <DialogeComponent
          onClose={() => {
            setIssueCertificateDialogue(null);
            callGetWalletsByRoot();
          }}
        />
      );
    }
  };
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
      <div className={StyledVcMgmt.walleteBody}>
        {/* <div className={StyledVcMgmt.walletListHeader}>

        </div> */}
        <div className={StyledVcMgmt.listContainer}>
          {walletList ? (
            walletList.map((wallet, index) => {
              return (
                <CustomAccordian
                  key={wallet.did}
                  maxHeight={"fit-content"}
                  id={wallet.did}
                  ariaControls={""}
                  expandIcon={undefined}
                  accordionHeader={
                    <WalletAccordianHeader
                      title={wallet.name}
                      didDocument={wallet}
                      createdAt={wallet?.type[1]}
                    />
                  }
                  accordionBody={<WalleteDetails didJson={wallet} />}
                />
              );
            })
          ) : (
            <h3>no data found</h3>
          )}
          {walletList?.length > 5 && (
            <div className={StyledVcMgmt.paginationContainer}>
              <Pagination />
            </div>
          )}
        </div>
      </div>
      <Dialog
        isOpen={issueCertificateDialogue !== null}
        showFooter={false}
        header="Create Wallet"
        key={"Create Wallet"}
        content={<RenderDialogue />}
        minHeight="30rem"
        isShowCloseIcon
        onClose={() => setIssueCertificateDialogue(null)}
      />
    </section>
  );
};

export default VcManagemanegement;
