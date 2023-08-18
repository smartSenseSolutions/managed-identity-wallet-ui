import { Button, CustomInput, CustomSelect, CustomTextArea, Label } from '@miw/stories';
import React, { useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { postIssueGenericCredential } from '@miw/APIs/VcManagement.api';
import Styled from './IssueGenericCreds.module.scss';
import { getAlert } from '@miw/hooks';

type Props = { onClose: () => void };

const IssueGenericCreds = ({ onClose }: Props) => {
    const revocationOptions = [
        { label: 'False', value: 'false' },
        { label: 'True', value: 'true' },
    ];

    const defaultValue = {
        withRevocation: {
            label: 'False',
            value: 'false',
        },
    };

    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const handleCreateWallet = (formValues) => {
        setIsLoading(true);
        const param = formValues.json;
        postIssueGenericCredential({ holderDid: formValues.bpn, revocable: formValues.revocable.value }, param)
            .then((res) => {
                getAlert('success', t('VC_MANAGEMENT.CREDENTIAL_ISSUED_MSG'));
                onClose();
            })
            .catch((err) => {
                if (err.status !== 400) getAlert('error', err.title);
            })
            .finally(() => {
                setIsLoading(false);
            });
        // }
    };
    return (
        <div className={Styled.createContainer}>
            <Form
                onSubmit={handleCreateWallet}
                initialValues={{ ...defaultValue }}
                render={({ handleSubmit, values, submitting }) => {
                    return (
                        <form onSubmit={handleSubmit} className={'formSection'} autoComplete="off" noValidate>
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
                            <Field name={'json'}>
                                {({ input, meta }) => (
                                    <div className={Styled.formControl}>
                                        <Label isRequired htmlFor={'json'}>
                                            JSON Data
                                        </Label>
                                        <div className={Styled.inputSelect}>
                                            <CustomTextArea {...input} id="json" placeholder={'Enter Json Data'} />
                                        </div>
                                    </div>
                                )}
                            </Field>
                            <Field name={'revocable'}>
                                {({ input, meta }) => (
                                    <div className={'formControl'}>
                                        <Label isRequired htmlFor={'revocable'}>
                                            {t('REVOCATION.REVOCABLE')}
                                        </Label>
                                        <div className={Styled.inputSelect}>
                                            <CustomSelect
                                                {...input}
                                                closeMenuOnSelect={true}
                                                isSearchable={true}
                                                required
                                                insideDialog={true}
                                                isCreatable={false}
                                                id={'revocable'}
                                                options={revocationOptions}
                                                placeholder={'select'}
                                            />
                                        </div>
                                    </div>
                                )}
                            </Field>

                            <Button disabled={submitting || !values.json} type="submit" isLoading={isLoading} fullWidth>
                                {t('VC_MANAGEMENT.ISSUE_CREDENTIAL')}
                            </Button>
                        </form>
                    );
                }}
            />
        </div>
    );
};

export default IssueGenericCreds;
