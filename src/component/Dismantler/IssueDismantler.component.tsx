import { Button, CustomInput, InputWithChip, Label } from "@miw/stories";
import React from "react";
import { Field, Form } from "react-final-form";
import { useTranslation } from "react-i18next";
import Styled from "./IssueDismantler.module.scss";
import { postCreateWallet } from "@miw/APIs";
import { postIssueDismantler } from "@miw/APIs/VcManagement.api";

type Props = { onClose: () => void };

const IssueDismantler = ({ onClose }: Props) => {
  const { t } = useTranslation();

  const handleCreateWallet = (formValues) => {
    if (!!formValues.bpn && formValues.name) {
      const param = {
        bpn: formValues.bpn,
        activityType: "vehicleDismantle",
        allowedVehicleBrands: formValues.allowedVehicleBrands,
      };
      postIssueDismantler(param).then((res) => {
        onClose();
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
              <Field name={"bpn"}>
                {({ input, meta }) => (
                  <div className={Styled.formControl}>
                    <Label isRequired htmlFor={"bpn"}>
                      {t("WALLET.CREATE.BPN")}
                      {/* bpn */}
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
              <Field name={"allowedVehicleBrands"}>
                {({ input, meta }) => (
                  <div className={Styled.formControl}>
                    <Label isRequired htmlFor={"allowedVehicleBrands"}>
                      Allowed Vehicle Brands
                    </Label>
                    <div className={Styled.inputSelect}>
                      <InputWithChip
                        onBeforeAdd={() => true}
                        {...input}
                        id={"allowedVehicleBrands"}
                        defaultValue={input.value}
                        onDelete={(e) => {
                          input.onChange(
                            input?.value.filter((item) => item !== e)
                          );
                        }}
                        onAdd={(e) => {
                          input.onChange([...input.value, e]);
                        }}
                        placeholder={"Enter multiple Name"}
                        width={"100%"}
                        fullWidth={true}
                        onChange={(e) => {
                          input.onChange(e);
                        }}
                      />
                    </div>
                  </div>
                )}
              </Field>

              <Button
                disabled={submitting || !values.bpn || !values.name}
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

export default IssueDismantler;
