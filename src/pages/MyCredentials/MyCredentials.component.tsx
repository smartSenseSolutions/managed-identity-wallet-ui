import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Button, CustomAccordian, CustomInput, Dialog, Pagination } from '@miw/stories';
import { WalletProps } from '@miw/models';
import { deleteCredential, getCredentials } from '@miw/APIs/MyCredentials.api';
import { RECORDS_PER_PAGE } from '@miw/utils/constant';
import { copyTextToClipboard, formatDate, getUTCOfsetToZero } from '@miw/utils/helper';
import { getAlert } from '@miw/hooks';
import { CreartePresentation, ValidateCredential } from '@miw/component';
import StyledHeader from '../VcMAnagement/VcManagemanegement.module.scss';

type Props = {
    title: string;
    type: string;
    issueDate: string;
    didDocument: object;
    postDeleteAPI: () => void;
};

const WalletAccordianHeader = ({ title, type, issueDate, didDocument, postDeleteAPI }: Props) => {
    const { t } = useTranslation();
    const [isLopading, setIsLopading] = useState(false);
    const [isOpenDialoge, setIsOpenDialoge] = useState(false);
    const [isOpenPresentDialoge, setIsOpenPresentDialoge] = useState(false);
    const handleValidateCredential = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setIsOpenDialoge(true);
    };
    const handleDeleteCreds = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        setIsLopading(true);
        deleteCredential({ id: encodeURIComponent(didDocument.id) })
            .then((res) => {
                getAlert('success', res ? res : t('MY_CREDS.DELETE_SUCCESS'));
                postDeleteAPI();
            })
            .catch((err) => {
                if (err.status !== 400) getAlert('error', err?.title ? err.title : t('MY_CREDS.DELETE_FAILURE'));
            })
            .finally(() => {
                setIsLopading(false);
            });
    };
    return (
        <div className={StyledHeader.headerContainer}>
            <h3 className={StyledHeader.title}>{title}</h3>
            <p className={StyledHeader.type}>{type}</p>
            <p className={StyledHeader.type}>{formatDate(getUTCOfsetToZero(issueDate), 'yyyy-MM-dd | HH:mm:ss')}</p>
            <div className={StyledHeader.buttonGroup} onClick={(e) => e.stopPropagation()}>
                <Button onClick={(e) => handleValidateCredential(e)}>{t('VC_MANAGEMENT.VALIDATE')}</Button>
                <Button onClick={() => setIsOpenPresentDialoge(true)}>{t('VC_MANAGEMENT.CREATE_PRESENTATION')}</Button>
                <Button isLoading={isLopading} onClick={handleDeleteCreds}>
                    {t('LABELS.DELETE')}
                </Button>
            </div>
            <div className={StyledHeader.dialogue} onClick={(e) => e.stopPropagation()}>
                <Dialog
                    isOpen={isOpenDialoge}
                    showFooter={false}
                    header="Validate"
                    key={'Validate'}
                    content={<ValidateCredential didDocument={didDocument} />}
                    // minHeight="30rem"
                    isShowCloseIcon
                    onClose={() => setIsOpenDialoge(false)}
                />
                <Dialog
                    isOpen={isOpenPresentDialoge}
                    showFooter={false}
                    showHeader={false}
                    header="Create Presentation"
                    key={'Create Presentation'}
                    content={
                        <CreartePresentation didDocument={didDocument} onClose={() => setIsOpenPresentDialoge(false)} />
                    }
                    // minHeight="30rem"
                    isShowCloseIcon
                    onClose={() => setIsOpenPresentDialoge(false)}
                />
            </div>
        </div>
    );
};

const WalleteDetails = ({ didJson }: { didJson: WalletProps }) => {
    const { t } = useTranslation();
    const handleCopy = () => {
        copyTextToClipboard(JSON.stringify(didJson, null, 2)).then(() => {
            getAlert('info', t('LABELS.COPIED'));
        });
    };
    return (
        <div className={StyledHeader.bodyContainer}>
            <pre className={StyledHeader.jsonContainer}>{JSON.stringify(didJson, null, 2)}</pre>
            <div className={StyledHeader.copyButtonHolder}>
                <Button variant="outlined" onClick={handleCopy}>
                    {t('LABELS.COPY_LABEL')}
                </Button>
            </div>
        </div>
    );
};

const MyCredentials = () => {
    const currentPageNumber = 0;
    const { t } = useTranslation();
    const [walletList, setWalletList] = useState(null);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [searchBPN, setSearchBPN] = useState('');
    const [searchType, setSearchType] = useState('');
    const [currentSelectedPage, setCurrentSelectedPage] = useState<number>(currentPageNumber);

    useEffect(() => {
        callGetMyWallet();
    }, [searchBPN, currentSelectedPage, searchType]);

    const callGetMyWallet = () => {
        setIsLoading(true);
        const param = {
            issuerIdentifier: searchBPN,
            type: searchType,
            pageNumber: `${currentSelectedPage}`,
            size: RECORDS_PER_PAGE,
            sortColumn: 'createdAt',
            sortBy: 'desc',
        };

        getCredentials(param)
            .then((res) => {
                setTotalCount(res.totalElements);
                setWalletList(res.content);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleChangePagination = (value: number) => {
        setCurrentSelectedPage(value - 1);
    };
    return (
        <section className={StyledHeader.container}>
            <div className={StyledHeader.header}>
                <h2 className={StyledHeader.title}>{t('MY_CREDS.TITLE')}</h2>
            </div>
            <div className={StyledHeader.walleteBody}>
                <div className={StyledHeader.tHeader}>
                    <div>
                        <h3 className="thead">{t('HEADER.CRED_ID')}</h3>
                        <CustomInput
                            value={searchBPN}
                            placeholder="Search Credential...."
                            onChange={(e) => setSearchBPN(e)}
                            id={'credentialId'}
                        />
                    </div>
                    <div>
                        <h3 className="thead">{t('HEADER.TYPE')}</h3>
                        <CustomInput
                            value={searchType}
                            placeholder="Search Type...."
                            onChange={(e) => setSearchType(e)}
                            id={'credentialId'}
                        />
                    </div>
                    <h3 className="thead">{t('HEADER.CREATED_AT')}</h3>
                    <h3 className="thead"></h3>
                </div>
                <div className={StyledHeader.listContainer}>
                    {isLoading ? (
                        <div className="tableLoading">
                            <CircularProgress size="30px" />
                        </div>
                    ) : walletList?.length > 0 ? (
                        walletList.map((wallet, index) => {
                            return (
                                <CustomAccordian
                                    key={wallet.did}
                                    maxHeight={'fit-content'}
                                    id={wallet.did}
                                    ariaControls={''}
                                    expandIcon={undefined}
                                    accordionHeader={
                                        <WalletAccordianHeader
                                            title={
                                                wallet.credentialSubject[0]?.holderIdentifier
                                                    ? wallet.credentialSubject[0]?.holderIdentifier
                                                    : wallet.credentialSubject[0]?.bpn
                                            }
                                            didDocument={wallet}
                                            issueDate={wallet.issuanceDate}
                                            type={wallet.type[1]}
                                            postDeleteAPI={() => callGetMyWallet()}
                                        />
                                    }
                                    accordionBody={<WalleteDetails didJson={wallet} />}
                                />
                            );
                        })
                    ) : (
                        <h3 className={'no_data_found'}>{t('LABELS.NO_DATA_FOUND')}</h3>
                    )}
                    {totalCount > 5 && (
                        <div className={StyledHeader.paginationContainer}>
                            <Pagination
                                rowCount={totalCount}
                                onChangePage={(e) => handleChangePagination(e)}
                                currentPage={currentSelectedPage + 1}
                            />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default MyCredentials;
