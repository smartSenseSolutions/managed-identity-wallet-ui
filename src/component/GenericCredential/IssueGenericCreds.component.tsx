import { Button, CustomInput, CustomTextArea, Label } from "@miw/stories";
import React, { useState } from "react";
import { Field, Form } from "react-final-form";
import { useTranslation } from "react-i18next";
import { postIssueGenericCredential } from "@miw/APIs/VcManagement.api";
import Styled from "./IssueGenericCreds.module.scss";
import { getAlert } from "@miw/hooks";

type Props = { onClose: () => void };

const IssueGenericCreds = ({ onClose }: Props) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const handleCreateWallet = (formValues) => {
    setIsLoading(true);
    const param = formValues.json;
    postIssueGenericCredential({ holderDid: formValues.bpn }, param)
      .then((res) => {
        getAlert("success", t("VC_MANAGEMENT.CREDENTIAL_ISSUED_MSG"));
        onClose();
      })
      .catch((err) => {
        getAlert("error", err.detail);
      })
      .finally(() => {
        setIsLoading(false);
      });
    // }
  };
  return (
    <div className={Styled.createContainer}>
      <Form
        onSubmit={handleCreateWallet}
        render={({ handleSubmit, values, submitting }) => {
          return (
            <form
              onSubmit={handleSubmit}
              className={Styled.formSection}
              autoComplete="off"
              noValidate
            >
              <Field name={"bpn"}>
                {({ input, meta }) => (
                  <div className={Styled.formControl}>
                    <Label isRequired htmlFor={"bpn"}>
                      {t("WALLET.CREATE.BPN")}
                    </Label>
                    <div className={Styled.inputSelect}>
                      <CustomInput
                        {...input}
                        fullWidth
                        classname="bpn"
                        placeholder={t("WALLET.CREATE.BPN_PLACEHOLDER")}
                        type="text"
                        required
                        id="bpn"
                        error={(meta.error && meta.touched) || false}
                        helperText={meta.error && meta.touched && meta.error}
                      />
                    </div>
                  </div>
                )}
              </Field>
              <Field name={"json"}>
                {({ input, meta }) => (
                  <div className={Styled.formControl}>
                    <Label isRequired htmlFor={"json"}>
                      JSON Data
                    </Label>
                    <div className={Styled.inputSelect}>
                      <CustomTextArea
                        {...input}
                        id="json"
                        placeholder={"Enter Json Data"}
                      />
                    </div>
                  </div>
                )}
              </Field>

              <Button
                disabled={submitting || !values.json}
                type="submit"
                isLoading={isLoading}
              >
                {t("WALLET.CREATE.CREATE_WALLET")}
              </Button>
            </form>
          );
        }}
      />
    </div>
  );
};

export default IssueGenericCreds;
