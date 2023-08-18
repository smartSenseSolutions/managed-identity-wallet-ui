import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';

export const StyledToastContainer = styled(ToastContainer)`
    &&&.Toastify__toast-container {
        width: 38rem !important;
    }

    .Toastify {
        &__toast-container--top-right {
            right: 5rem !important;
        }

        &__toast {
            box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.25);
            width: 36.5rem;
            padding: 2.4rem 3.2rem 3.2rem;
            border-radius: 0;
        }

        &__toast-body {
            align-items: unset;
            margin: 0;
            padding: 0;
        }

        &--animate-icon {
            display: none;
        }

        &__toast--success {
            border-top: 0.8rem solid ${({ theme }) => theme.colors.success};
        }

        &__toast--error {
            border-top: 0.8rem solid ${({ theme }) => theme.colors.error};
        }

        &__toast--info {
            border-top: 0.8rem solid ${({ theme }) => theme.colors.info};
        }

        &__toast--warning {
            border-top: 0.8rem solid ${({ theme }) => theme.colors.warning};
        }
    }
`;

export const StyledToastMessageHeader = styled.div`
    border-bottom: 1px solid ${({ theme }) => theme.colors.enabledInputGray};
    display: flex;
    justify-content: space-between;
    padding-bottom: 2rem;

    .toast__header-left {
        display: flex;
        align-items: center;
        gap: 1.2rem;

        h3 {
            font-size: 1.6rem;
            line-height: 2rem;
        }
    }
`;

export const StyledToastMessageContent = styled.p`
    overflow: auto;
    text-align: justify;
    max-height: 11rem;
    margin-top: 1.8rem;
    padding-right: 0.7rem;
`;

export const StyledButtonContainer = styled.div`
    padding-top: 1em;
    .MuiButton-sizeCompact {
        padding: 0;
    }
`;
