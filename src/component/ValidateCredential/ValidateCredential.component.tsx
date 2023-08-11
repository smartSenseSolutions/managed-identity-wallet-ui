import React, { useState } from "react";
import { Button, CustomSelect, Label } from "@miw/stories";
import { postValidateCreds } from "@miw/APIs/VcManagement.api";
import { Field, Form } from "react-final-form";
import Styled from "./ValidateCredential.module.scss";

const ValidateCredential = ({ didDocument }) => {
  // const [withCreds, setWithCreds] = useState();
  const credentialType = [
    { label: "False", value: "false" },
    { label: "True", value: "true" },
  ];

  const defaultValue = {
    withCreds: {
      label: "False",
      value: "false",
    },
  };

  const handleCallValidateCredential = (formValues) => {
    const param = didDocument;
    postValidateCreds({ withCreds: formValues.withCreds?.value }, param).then(
      (res) => {}
    );
  };
  return (
    <div className="dialogecontainer" onClick={(e) => e.stopPropagation()}>
      <Form
        onSubmit={handleCallValidateCredential}
        initialValues={{ ...defaultValue }}
        render={({ handleSubmit, values, submitting }) => {
          return (
            <form
              onSubmit={handleSubmit}
              className={Styled.formSection}
              autoComplete="off"
              noValidate
            >
              <Field name={"withCreds"}>
                {({ input, meta }) => (
                  <div className={Styled.formControl}>
                    <Label isRequired htmlFor={"withCreds"}>
                      withCredentialExpiryDate
                    </Label>
                    <div className={Styled.inputSelect}>
                      <CustomSelect
                        {...input}
                        closeMenuOnSelect={true}
                        isSearchable={true}
                        required
                        insideDialog={true}
                        isCreatable={false}
                        id={"credentialType"}
                        options={credentialType}
                        placeholder={"select"}
                      />
                    </div>
                  </div>
                )}
              </Field>
              <Button fullWidth onClick={handleCallValidateCredential}>
                Validate
              </Button>
            </form>
          );
        }}
      />
    </div>
  );
};
export default ValidateCredential;
