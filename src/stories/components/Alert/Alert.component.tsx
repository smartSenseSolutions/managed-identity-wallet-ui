import Icons from '../../../Icons';
import { Slide, toast, ToastContentProps, ToastPosition } from 'react-toastify';
import Button from '../Button';
import { StyledToastMessageContent, StyledToastMessageHeader } from './Alert.styled';

type AlertType = 'info' | 'error' | 'success' | 'warning' | 'default';
type AlertValue = { icon: JSX.Element; title: string };

type IconMapType = Record<AlertType, AlertValue>;

const IconMap: IconMapType = {
    success: {
        icon: <Icons.ToastSuccessIcon height={17.5} width={16} />,
        title: 'Success',
    },
    warning: {
        icon: <Icons.ToastWarningIcon height={17.5} width={16.5} />,
        title: 'Warning',
    },
    info: {
        icon: <Icons.ToastInfoIcon height={18} />,
        title: 'Info',
    },
    error: {
        icon: <Icons.ToastErrorIcon height={18} width={17.5} />,
        title: 'Error',
    },
    default: {
        icon: <Icons.ToastInfoIcon height={18} />,
        title: 'Info',
    },
};

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
}

const ToastBody = (props: CustomToastBodyProps): JSX.Element => {
    return (
        <>
            <StyledToastMessageHeader className="toast__header">
                <div className="toast__header-left">
                    {IconMap[props.toastProps.type]?.icon}
                    <h3>{IconMap[props.toastProps.type]?.title}</h3>
                </div>
                <div className="toast__header-right">
                    <span
                        onClick={() => {
                            props.closeToast;
                        }}
                    >
                        <Icons.CloseIcon />
                    </span>
                </div>
            </StyledToastMessageHeader>
            <StyledToastMessageContent>{props.message}</StyledToastMessageContent>
        </>
    );
};

const Alert = ({ type, position, message }: AlertProps): JSX.Element => {
    const notify = () =>
        toast((props: ToastContentProps) => <ToastBody {...props} message={message} />, {
            type,
            autoClose: 5000,
            position,
            className: 'Toastify__toast-main',
            closeButton: false,
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
