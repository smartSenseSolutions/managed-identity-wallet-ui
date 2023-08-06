import { getWalletList } from "@miw/APIs/VcManagement.api";
import React, { useEffect } from "react";

type Props = {};

const VcManagemanegement = (props: Props) => {
  const callGetWallet = () => {
    const param = {
      page: 0,
      size: 2147483647,
      sortColumn: "createdAt",
      sortBy: "desc",
    };
    getWalletList(param).then((res) => {
      console.log(res);
    });
  };

  useEffect(() => {
    callGetWallet();
  }, []);

  return <div>VcManagemanegement</div>;
};

export default VcManagemanegement;
