import React from 'react';
import { Slide, toast, ToastContentProps, ToastPosition } from 'react-toastify';
import Button from '../Button';
import { StyledButtonContainer, StyledToastMessageContent } from './Alert.styled';
import { Dialog } from '@miw/stories';

type AlertType = 'info' | 'error' | 'success' | 'warning' | 'default' | 'apiError';
type AlertProps = {
    /**
     * Type of message you want to convey to the user
     */
    type: AlertType;
    /**
     *  Message that you want to convey
     */
    message: string;
    /**
     * Position of the toast
     */
    position: ToastPosition;
};

interface CustomToastBodyProps extends ToastContentProps {
    message: string;
    type: AlertType;
    additionalDetails?: object;
}

const ToastBody = (props: CustomToastBodyProps): JSX.Element => {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <>
            <StyledToastMessageContent>{props.message}</StyledToastMessageContent>
            {props.type === 'apiError' && (
                <StyledButtonContainer>
                    <Button
                        variant="text"
                        buttonTextColor={'red'}
                        size="compact"
                        onClick={() => {
                            setIsOpen(true);
                        }}
                    >
                        Show more
                    </Button>
                </StyledButtonContainer>
            )}
            <Dialog
                showFooter={false}
                content={
                    <>
                        <pre>{JSON.stringify(props?.additionalDetails, null, 2)}</pre>
                    </>
                }
                isShowCloseIcon
                onCancel={() => setIsOpen(false)}
                onClose={() => setIsOpen(false)}
                header="API failure"
                isOpen={isOpen}
            />
        </>
    );
};

const Alert = ({ type, position, message }: AlertProps): JSX.Element => {
    const notify = () =>
        toast((props: ToastContentProps) => <ToastBody {...props} message={message} type={type} />, {
            type: type === 'apiError' ? 'error' : type,
            autoClose: 5000,
            position,
            className: 'Toastify__toast-main',
            closeButton: true,
            hideProgressBar: false,
            transition: Slide,
            closeOnClick: true,
            pauseOnHover: true,
        });

    return (
        <Button variant="contained" onClick={notify}>
            Click to show alert
        </Button>
    );
};

Alert.defaultProps = {
    type: 'info',
    position: 'top-right',
    message: 'Something Happened...',
};

export default Alert;
export { toast, ToastBody, Slide };
export type { ToastPosition };
