import { CustomInput, Label } from "@miw/stories";
import React from "react";
import { Field, Form } from "react-final-form";
import { useTranslation } from "react-i18next";
import Styled from "./CreateWallete.module.scss";

type Props = {};

const CreateWallete = (props: Props) => {
  const { t } = useTranslation();

  const handleCreateWallet = () => {};
  return (
    <div>
      <Form
        onSubmit={handleCreateWallet}
        render={({ handleSubmit, values }) => {
          return (
            <form onSubmit={handleSubmit} autoComplete="off" noValidate>
              <Field name={"groupName"}>
                {({ input, meta }) => (
                  <div className={Styled.formControl}>
                    <Label isRequired htmlFor={"groupName"}>
                      {t("WALLET.CREATE.DEMO")}
                    </Label>
                    <div className={Styled.inputSelect}>
                      <CustomInput
                        {...input}
                        fullWidth
                        classname="groupName"
                        placeholder={t("WALLET.CREATE.DEMO")}
                        type="text"
                        required
                        id="groupName"
                        error={(meta.error && meta.touched) || false}
                        helperText={meta.error && meta.touched && meta.error}
                      />
                    </div>
                  </div>
                )}
              </Field>
              <Field name={"groupName"}>
                {({ input, meta }) => (
                  <div className={Styled.formControl}>
                    <Label isRequired htmlFor={"groupName"}>
                      {t("WALLET.CREATE.DEMO")}
                    </Label>
                    <div className={Styled.inputSelect}>
                      <CustomInput
                        {...input}
                        fullWidth
                        classname="groupName"
                        placeholder={t("WALLET.CREATE.DEMO")}
                        type="text"
                        required
                        id="groupName"
                        error={(meta.error && meta.touched) || false}
                        helperText={meta.error && meta.touched && meta.error}
                      />
                    </div>
                  </div>
                )}
              </Field>
              <Field name={"groupName"}>
                {({ input, meta }) => (
                  <div className={Styled.formControl}>
                    <Label isRequired htmlFor={"groupName"}>
                      {t("WALLET.CREATE.DEMO")}
                    </Label>
                    <div className={Styled.inputSelect}>
                      <CustomInput
                        {...input}
                        fullWidth
                        classname="groupName"
                        placeholder={t("WALLET.CREATE.DEMO")}
                        type="text"
                        required
                        id="groupName"
                        error={(meta.error && meta.touched) || false}
                        helperText={meta.error && meta.touched && meta.error}
                      />
                    </div>
                  </div>
                )}
              </Field>
              <Field name={"groupName"}>
                {({ input, meta }) => (
                  <div className={Styled.formControl}>
                    <Label isRequired htmlFor={"groupName"}>
                      {t("WALLET.CREATE.DEMO")}
                    </Label>
                    <div className={Styled.inputSelect}>
                      <CustomInput
                        {...input}
                        fullWidth
                        classname="groupName"
                        placeholder={t("WALLET.CREATE.DEMO")}
                        type="text"
                        required
                        id="groupName"
                        error={(meta.error && meta.touched) || false}
                        helperText={meta.error && meta.touched && meta.error}
                      />
                    </div>
                  </div>
                )}
              </Field>
              <Field name={"groupName"}>
                {({ input, meta }) => (
                  <div className={Styled.formControl}>
                    <Label isRequired htmlFor={"groupName"}>
                      {t("WALLET.CREATE.DEMO")}
                    </Label>
                    <div className={Styled.inputSelect}>
                      <CustomInput
                        {...input}
                        fullWidth
                        classname="groupName"
                        placeholder={t("WALLET.CREATE.DEMO")}
                        type="text"
                        required
                        id="groupName"
                        error={(meta.error && meta.touched) || false}
                        helperText={meta.error && meta.touched && meta.error}
                      />
                    </div>
                  </div>
                )}
              </Field>
              <Field name={"groupName"}>
                {({ input, meta }) => (
                  <div className={Styled.formControl}>
                    <Label isRequired htmlFor={"groupName"}>
                      {t("WALLET.CREATE.DEMO")}
                    </Label>
                    <div className={Styled.inputSelect}>
                      <CustomInput
                        {...input}
                        fullWidth
                        classname="groupName"
                        placeholder={t("WALLET.CREATE.DEMO")}
                        type="text"
                        required
                        id="groupName"
                        error={(meta.error && meta.touched) || false}
                        helperText={meta.error && meta.touched && meta.error}
                      />
                    </div>
                  </div>
                )}
              </Field>
              <Field name={"groupName"}>
                {({ input, meta }) => (
                  <div className={Styled.formControl}>
                    <Label isRequired htmlFor={"groupName"}>
                      {t("WALLET.CREATE.DEMO")}
                    </Label>
                    <div className={Styled.inputSelect}>
                      <CustomInput
                        {...input}
                        fullWidth
                        classname="groupName"
                        placeholder={t("WALLET.CREATE.DEMO")}
                        type="text"
                        required
                        id="groupName"
                        error={(meta.error && meta.touched) || false}
                        helperText={meta.error && meta.touched && meta.error}
                      />
                    </div>
                  </div>
                )}
              </Field>
            </form>
          );
        }}
      />
    </div>
  );
};

export default CreateWallete;
