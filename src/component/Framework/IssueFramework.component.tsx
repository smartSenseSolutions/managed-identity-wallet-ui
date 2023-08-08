import { Button, CustomInput, CustomSelect, Label } from "@miw/stories";
import React from "react";
import { Field, Form } from "react-final-form";
import { useTranslation } from "react-i18next";
import Styled from "./IssueFramework.module.scss";
import { postCreateWallet } from "@miw/APIs";
import { postIssueFramework } from "@miw/APIs/VcManagement.api";

type Props = { onClick: () => void };

const IssueFramework = ({ onClick }: Props) => {
  const { t } = useTranslation();
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
      const param = {
        holderIdentifier: formValues.holderIdentifier,
        type: formValues.credentialType.value,
        "contract-template":
          "https://public.catena-x.org/contracts/traceabilty.v1.pdf",
        "contract-version": "1.0.0",
      };
      postIssueFramework(param).then((res) => {
        onClick();
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
                  <div className={Styled.formControl}>
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
                disabled={
                  submitting ||
                  !values.holderIdentifier ||
                  !values.credentialType
                }
                type="submit"
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

export default IssueFramework;
