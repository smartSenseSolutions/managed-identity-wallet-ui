import styled from 'styled-components';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';

type StyledAccordionProps = {
    isGriSummaryAccordion: boolean;
    isFullBorder: boolean;
};

export const StyledAccordion = styled(Accordion)<StyledAccordionProps>`
    &.MuiAccordion-root {
        box-shadow: ${({ isGriSummaryAccordion }) => (isGriSummaryAccordion ? 'none' : '0px 0px 10px #f3f1f1')};
    }

    ${({ isFullBorder, theme }) => {
        if (isFullBorder) {
            return {
                border: `solid 1px ${theme.colors.scrollBar}`,
            };
        }
    }}
`;

type StyledAccordainSummaryProps = {
    isStartIcon: boolean;
    isGriSummaryAccordion: boolean;
};

export const StyledAccordainSummary = styled(AccordionSummary)<StyledAccordainSummaryProps>`
    color: ${({ theme }) => theme.colors.fontColorPrimary};
    font-weight: 600;
    font-size: 1.4rem;
    line-height: 2rem;

    ${({ isStartIcon }) => {
        if (isStartIcon) {
            return {
                flexDirection: 'row-reverse',
                gap: '0.7rem',
            };
        }
    }}

    &.MuiAccordionSummary-root {
        .MuiAccordionSummary-content {
            margin: 1rem 0;

            &.Mui-expanded {
                margin: 1rem 0;
            }
        }
    }
    min-height: 4.8rem !important;

    &.Mui-expanded {
        ${({ isGriSummaryAccordion, theme }) => {
            if (!isGriSummaryAccordion) {
                return {
                    borderBottom: `solid 0.1rem ${theme.colors.scrollBar}`,
                };
            }
        }}
    }
`;

type StyledAccordionDetailsProps = {
    maxHeight?: string;
    isGriSummaryAccordion: boolean;
};

export const StyledAccordionDetails = styled(AccordionDetails)<StyledAccordionDetailsProps>`
    &.MuiAccordionDetails-root {
        max-height: ${({ maxHeight }) => (maxHeight ? maxHeight : '19.2rem')};
        overflow: auto;
        font-weight: 400;
        font-size: 1.4rem;
        line-height: 2rem;
        padding: 0 1.5rem;
        margin: 1.5rem 0;
    }
`;
