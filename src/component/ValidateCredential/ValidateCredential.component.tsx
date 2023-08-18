import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Field, Form } from 'react-final-form';
import { Button, CustomSelect, Label } from '@miw/stories';
import { LoadingType } from '@miw/types/common';
import { copyTextToClipboard } from '@miw/utils/helper';
import { getAlert } from '@miw/hooks';
import { postValidateCreds } from '@miw/APIs/VcManagement.api';
import Styled from './ValidateCredential.module.scss';

const ValidateCredential = ({ didDocument }: { didDocument: object }) => {
    const { t } = useTranslation();
    const [isFormSubmitting, setIsFormSubmitting] = useState<LoadingType>('init');
    const [vcData, setVcData] = useState<object>();
    const credentialType = [
        { label: 'False', value: 'false' },
        { label: 'True', value: 'true' },
    ];

    const defaultValue = {
        withCreds: {
            label: 'False',
            value: 'false',
        },
    };

    const handleCopy = () => {
        copyTextToClipboard(JSON.stringify(vcData, null, 2)).then(() => {
            getAlert('info', t('LABELS.COPIED'));
        });
    };
    const handleCallValidateCredential = (formValues) => {
        const param = didDocument;
        // TODO: need to verify this api response with frontend variable
        postValidateCreds({ withCreds: formValues.withCreds?.value }, param).then((res) => {
            setIsFormSubmitting('success');
            setVcData(res?.vc);
        });
    };
    return (
        <div className="dialogecontainer" onClick={(e) => e.stopPropagation()}>
            {isFormSubmitting !== 'success' ? (
                <Form
                    onSubmit={handleCallValidateCredential}
                    initialValues={{ ...defaultValue }}
                    render={({ handleSubmit }) => {
                        return (
                            <form onSubmit={handleSubmit} className={Styled.formSection} autoComplete="off" noValidate>
                                <Field name={'withCreds'}>
                                    {({ input }) => (
                                        <div className={'formControl'}>
                                            <Label isRequired htmlFor={'withCreds'}>
                                                withCredentialExpiryDate
                                            </Label>
                                            <div className={Styled.inputSelect}>
                                                <CustomSelect
                                                    {...input}
                                                    closeMenuOnSelect={true}
                                                    isSearchable={true}
                                                    required
                                                    insideDialog={true}
                                                    isCreatable={false}
                                                    id={'credentialType'}
                                                    options={credentialType}
                                                    placeholder={'select'}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </Field>
                                <Button fullWidth type="submit">
                                    Validate
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
                    {JSON.stringify(vcData, null, 2)}
                </pre>
            )}
        </div>
    );
};
export default ValidateCredential;
