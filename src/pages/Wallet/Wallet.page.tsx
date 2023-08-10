import { getWalletDetails, getWalletList } from "@miw/APIs/VcManagement.api";
import { CreateWallete } from "@miw/component";
import { WalletProps } from "@miw/models";
import { Button, CustomAccordian, Dialog, Pagination } from "@miw/stories";
import React, { useEffect, useState } from "react";
import StyledWallet from "./Wallet.module.scss";
import { useTranslation } from "react-i18next";
import { CircularProgress } from "@mui/material";
import { RECORDS_PER_PAGE } from "@miw/utils/constant";

type Props = {};
export const WalletAccordianHeader = ({
  title,
  did,
  bpn,
  didDocument,
}: {
  title: string;
  did: string;
  bpn: string;
  didDocument: object;
}) => {
  const openNewTabWithDidDocuments = (e) => {
    // const JSON= getWalletDetails(bpn)
    // const jsonString = JSON.stringify(didDocument, null, 2);
    e.stopPropagation();
    window.open(`${import.meta.env.VITE_API_BASE}api/didDocuments/${bpn}`);
    // if (newTab) {
    //   newTab.document.body.innerHTML = "<pre>" + jsonString + "</pre>";
    // } else {
    //   alert("The new tab was blocked. Please allow pop-ups for this website.");
    // }
  };

  return (
    <div className={StyledWallet.headerContainer}>
      <h3 className={StyledWallet.title}>{title}</h3>
      <p className={StyledWallet.type}>{bpn}</p>
      <p className={StyledWallet.type}>{did}</p>
      <Button onClick={openNewTabWithDidDocuments}>Show DID docs</Button>
    </div>
  );
};

export const WalleteDetails = ({ didJson }: { didJson: WalletProps }) => {
  return (
    <div className={StyledWallet.bodyContainer}>
      <pre className={StyledWallet.jsonContainer}>
        {JSON.stringify(didJson, null, 2)}
      </pre>
    </div>
  );
};
const Wallet = (props: Props) => {
  const currentPageNumber = 0;
  const { t } = useTranslation();
  const [walletList, setWalletList] = useState<WalletProps[]>(null);
  const [isCreateWalletOpen, setIsCreateWalletOpen] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [isWalletLoading, setIsWalletLoading] = useState(false);
  const [currentSelectedPage, setCurrentSelectedPage] =
    useState<number>(currentPageNumber);
  useEffect(() => {
    callGetWallet();
  }, [currentSelectedPage]);
  const callGetWallet = () => {
    setIsWalletLoading(true);
    const param = {
      page: currentSelectedPage,
      size: RECORDS_PER_PAGE,
      sortColumn: "createdAt",
      sortBy: "desc",
    };
    getWalletList(param)
      .then((res) => {
        setTotalCount(res.totalElements);
        setWalletList(res.content);
      })
      .finally(() => {
        setIsWalletLoading(false);
      });
  };

  const handleChangePagination = (value: number) => {
    setCurrentSelectedPage(value - 1);
  };
  return (
    <section className={StyledWallet.container}>
      <div className={StyledWallet.header}>
        <h2 className={StyledWallet.title}>{t("WALLET.TITLE")}</h2>
        <Button
          startIcon={"+"}
          variant="closed"
          onClick={() => {
            setIsCreateWalletOpen(true);
          }}
        >
          {t("WALLET.CREATE_WALLET")}
        </Button>
      </div>
      <div className={StyledWallet.walleteBody}>
        <div className={StyledWallet.tHeader}>
          <h3 className="thead">Credential ID</h3>
          <h3 className="thead">Type</h3>
          <h3 className="thead">Creadted Date</h3>
          <h3 className="thead"></h3>
        </div>
        {isWalletLoading ? (
          <div className="generalLoadingBar">
            <CircularProgress size="30px" />
          </div>
        ) : (
          <div className={StyledWallet.listContainer}>
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
                        bpn={wallet.bpn}
                        did={wallet.did}
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
              <div className={StyledWallet.paginationContainer}>
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
        isOpen={isCreateWalletOpen}
        showFooter={false}
        header={t("WALLET.CREATE.CREATE_WALLET")}
        key={"Create Wallet"}
        content={
          <CreateWallete
            onClose={() => {
              setIsCreateWalletOpen(false);
              callGetWallet();
            }}
          />
        }
        minHeight="30rem"
        isShowCloseIcon
        onClose={() => setIsCreateWalletOpen(false)}
      />
    </section>
  );
};

export default Wallet;
