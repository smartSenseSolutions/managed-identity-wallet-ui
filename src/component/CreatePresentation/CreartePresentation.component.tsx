import React, { useState } from "react";
import { Field, Form } from "react-final-form";
import { useTranslation } from "react-i18next";
import { Button, CustomInput, CustomSelect, Label } from "@miw/stories";
import { createPresentation } from "@miw/APIs";
import { LoadingType } from "@miw/types/common";
import Styled from "./CreartePresentation.module.scss";
type Props = { didDocument: object };

const CreartePresentation = ({ didDocument }: Props) => {
  const { t } = useTranslation();
  const [isFormSubmittin, setIsFormSubmittin] = useState<LoadingType>("init");
  const [presentData, setPresentData] = useState<object | string>();
  const credsType = [
    { label: "False", value: "false" },
    { label: "True", value: "true" },
  ];
  const handlePresentCreds = (formValues) => {
    setIsFormSubmittin("loading");
    const param = {
      verifiableCredentials: [didDocument],
    };
    const templateParams = {
      withCreds: formValues.withCreds.value,
      audience: formValues.bpn,
    };
    createPresentation(templateParams, param)
      .then((res) => {
        setPresentData(res.vp);
        setIsFormSubmittin("success");
      })
      .catch(() => {
        setIsFormSubmittin("failure");
      });
  };
  return (
    <div className={Styled.createContainer}>
      {isFormSubmittin !== "success" ? (
        <Form
          onSubmit={handlePresentCreds}
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
                        {/* {t("WALLET.CREATE.BPN")} */}
                        With Credential
                      </Label>
                      <div className={Styled.inputSelect}>
                        <CustomSelect
                          {...input}
                          defaultValue={{ label: "False", value: "false" }}
                          closeMenuOnSelect={true}
                          isSearchable={true}
                          required
                          insideDialog={true}
                          isCreatable={false}
                          id={"credentialType"}
                          options={credsType}
                          placeholder={"select"}
                        />
                      </div>
                    </div>
                  )}
                </Field>
                {values?.withCreds?.value === "true" && (
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
                            helperText={
                              meta.error && meta.touched && meta.error
                            }
                          />
                        </div>
                      </div>
                    )}
                  </Field>
                )}
                {/* {console.log(values?.withCreds?.value)} */}
                <Button
                  disabled={
                    submitting || values?.withCreds?.value === "true"
                      ? !values.bpn
                      : false
                  }
                  type="submit"
                  isLoading={isFormSubmittin === "loading"}
                >
                  {t("WALLET.CREATE.CREATE_WALLET")}
                </Button>
              </form>
            );
          }}
        />
      ) : (
        <pre className={Styled.presantationHolder}>
          {typeof presentData === "object"
            ? JSON.stringify(presentData, null, 1)
            : presentData}
        </pre>
      )}
    </div>
  );
};

export default CreartePresentation;
