import { getWalletList } from "@miw/APIs/VcManagement.api";
import { CreateWallete } from "@miw/component";
import { WalletProps } from "@miw/models";
import { Button, CustomAccordian, Dialog, Pagination } from "@miw/stories";
import React, { useEffect, useState } from "react";
import StyledWallet from "./Wallet.module.scss";

type Props = {};
export const WalletAccordianHeader = ({
  title,
  createdAt,
  didDocument,
}: {
  title: string;
  createdAt: string;
  didDocument: object;
}) => {
  const openNewTabWithDidDocuments = () => {
    const jsonString = JSON.stringify(didDocument, null, 2);
    const newTab = window.open();
    if (newTab) {
      newTab.document.body.innerHTML = "<pre>" + jsonString + "</pre>";
    } else {
      alert("The new tab was blocked. Please allow pop-ups for this website.");
    }
  };

  return (
    <div className={StyledWallet.headerContainer}>
      <h3 className={StyledWallet.title}>{title}</h3>
      <p className={StyledWallet.type}>{createdAt}</p>
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
  const [walletList, setWalletList] = useState<WalletProps[]>(null);
  const [isCreateWalletOpen, setIsCreateWalletOpen] = useState(false);
  const callGetWallet = () => {
    const param = {
      page: 0,
      size: "2147483647",
      sortColumn: "createdAt",
      sortBy: "desc",
    };
    getWalletList(param).then((res) => {
      setWalletList(res.content);
    });
  };

  useEffect(() => {
    callGetWallet();
  }, []);

  return (
    <section className={StyledWallet.container}>
      <div className={StyledWallet.header}>
        <h2 className={StyledWallet.title}>Wallet</h2>
        <Button
          startIcon={"+"}
          variant="closed"
          onClick={() => {
            setIsCreateWalletOpen(true);
          }}
        >
          Create wallet
        </Button>
      </div>
      <div className={StyledWallet.walleteBody}>
        {/* <div className={StyledWallet.walletListHeader}>

        </div> */}
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
                      createdAt={wallet.didDocument.verificationMethod[0].type}
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
            <div className={StyledWallet.paginationContainer}>
              <Pagination />
            </div>
          )}
        </div>
      </div>
      <Dialog
        isOpen={isCreateWalletOpen}
        showFooter={false}
        header="Create Wallet"
        key={"Create Wallet"}
        content={<CreateWallete />}
        minHeight="30rem"
        isShowCloseIcon
        onClose={() => setIsCreateWalletOpen(false)}
      />
    </section>
  );
};

export default Wallet;
