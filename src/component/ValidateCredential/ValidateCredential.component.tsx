import React, { useState } from "react";
import { Button, CustomSelect } from "@miw/stories";
import { postValidateCreds } from "@miw/APIs/VcManagement.api";

const ValidateCredential = ({ didDocument }) => {
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
    postValidateCreds({ withCreds: withCreds.value }, param).then((res) => {});
  };
  return (
    <div className="dialogecontainer" onClick={(e) => e.stopPropagation()}>
      <CustomSelect
        value={withCreds}
        onChange={(e) => {
          e.stopPropagation();
          setWithCreds(e);
        }}
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
export default ValidateCredential;
