import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Field, Form } from 'react-final-form';
import { Button, CustomInput, CustomSelect, Label } from '@miw/stories';
import { LoadingType } from '@miw/types/common';
import { copyTextToClipboard } from '@miw/utils/helper';
import { getAlert } from '@miw/hooks';
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
            label: 'False',
            value: 'false',
        },
        withCredentialExpiryDate: {
            label: 'False',
            value: 'false',
        },
    };

    const handleCallValidatePresentation = (formValues) => {
        const param = { vp: didDocument };
        const queryParams = {
            audience: formValues?.audience,
            asJwt: formValues.asJwt?.value,
            withCredentialExpiryDate: formValues?.withCredentialExpiryDate.value,
        };
        postValidatePresentation(queryParams, param).then((res) => {
            setIsFormSubmitting('success');
            const data = res;
            if (data.vp) {
                delete data.vp;
            }
            setVcData(data);
        });
    };
    return (
        <div className="dialogecontainer" onClick={(e) => e.stopPropagation()}>
            {isFormSubmitting !== 'success' ? (
                <Form
                    onSubmit={handleCallValidatePresentation}
                    initialValues={{ ...defaultValue }}
                    render={({ handleSubmit }) => {
                        return (
                            <form onSubmit={handleSubmit} className={Styled.formSection} autoComplete="off" noValidate>
                                <Field name={'audience'}>
                                    {({ input, meta }) => (
                                        <div className={'formControl'}>
                                            <Label htmlFor={'audience'}>{t('VALIDATION_PRESENTATION.AUDIANCE')}</Label>
                                            <div className={Styled.inputSelect}>
                                                <CustomInput
                                                    {...input}
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
                                <Field name={'asJwt'}>
                                    {({ input }) => (
                                        <div className={'formControl'}>
                                            <Label htmlFor={'asJwt'}>{t('VALIDATION_PRESENTATION.AS_JWT')}</Label>
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
                                </Field>
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
                                <Button fullWidth type="submit">
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
