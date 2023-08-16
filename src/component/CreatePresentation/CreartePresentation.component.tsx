import React, { useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { Button, CustomInput, CustomSelect, Label } from '@miw/stories';
import { createPresentation } from '@miw/APIs';
import { LoadingType } from '@miw/types/common';
import Styled from './CreartePresentation.module.scss';
import { copyTextToClipboard } from '@miw/utils/helper';
import { getAlert } from '@miw/hooks';
type Props = { didDocument: object };

const CreartePresentation = ({ didDocument }: Props) => {
    const { t } = useTranslation();
    const [isFormSubmittin, setIsFormSubmittin] = useState<LoadingType>('init');
    const [presentData, setPresentData] = useState<object | string>();
    const credsType = [
        { label: 'False', value: 'false' },
        { label: 'True', value: 'true' },
    ];
    const defaultValue = {
        withCreds: credsType[0],
    };
    const handlePresentCreds = (formValues) => {
        setIsFormSubmittin('loading');
        const param = {
            verifiableCredentials: [didDocument],
        };
        const templateParams = {
            withCreds: formValues.withCreds.value,
            audience: formValues.audience,
        };
        createPresentation(templateParams, param)
            .then((res) => {
                setPresentData(res.vp);
                setIsFormSubmittin('success');
            })
            .catch(() => {
                setIsFormSubmittin('failure');
            });
    };

    const handleCopy = () => {
        copyTextToClipboard(JSON.stringify(presentData, null, 2)).then(() => {
            getAlert('info', t('LABELS.COPIED'));
        });
    };

    return (
        <div className={Styled.createContainer}>
            {isFormSubmittin !== 'success' ? (
                <Form
                    initialValues={{ ...defaultValue }}
                    onSubmit={handlePresentCreds}
                    render={({ handleSubmit, values, submitting }) => {
                        return (
                            <form onSubmit={handleSubmit} className={Styled.formSection} autoComplete="off" noValidate>
                                <Field name={'withCreds'}>
                                    {({ input, meta }) => (
                                        <div className={'formControl'}>
                                            <Label isRequired htmlFor={'withCreds'}>
                                                As JWT
                                            </Label>
                                            <div className={Styled.inputSelect}>
                                                <CustomSelect
                                                    {...input}
                                                    defaultValue={{ label: 'False', value: 'false' }}
                                                    closeMenuOnSelect={true}
                                                    isSearchable={true}
                                                    required
                                                    insideDialog={true}
                                                    isCreatable={false}
                                                    id={'credentialType'}
                                                    options={credsType}
                                                    placeholder={'select'}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </Field>
                                {values?.withCreds?.value === 'true' && (
                                    <Field name={'audience'}>
                                        {({ input, meta }) => (
                                            <div className={'formControl'}>
                                                <Label isRequired htmlFor={'audience'}>
                                                    Audience
                                                </Label>
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
                                )}
                                <Button
                                    disabled={
                                        submitting || values?.withCreds?.value === 'true' ? !values.audience : false
                                    }
                                    type="submit"
                                    isLoading={isFormSubmittin === 'loading'}
                                >
                                    {t('VC_MANAGEMENT.CREATE_PRESENTATION')}
                                </Button>
                            </form>
                        );
                    }}
                />
            ) : (
                <pre className={Styled.presantationHolder}>
                    <div className={Styled.copyButtonHolder}>
                        <Button variant="outlined" onClick={handleCopy}>
                            {t('LABELS.COPY_LABEL')}
                        </Button>
                    </div>
                    {typeof presentData === 'object' ? JSON.stringify(presentData, null, 1) : presentData}
                </pre>
            )}
        </div>
    );
};

export default CreartePresentation;
