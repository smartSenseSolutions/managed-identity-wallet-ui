import { Button, CustomInput, InputWithChip, Label } from '@miw/stories';
import React, { useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { postIssueDismantler } from '@miw/APIs/VcManagement.api';
import { getAlert } from '@miw/hooks';
import Styled from './IssueDismantler.module.scss';

type Props = { onClose: () => void };

const IssueDismantler = ({ onClose }: Props) => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const handleCreateWallet = (formValues) => {
        if (!!formValues.bpn && formValues.allowedVehicleBrands) {
            setIsLoading(true);
            const param = {
                bpn: formValues.bpn,
                activityType: 'vehicleDismantle',
                allowedVehicleBrands: formValues.allowedVehicleBrands,
            };
            postIssueDismantler(param)
                .then((res) => {
                    onClose();
                    getAlert('success', t('VC_MANAGEMENT.CREDENTIAL_ISSUED_MSG'));
                })
                .catch((err) => {
                    if (err.status !== 400) getAlert('error', err?.title ? err.title : t('MY_CREDS.DELETE_FAILURE'));
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
                        <form onSubmit={handleSubmit} className={Styled.formSection} autoComplete="off" noValidate>
                            <Field name={'bpn'}>
                                {({ input, meta }) => (
                                    <div className={'formControl'}>
                                        <Label isRequired htmlFor={'bpn'}>
                                            {t('WALLET.CREATE.BPN')}
                                            {/* bpn */}
                                        </Label>
                                        <div className={Styled.inputSelect}>
                                            <CustomInput
                                                {...input}
                                                fullWidth
                                                classname="bpn"
                                                placeholder={t('WALLET.CREATE.BPN_PLACEHOLDER')}
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
                            <Field name={'allowedVehicleBrands'}>
                                {({ input, meta }) => (
                                    <div className={'formControl'}>
                                        <Label isRequired htmlFor={'allowedVehicleBrands'}>
                                            Allowed Vehicle Brands
                                        </Label>
                                        <div className={Styled.inputSelect}>
                                            <InputWithChip
                                                onBeforeAdd={() => true}
                                                {...input}
                                                id={'allowedVehicleBrands'}
                                                defaultValue={input.value}
                                                onDelete={(e) => {
                                                    input.onChange(input?.value.filter((item) => item !== e));
                                                }}
                                                onAdd={(e) => {
                                                    input.onChange([...input.value, e]);
                                                }}
                                                placeholder={'Enter multiple Name'}
                                                width={'100%'}
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
                                isLoading={isLoading}
                                disabled={!values.bpn || !values.allowedVehicleBrands}
                                type="submit"
                                fullWidth
                            >
                                {t('VC_MANAGEMENT.ISSUE_CREDENTIAL')}
                            </Button>
                        </form>
                    );
                }}
            />
        </div>
    );
};

export default IssueDismantler;
