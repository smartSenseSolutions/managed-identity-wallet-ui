import React, { useState } from "react";
import { Button, CustomInput, CustomSelect, Label } from "@miw/stories";
import { Field, Form } from "react-final-form";
import { useTranslation } from "react-i18next";
import { postIssueFramework } from "@miw/APIs";
import Styled from "./IssueFramework.module.scss";
import { getAlert } from "@miw/hooks";

type Props = { onClose: () => void };

const IssueFramework = ({ onClose }: Props) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const credentialType = [
    { label: "BehaviorTwinCredential", value: "BehaviorTwinCredential" },
    { label: "PcfCredential", value: "PcfCredential" },
    { label: "SustainabilityCredential", value: "SustainabilityCredential" },
    { label: "QualityCredential", value: "QualityCredential" },
    { label: "TraceabilityCredential", value: "TraceabilityCredential" },
    { label: "ResiliencyCredential", value: "ResiliencyCredential" },
  ];
  const handleCreateWallet = (formValues) => {
    if (!!formValues.holderIdentifier && formValues.credentialType) {
      setIsLoading(true);
      const param = {
        holderIdentifier: formValues.holderIdentifier,
        type: formValues.credentialType.value,
        "contract-template":
          "https://public.catena-x.org/contracts/traceabilty.v1.pdf",
        "contract-version": "1.0.0",
      };
      postIssueFramework(param)
        .then((res) => {
          getAlert("success", t("VC_MANAGEMENT.CREDENTIAL_ISSUED_MSG"));
          onClose();
        })
        .catch((err) => {
          getAlert("error", err.detail);
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
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
              <Field name={"holderIdentifier"}>
                {({ input, meta }) => (
                  <div className={"formControl"}>
                    <Label isRequired htmlFor={"holderIdentifier"}>
                      holderIdentifier
                    </Label>
                    <div className={Styled.inputSelect}>
                      <CustomInput
                        {...input}
                        fullWidth
                        classname="bpn"
                        placeholder={t("WALLET.CREATE.BPN_PLACEHOLDER")}
                        type="text"
                        required
                        id="BPNL000000000000"
                        error={(meta.error && meta.touched) || false}
                        helperText={meta.error && meta.touched && meta.error}
                      />
                    </div>
                  </div>
                )}
              </Field>
              <Field name={"credentialType"}>
                {({ input, meta }) => (
                  <div className={`dialogInputSelect`}>
                    <CustomSelect
                      {...input}
                      closeMenuOnSelect={true}
                      isSearchable={true}
                      required
                      // isMulti
                      insideDialog={true}
                      isCreatable={false}
                      id={"credentialType"}
                      options={credentialType}
                      placeholder={"select"}
                      // menuIsOpen={false}
                      // isClearable={false}
                    />
                    {meta.error && meta.touched && (
                      <span className={`dialogErrorText`}>{meta.error}</span>
                    )}
                  </div>
                )}
              </Field>

              <Button
                isLoading={isLoading}
                disabled={
                  submitting ||
                  !values.holderIdentifier ||
                  !values.credentialType
                }
                type="submit"
              >
                {t("VC_MANAGEMENT.ISSUE_CREDENTIAL")}
              </Button>
            </form>
          );
        }}
      />
    </div>
  );
};

export default IssueFramework;
