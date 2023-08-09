import { Button, CustomAccordian, Pagination } from "@miw/stories";
import React, { useEffect, useState } from "react";
// import { WalletAccordianHeader, WalleteDetails } from "../Wallet/Wallet.page";

import { WalletProps } from "@miw/models";
import StyledCredentials from "../Wallet/Wallet.module.scss";
import { deleteCredential, getMyCreds } from "@miw/APIs/MyCredentials.api";
import { useUser } from "@miw/hooks";
import { useTranslation } from "react-i18next";
import { formatDate, getUTCOfsetToZero } from "@miw/utils/helper";

type Props = {};

const WalletAccordianHeader = ({
  title,
  type,
  issueDate,
  didDocument,
  postDeleteAPI,
}: {
  title: string;
  type: string;
  issueDate: string;
  didDocument: object;
  postDeleteAPI: () => void;
}) => {
  const { t } = useTranslation();
  const handleDeleteCreds = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    deleteCredential(didDocument.id).then((res) => {
      postDeleteAPI();
    });
  };
  return (
    <div className={StyledCredentials.headerContainer}>
      <h3 className={StyledCredentials.title}>{title}</h3>
      <p className={StyledCredentials.type}>{type}</p>
      <p className={StyledCredentials.type}>
        {formatDate(getUTCOfsetToZero(issueDate), "yyyy-MM-dd | hh:mm:ss")}
      </p>
      <Button onClick={handleDeleteCreds}>{t("LABELS.DELETE")}</Button>
    </div>
  );
};

const WalleteDetails = ({ didJson }: { didJson: WalletProps }) => {
  return (
    <div className={StyledCredentials.bodyContainer}>
      <pre className={StyledCredentials.jsonContainer}>
        {JSON.stringify(didJson, null, 2)}
      </pre>
    </div>
  );
};

const MyCredentials = (props: Props) => {
  const currentPageNumber = 0;
  const { t } = useTranslation();
  const {
    state: {
      userDetails: { BPN },
    },
  } = useUser();
  const [walletList, setWalletList] = useState<WalletProps[]>(null);
  const [isCreateWalletOpen, setIsCreateWalletOpen] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [currentSelectedPage, setCurrentSelectedPage] =
    useState<number>(currentPageNumber);
  useEffect(() => {
    callGetMyWallet();
    console.log(BPN);
  }, []);
  const callGetMyWallet = () => {
    const param = {
      // holderId: "BPNL000000000001",
      // type: "SummaryCredential",
      pageNumber: `${currentSelectedPage}`,
      size: 10,
      sortColumn: "createdAt",
      sortBy: "desc",
    };
    getMyCreds(param).then((res) => {
      console.log(res);
      setTotalCount(res.totalElements);
      setWalletList(res.content);
    });
  };

  const handleChangePagination = (value: number) => {
    setCurrentSelectedPage(value);
  };
  return (
    <section className={StyledCredentials.container}>
      <div className={StyledCredentials.header}>
        <h2 className={StyledCredentials.title}>{t("MY_CREDS.TITLE")}</h2>
      </div>
      <div className={StyledCredentials.walleteBody}>
        {/* <div className={StyledCredentials.walletListHeader}>

        </div> */}
        <div className={StyledCredentials.listContainer}>
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
                        wallet.credentialSubject[0]?.holderIdentifier
                          ? wallet.credentialSubject[0]?.holderIdentifier
                          : wallet.credentialSubject[0]?.bpn
                      }
                      didDocument={wallet}
                      issueDate={wallet.issuanceDate}
                      type={wallet.type[1]}
                      postDeleteAPI={() => callGetMyWallet()}
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
            <div className={StyledCredentials.paginationContainer}>
              <Pagination
                rowCount={totalCount}
                onChangePage={(e) => handleChangePagination(e)}
                currentPage={currentSelectedPage}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MyCredentials;
