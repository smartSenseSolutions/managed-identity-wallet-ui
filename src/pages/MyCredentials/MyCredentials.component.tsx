import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Button, CustomAccordian, CustomInput, Pagination } from "@miw/stories";
import { WalletProps } from "@miw/models";
import { deleteCredential, getCredentials } from "@miw/APIs/MyCredentials.api";
import { RECORDS_PER_PAGE } from "@miw/utils/constant";
import { formatDate, getUTCOfsetToZero } from "@miw/utils/helper";
import StyledCredentials from "../Wallet/Wallet.module.scss";

type Props = {
  title: string;
  type: string;
  issueDate: string;
  didDocument: object;
  postDeleteAPI: () => void;
};

const WalletAccordianHeader = ({
  title,
  type,
  issueDate,
  didDocument,
  postDeleteAPI,
}: Props) => {
  const { t } = useTranslation();
  const handleDeleteCreds = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    deleteCredential({ id: encodeURIComponent(didDocument.id) }).then((res) => {
      postDeleteAPI();
    });
  };
  return (
    <div className={StyledCredentials.headerContainer}>
      <h3 className={StyledCredentials.title}>{title}</h3>
      <p className={StyledCredentials.type}>{type}</p>
      <p className={StyledCredentials.type}>
        {formatDate(getUTCOfsetToZero(issueDate), "yyyy-MM-dd | HH:mm:ss")}
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

const MyCredentials = () => {
  const currentPageNumber = 0;
  const { t } = useTranslation();
  const [walletList, setWalletList] = useState<WalletProps[]>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchBPN, setSearchBPN] = useState("");
  const [searchType, setSearchType] = useState("");
  const [currentSelectedPage, setCurrentSelectedPage] =
    useState<number>(currentPageNumber);

  useEffect(() => {
    callGetMyWallet();
  }, [searchBPN, currentSelectedPage, searchType]);

  const callGetMyWallet = () => {
    setIsLoading(true);
    const param = {
      issuerIdentifier: searchBPN,
      type: searchType,
      pageNumber: `${currentSelectedPage}`,
      size: RECORDS_PER_PAGE,
      sortColumn: "createdAt",
      sortBy: "desc",
    };

    getCredentials(param)
      .then((res) => {
        setTotalCount(res.totalElements);
        setWalletList(res.content);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleChangePagination = (value: number) => {
    setCurrentSelectedPage(value - 1);
  };
  return (
    <section className={StyledCredentials.container}>
      <div className={StyledCredentials.header}>
        <h2 className={StyledCredentials.title}>{t("MY_CREDS.TITLE")}</h2>
      </div>
      <div className={StyledCredentials.walleteBody}>
        <div className={StyledCredentials.tHeader}>
          <div>
            <h3 className="thead">{t("HEADER.CRED_ID")}</h3>
            <CustomInput
              value={searchBPN}
              placeholder="Search Credential...."
              onChange={(e) => setSearchBPN(e)}
              id={"credentialId"}
            />
          </div>
          <div>
            <h3 className="thead">{t("HEADER.TYPE")}</h3>
            <CustomInput
              value={searchType}
              placeholder="Search Type...."
              onChange={(e) => setSearchType(e)}
              id={"credentialId"}
            />
          </div>
          <h3 className="thead">{t("HEADER.CREATED_AT")}</h3>
          <h3 className="thead"></h3>
        </div>
        <div className={StyledCredentials.listContainer}>
          {isLoading ? (
            <div className="tableLoading">
              <CircularProgress size="30px" />
            </div>
          ) : walletList?.length > 0 ? (
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
            <h3 className={"no_data_found"}>{t("LABELS.NO_DATA_FOUND")}</h3>
          )}
          {totalCount > 5 && (
            <div className={StyledCredentials.paginationContainer}>
              <Pagination
                rowCount={totalCount}
                onChangePage={(e) => handleChangePagination(e)}
                currentPage={currentSelectedPage + 1}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MyCredentials;
