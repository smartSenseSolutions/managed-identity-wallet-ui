import { Button, CustomInput, Label } from '@miw/stories';
import React, { useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import Styled from './CreateWallete.module.scss';
import { postCreateWallet } from '@miw/APIs';
import { getAlert } from '@miw/hooks';

type Props = { onClose: () => void };

const CreateWallete = ({ onClose }: Props) => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);

    const handleCreateWallet = (formValues) => {
        setIsLoading(true);
        if (!!formValues.bpn && formValues.name) {
            const param = {
                bpn: formValues.bpn,
                name: formValues.name,
            };
            postCreateWallet(param)
                .then((res) => {
                    getAlert('info', t('WALLET.CREATE.SUCCESS'));
                    onClose();
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
                keepDirtyOnReinitialize
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
                            <Field name={'name'}>
                                {({ input, meta }) => (
                                    <div className={Styled.formControl}>
                                        <Label isRequired htmlFor={'name'}>
                                            {t('WALLET.CREATE.NAME')}
                                            {/* name */}
                                        </Label>
                                        <div className={Styled.inputSelect}>
                                            <CustomInput
                                                {...input}
                                                fullWidth
                                                classname="name"
                                                type="text"
                                                required
                                                placeholder={t('WALLET.CREATE.NAME_PLACEHOLDER')}
                                                id="name"
                                                error={(meta.error && meta.touched) || false}
                                                helperText={meta.error && meta.touched && meta.error}
                                            />
                                        </div>
                                    </div>
                                )}
                            </Field>

                            <Button
                                isLoading={isLoading}
                                disabled={submitting || !values.bpn || !values.name}
                                type="submit"
                            >
                                {t('WALLET.CREATE.CREATE_WALLET')}
                            </Button>
                        </form>
                    );
                }}
            />
        </div>
    );
};

export default CreateWallete;
