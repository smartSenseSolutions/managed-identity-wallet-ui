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
    const tempD = {
      verifiableCredentials: [
        {
          id: "did:web:localhost:BPNL000000000000#f73e3631-ba87-4a03-bea3-b28700056879",
          "@context": [
            "https://www.w3.org/2018/credentials/v1",
            "https://catenax-ng.github.io/product-core-schemas/businessPartnerData.json",
            "https://w3id.org/security/suites/jws-2020/v1",
          ],
          type: ["VerifiableCredential", "BpnCredential"],
          issuer: "did:web:localhost:BPNL000000000000",
          expirationDate: "2024-12-31T18:30:00Z",
          issuanceDate: "2023-07-19T09:11:34Z",
          credentialSubject: [
            {
              bpn: "BPNL000000000000",
              id: "did:web:localhost:BPNL000000000000",
              type: "BpnCredential",
            },
          ],
          proof: {
            created: "2023-07-19T09:11:39Z",
            jws: "eyJhbGciOiJFZERTQSJ9..fdn2qU85auOltdHDLdHI7sJVV1ZPdftpiXd_ndXN0dFgSDWiIrScdD03wtvKLq_H-shQWfh2RYeMmrlEzAhfDw",
            proofPurpose: "proofPurpose",
            type: "JsonWebSignature2020",
            verificationMethod: "did:web:localhost:BPNL000000000000#",
          },
        },
      ],
    };
    const templateParams = {
      withCreds: formValues.withCreds.value,
      audience: formValues.bpn,
    };
    createPresentation(templateParams, tempD)
      .then((res) => {
        console.log(res);
        setPresentData(res.vp);
        setIsFormSubmittin("success");
      })
      .catch(() => {
        // onclose
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
        <pre>
          {typeof presentData === "object"
            ? JSON.stringify(presentData, null, 1)
            : presentData}
        </pre>
      )}
    </div>
  );
};

export default CreartePresentation;
