import React, { Component, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getWalletByRoot, postValidateCreds } from "@miw/APIs/VcManagement.api";
import {
  IssueDismantler,
  IssueFramework,
  IssueGenericCreds,
  IssueMembership,
} from "@miw/component";
import { CertificateType, WalletProps } from "@miw/models";
import {
  Button,
  CustomAccordian,
  CustomInput,
  CustomSelect,
  Dialog,
  Pagination,
  ThreeDotItemMenu,
} from "@miw/stories";
// import { WalletAccordianHeader, WalleteDetails } from "../Wallet/Wallet.page";
import StyledVcMgmt from "./VcManagemanegement.module.scss";

type Props = {};
const RenderHeaderActionDialogue = ({ didDocument }) => {
  const [withCreds, setWithCreds] = useState({
    label: "False",
    value: "false",
  });
  const credentialType = [
    { label: "False", value: "false" },
    { label: "True", value: "true" },
  ];

  const handleCallValidateCredential = () => {
    const param = didDocument;

    postValidateCreds({ withCreds: withCreds.value }, param).then((res) => {
      console.log(res);
    });
  };
  return (
    <div className="dialogecontainer">
      <CustomSelect
        value={withCreds}
        onChange={(e) => setWithCreds(e)}
        closeMenuOnSelect={true}
        isSearchable={true}
        required
        insideDialog={true}
        isCreatable={false}
        id={"credentialType"}
        options={credentialType}
        placeholder={"select"}
      />
      <Button fullWidth onClick={handleCallValidateCredential}>
        Validate
      </Button>
    </div>
  );
};
const WalletAccordianHeader = ({
  title,
  createdAt,
  type,
  didDocument,
}: {
  title: string;
  type: string;
  createdAt: string;
  didDocument: object;
}) => {
  const [isOpenDialoge, setIsOpenDialoge] = useState(false);
  const handleValidateCredential = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIsOpenDialoge(true);
  };

  return (
    <div className={StyledVcMgmt.headerContainer}>
      <h3 className={StyledVcMgmt.title}>{title}</h3>
      <p className={StyledVcMgmt.type}>{type}</p>

      <p className={StyledVcMgmt.type}>{createdAt}</p>
      <div className={StyledVcMgmt.buttonGroup}>
        <Button onClick={(e) => handleValidateCredential(e)}>validate</Button>
        <Button onClick={""}>Create Presentation</Button>
        <Button onClick={""}>Revoke</Button>
      </div>
      <Dialog
        isOpen={isOpenDialoge}
        showFooter={false}
        header="Create Wallet"
        key={"Create Wallet"}
        content={<RenderHeaderActionDialogue didDocument={didDocument} />}
        // minHeight="30rem"
        isShowCloseIcon
        onClose={() => setIsOpenDialoge(false)}
      />
    </div>
  );
};

export const WalleteDetails = ({ didJson }: { didJson: WalletProps }) => {
  return (
    <div className={StyledVcMgmt.bodyContainer}>
      <pre className={StyledVcMgmt.jsonContainer}>
        {JSON.stringify(didJson, null, 2)}
      </pre>
    </div>
  );
};

const VcManagemanegement = (props: Props) => {
  const { t } = useTranslation();
  const currentPageNumber = 0;
  const [walletList, setWalletList] = useState<WalletProps[]>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [currentSelectedPage, setCurrentSelectedPage] =
    useState<number>(currentPageNumber);
  const [issueCertificateDialogue, setIssueCertificateDialogue] =
    useState<CertificateType>(null);
  const menuItems = [
    { id: 1, value: "issuer", label: t("VC_MANAGEMENT.ISSUER") },
    { id: 2, value: "membership", label: t("VC_MANAGEMENT.MEMBERSHIP") },
    { id: 3, value: "framework", label: t("VC_MANAGEMENT.FRAMEWORK") },
    { id: 4, value: "dismantler", label: t("VC_MANAGEMENT.DOSMANTLER") },
  ];
  const dialogueContent = {
    issuer: IssueGenericCreds,
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
  const handleChangePagination = (value: number) => {
    setCurrentSelectedPage(value);
  };
  const callGetWalletsByRoot = () => {
    const param = {
      // holderId: "BPNL000000000001",
      // vcType: "SummaryCredential",
      pageNumber: `${currentSelectedPage}`,
      size: 10,
      sortColumn: "createdAt",
      sortBy: "desc",
    };
    getWalletByRoot(param).then((res) => {
      setTotalCount(res.totalElements);
      setWalletList(res.content);
    });
  };
  useEffect(() => {
    callGetWalletsByRoot();
  }, [currentSelectedPage]);

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
    <section className={StyledVcMgmt.container}>
      <div className={StyledVcMgmt.header}>
        <h2 className={StyledVcMgmt.title}>
          List of credential issued by Root Wallet
        </h2>
        <div className={StyledVcMgmt.headerRight}>
          <CustomInput
            id={"SearchFilter"}
            placeholder="Search Here.."
            onChange={(e) => {
              setSearchInput(e);
            }}
          />
          <ThreeDotItemMenu
            menuItems={menuItems}
            handleItemClick={handleMenuClick}
          />
        </div>
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
                      title={
                        wallet.credentialSubject[0]?.bpn
                          ? wallet.credentialSubject[0]?.bpn
                          : wallet.credentialSubject[0]?.holderIdentifier
                      }
                      didDocument={wallet}
                      type={wallet?.type[1]}
                      createdAt={wallet?.issuanceDate}
                    />
                  }
                  accordionBody={<WalleteDetails didJson={wallet} />}
                />
              );
            })
          ) : (
            <h3>no data found</h3>
          )}
          {totalCount > 5 && (
            <div className={StyledVcMgmt.paginationContainer}>
              <Pagination
                rowCount={totalCount}
                onChangePage={(e) => handleChangePagination(e)}
                currentPage={currentSelectedPage}
              />
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
