import React, {  useEffect, useState } from "react";
import {  Skeleton } from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  getWalletByRoot,
  postRevokeCreds,
} from "@miw/APIs/VcManagement.api";
import {
  IssueDismantler,
  IssueFramework,
  IssueGenericCreds,
  IssueMembership,
  ValidateCredential,
} from "@miw/component";
import { CertificateType, WalletProps } from "@miw/models";
import {
  Button,
  CustomAccordian,
  CustomInput,
  Dialog,
  Pagination,
  ThreeDotItemMenu,
} from "@miw/stories";
import {
  copyTextToClipboard,
  formatDate,
  getUTCOfsetToZero,
} from "@miw/utils/helper";
import CreartePresentation from "@miw/component/CreatePresentation";
import { getAlert } from "@miw/hooks";
import { ARRAY_OF_TEN } from "@miw/utils/constant";
import StyledVcMgmt from "./VcManagemanegement.module.scss";

type Props = {};

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
  const [isOpenPresentDialoge, setIsOpenPresentDialoge] = useState(false);
  const { t } = useTranslation();
  const handleValidateCredential = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setIsOpenDialoge(true);
  };

  const handleRevokeCreds = () => {
    const param = didDocument;
    postRevokeCreds(param)
      .then((res) => {
        getAlert("success", "Credential Revoked");
      })
      .catch((err) => {
        getAlert("error", "There is an error occured");
      });
  };

  return (
    <div className={StyledVcMgmt.headerContainer}>
      <h3 className={StyledVcMgmt.title}>{title}</h3>
      <p className={StyledVcMgmt.type}>{type}</p>

      <p className={StyledVcMgmt.type}>
        {formatDate(getUTCOfsetToZero(createdAt), "yyyy-MM-dd | HH:mm:ss")}
      </p>
      <div
        className={StyledVcMgmt.buttonGroup}
        onClick={(e) => e.stopPropagation()}
      >
        <Button onClick={(e) => handleValidateCredential(e)}>
          {t("VC_MANAGEMENT.VALIDATE")}
        </Button>
        <Button onClick={() => setIsOpenPresentDialoge(true)}>
          {t("VC_MANAGEMENT.CREATE_PRESENTATION")}
        </Button>
        
        <Button onClick={handleRevokeCreds} disabled={!didDocument?.credentialStatus }>{t("VC_MANAGEMENT.REVOKE")}</Button>
      </div>
      <div
        className={StyledVcMgmt.dialogue}
        onClick={(e) => e.stopPropagation()}
      >
        <Dialog
          isOpen={isOpenDialoge}
          showFooter={false}
          header="Validate"
          key={"Validate"}
          content={<ValidateCredential didDocument={didDocument} />}
          isShowCloseIcon
          onClose={() => setIsOpenDialoge(false)}
        />
        <Dialog
          isOpen={isOpenPresentDialoge}
          showFooter={false}
          header="Create Presentation"
          key={"Create Presentation"}
          content={<CreartePresentation didDocument={didDocument} />}
          isShowCloseIcon
          onClose={() => setIsOpenPresentDialoge(false)}
        />
      </div>
    </div>
  );
};

export const WalleteDetails = ({ didJson }: { didJson: WalletProps }) => {
  const { t } = useTranslation();
  const handleCopy = () => {
    copyTextToClipboard(JSON.stringify(didJson, null, 2)).then(() => {
      getAlert("info", t("LABELS.COPIED"));
    });
  };
  return (
    <div className={StyledVcMgmt.bodyContainer}>
      <pre className={StyledVcMgmt.jsonContainer}>
        {JSON.stringify(didJson, null, 2)}
      </pre>
      <div className={StyledVcMgmt.copyButtonHolder}>
        <Button variant="outlined" onClick={handleCopy}>
          {t("LABELS.COPY_LABEL")}
        </Button>
      </div>
    </div>
  );
};

const VcManagemanegement = (props: Props) => {
  const { t } = useTranslation();
  const currentPageNumber = 0;
  const [walletList, setWalletList] = useState<WalletProps[]>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [searchBPN, setSearchBPN] = useState("");
  const [searchType, setSearchType] = useState("");
  const [isCredentialLoading, setIsCredentialLoading] = useState(false);
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
    setCurrentSelectedPage(value - 1);
  };
  const callGetWalletsByRoot = () => {
    setIsCredentialLoading(true);
    const param = {
      holderId: searchBPN,
      vcType: searchType,
      pageNumber: `${currentSelectedPage}`,
      size: 10,
      sortColumn: "createdAt",
      sortBy: "desc",
    };
    getWalletByRoot(param)
      .then((res) => {
        setTotalCount(res.totalElements);
        setWalletList(res.content);
      })
      .finally(() => {
        setIsCredentialLoading(false);
      });
  };
  useEffect(() => {
    callGetWalletsByRoot();
  }, [currentSelectedPage, searchType, searchBPN]);

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
        <h2 className={StyledVcMgmt.title}>{t("VC_MANAGEMENT.TITLE")}</h2>
        <div className={StyledVcMgmt.headerRight}>
          <ThreeDotItemMenu
            menuItems={menuItems}
            handleItemClick={handleMenuClick}
          />
        </div>
      </div>
      <div className={StyledVcMgmt.walleteBody}>
        <div className={StyledVcMgmt.tHeader}>
          <div>
            <h3 className="thead">{t("VC_MANAGEMENT.CREDENTIAL_ID")}</h3>
            <CustomInput
              value={searchBPN}
              placeholder="Search credential...."
              onChange={(e) => setSearchBPN(e)}
              id={"credentialId"}
            />
          </div>
          <div>
            <h3 className="thead">Type</h3>
            <CustomInput
              value={searchType}
              placeholder="search Type...."
              onChange={(e) => setSearchType(e)}
              id={"credentialId"}
            />
          </div>
          <h3 className="thead">Creadted Date</h3>
          <h3 className="thead"></h3>
        </div>
        {isCredentialLoading ? (
          ARRAY_OF_TEN.map((item,) => {
            return (
              <Skeleton
              key={item}
                style={{ marginBottom: "1px" }}
                height={"5.1rem"}
                animation="wave"
                variant="rectangular"
              />
            );
          })
        ) : (
          <div className={StyledVcMgmt.listContainer}>
            {walletList?.length > 1 ? (
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
              <h3>{t("LABELS.NO_DATA_FOUND")}</h3>
            )}
            {totalCount > 5 && (
              <div className={StyledVcMgmt.paginationContainer}>
                <Pagination
                  rowCount={totalCount}
                  onChangePage={(e) => handleChangePagination(e)}
                  currentPage={currentSelectedPage + 1}
                />
              </div>
            )}
          </div>
        )}
      </div>
      <Dialog
        isOpen={issueCertificateDialogue !== null}
        showFooter={false}
        header={
          menuItems.find((item) => item.value === issueCertificateDialogue)
            ?.label
        }
        key={"Create Wallet"}
        content={<RenderDialogue />}
        // minHeight="30rem"
        isShowCloseIcon
        onClose={() => setIssueCertificateDialogue(null)}
      />
    </section>
  );
};

export default VcManagemanegement;
