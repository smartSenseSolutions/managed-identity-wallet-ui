import React from "react";
import { Button, CustomInput, Label } from "@miw/stories";
import { Field, Form } from "react-final-form";
import { useTranslation } from "react-i18next";
import Styled from "./IssueMembership.module.scss";
import { postCreateWallet } from "@miw/APIs";
import { postIssueMembership } from "@miw/APIs/VcManagement.api";

type Props = { onClose: () => void };

const IssueMembership = ({ onClose }: Props) => {
  const { t } = useTranslation();

  const handleCreateWallet = (formValues) => {
    if (!!formValues.bpn) {
      const param = {
        bpn: formValues.bpn,
      };
      postIssueMembership(param).then((res) => {
        // TODO: NEED TO IMPLEMENT TOAST MSG HERE
        onClose();
      });
    }
  };
  return (
    <div className={Styled.createContainer}>
      <Form
        onSubmit={handleCreateWallet}
        render={({ handleSubmit, values, submitting }) => {
          console.log(values.bpn);
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

export default IssueMembership;
