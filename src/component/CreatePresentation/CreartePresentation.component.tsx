import React, { useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { Button, CustomInput, CustomSelect, Dialog, IconButton, Label } from '@miw/stories';
import { createPresentation } from '@miw/APIs';
import { LoadingType } from '@miw/types/common';
import Icons from '@miw/Icons';
import { getAlert } from '@miw/hooks';
import ValidatePresentation from '../ValidatePresentation';
import Styled from './CreartePresentation.module.scss';
type Props = { didDocument: object; onClose: () => void };

const CreartePresentation = ({ didDocument, onClose }: Props) => {
    const { t } = useTranslation();
    const [isFormSubmittin, setIsFormSubmittin] = useState<LoadingType>('init');
    const [isOpenDialoge, setIsOpenDialoge] = useState(false);
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
        navigator.clipboard
            .writeText(typeof presentData === 'object' ? JSON.stringify(presentData, null, 1) : presentData)
            .then(() => {
                getAlert('info', t('LABELS.COPIED'));
            });
    };

    const handleValidate = () => {
        setIsOpenDialoge(true);
    };

    return (
        <div className={Styled.createContainer}>
            <div className={Styled.header}>
                <h3 className={Styled.title}>Create Presentation</h3>
                <div className={Styled.action}>
                    {isFormSubmittin === 'success' && (
                        <>
                            <Button variant="outlined" onClick={handleValidate}>
                                {t('VC_MANAGEMENT.VALIDATE')}
                            </Button>
                            <Button variant="outlined" onClick={handleCopy}>
                                {t('LABELS.COPY_LABEL')}
                            </Button>
                        </>
                    )}
                    <IconButton onClick={onClose}>
                        <Icons.CloseIcon />
                    </IconButton>
                </div>
            </div>
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
                    {typeof presentData === 'object' ? JSON.stringify(presentData, null, 1) : presentData}
                </pre>
            )}

            <Dialog
                isOpen={isOpenDialoge}
                showFooter={false}
                header={t('VALIDATION_PRESENTATION.TITLE')}
                key={'Validate'}
                content={<ValidatePresentation didDocument={presentData} />}
                isShowCloseIcon
                onClose={() => setIsOpenDialoge(false)}
            />
        </div>
    );
};

export default CreartePresentation;
