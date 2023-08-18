import React, { useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { postIssueMembership } from '@miw/APIs/VcManagement.api';
import { Button, CustomInput, Label } from '@miw/stories';
import { getAlert } from '@miw/hooks';
import Styled from './IssueMembership.module.scss';

type Props = { onClose: () => void };

const IssueMembership = ({ onClose }: Props) => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);

    const handleCreateWallet = (formValues) => {
        setIsLoading(true);
        if (formValues.bpn) {
            const param = {
                bpn: formValues.bpn,
            };
            postIssueMembership(param)
                .then((res) => {
                    getAlert('success', t('VC_MANAGEMENT.CREDENTIAL_ISSUED_MSG'));

                    onClose();
                })
                .catch((error) => {
                    if (error.status !== 400)
                        getAlert('error', error?.title ? error.title : t('MY_CREDS.DELETE_FAILURE'));
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

                            <Button disabled={submitting || !values.bpn} type="submit" fullWidth isLoading={isLoading}>
                                {t('VC_MANAGEMENT.ISSUE_CREDENTIAL')}
                            </Button>
                        </form>
                    );
                }}
            />
        </div>
    );
};

export default IssueMembership;
