import React from "react";
import Styled from "./CreartePresentation.module.scss";
import { Field, Form } from "react-final-form";
import { Button, CustomInput, Label } from "@miw/stories";
import { useTranslation } from "react-i18next";
type Props = { didDocument: object };

const CreartePresentation = ({ didDocument }: Props) => {
  const { t } = useTranslation();
  const handlePresentCreds = () => {};
  return (
    <div className={Styled.createContainer}>
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

              <Button disabled={submitting || !values.bpn} type="submit">
                {t("WALLET.CREATE.CREATE_WALLET")}
              </Button>
            </form>
          );
        }}
      />
    </div>
  );
};

export default CreartePresentation;
