import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Field, Form } from 'react-final-form';
import { Button, CustomInput, CustomSelect, Label } from '@miw/stories';
import { LoadingType } from '@miw/types/common';
import { postValidatePresentation } from '@miw/APIs/VcManagement.api';
import Styled from './ValidatePresentation.module.scss';

const ValidatePresentation = ({ didDocument }: { didDocument: object | string }) => {
    const { t } = useTranslation();
    const [isFormSubmitting, setIsFormSubmitting] = useState<LoadingType>('init');
    const [vcData, setVcData] = useState<object>();
    const credentialType = [
        { label: 'False', value: 'false' },
        { label: 'True', value: 'true' },
    ];

    const defaultValue = {
        asJwt: {
            label: typeof didDocument !== 'object' ? 'True' : 'False',
            value: typeof didDocument !== 'object' ? 'true' : 'false',
        },
        withCredentialExpiryDate: {
            label: 'True',
            value: 'true',
        },withCredentialRevocation:{
            label: 'True',
            value: 'true',
        }
    };

    const handleCallValidatePresentation = (formValues) => {
        const param = { vp: didDocument };
        const queryParams = {
            audience: formValues?.audience,
            asJwt: formValues.asJwt?.value,
            withCredentialExpiryDate: formValues?.withCredentialExpiryDate.value,
            withCredentialRevocation: formValues?.withCredentialRevocation.value
        };
        setIsFormSubmitting('loading');
        postValidatePresentation(queryParams, param)
            .then((res) => {
                setIsFormSubmitting('success');
                const data = res;
                if (data.vp) {
                    delete data.vp;
                }
                setVcData(data);
            })
            .catch(() => {
                setIsFormSubmitting('failure');
            });
    };
    return (
        <div className="dialogecontainer" onClick={(e) => e.stopPropagation()}>
            {isFormSubmitting !== 'success' ? (
                <Form
                    keepDirtyOnReinitialize
                    onSubmit={handleCallValidatePresentation}
                    initialValues={{ ...defaultValue }}
                    render={({ handleSubmit }) => {
                        return (
                            <form onSubmit={handleSubmit} className={Styled.formSection} autoComplete="off" noValidate>
                                {typeof didDocument !== 'object' && (
                                    <>
                                        <Field name={'audience'}>
                                            {({ input, meta }) => (
                                                <div className={'formControl'}>
                                                    <Label isRequired htmlFor={'audience'}>
                                                        {t('VALIDATION_PRESENTATION.AUDIANCE')}
                                                    </Label>
                                                    <div className={Styled.inputSelect}>
                                                        <CustomInput
                                                            {...input}
                                                            autoFocus
                                                            fullWidth
                                                            classname="audience"
                                                            placeholder={t('WALLET.CREATE.BPN_PLACEHOLDER')}
                                                            type="text"
                                                            required
                                                            id="audience"
                                                            error={(meta.error && meta.touched) || false}
                                                            helperText={meta.error && meta.touched && meta.error}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </Field>
                                        {/* <Field name={'asJwt'}>
                                            {({ input }) => (
                                                <div className={'formControl'}>
                                                    <Label htmlFor={'asJwt'}>
                                                        {t('VALIDATION_PRESENTATION.AS_JWT')}
                                                    </Label>
                                                    <div className={Styled.inputSelect}>
                                                        <CustomSelect
                                                            {...input}
                                                            closeMenuOnSelect={true}
                                                            isSearchable={true}
                                                            required
                                                            insideDialog={true}
                                                            isCreatable={false}
                                                            id={'asJwt'}
                                                            options={credentialType}
                                                            placeholder={'select'}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </Field> */}
                                    </>
                                )}
                                <Field name={'withCredentialExpiryDate'}>
                                    {({ input }) => (
                                        <div className={'formControl'}>
                                            <Label htmlFor={'withCredentialExpiryDate'}>
                                                {t('VALIDATION_PRESENTATION.WITH_CRED_EXP')}
                                            </Label>
                                            <div className={Styled.inputSelect}>
                                                <CustomSelect
                                                    {...input}
                                                    closeMenuOnSelect={true}
                                                    isSearchable={true}
                                                    required
                                                    insideDialog={true}
                                                    isCreatable={false}
                                                    id={'withCredentialExpiryDate'}
                                                    options={credentialType}
                                                    placeholder={'select'}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </Field>

                                <Field name={'withCredentialRevocation'}>
                                    {({ input }) => (
                                        <div className={'formControl'}>
                                            <Label htmlFor={'withCredentialRevocation'}>
                                                {t('VALIDATION_PRESENTATION.WITH_CRED_REVOCATION')}
                                            </Label>
                                            <div className={Styled.inputSelect}>
                                                <CustomSelect
                                                    {...input}
                                                    closeMenuOnSelect={true}
                                                    isSearchable={true}
                                                    required
                                                    insideDialog={true}
                                                    isCreatable={false}
                                                    id={'withCredentialRevocation'}
                                                    options={credentialType}
                                                    placeholder={'select'}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </Field>

                                <Button fullWidth type="submit" isLoading={isFormSubmitting === 'loading'}>
                                    {t('LABELS.VALIDATE')}
                                </Button>
                            </form>
                        );
                    }}
                />
            ) : (
                <pre className={Styled.presantationHolder}>{JSON.stringify(vcData, null, 2)}</pre>
            )}
        </div>
    );
};
export default ValidatePresentation;
