import React, { Children } from "react";
// import Icons from '../../../Icons';
import {
  StyledAccordainSummary,
  StyledAccordion,
  StyledAccordionDetails,
} from "./Accordian.styled";
import { Theme } from "../../../theme/default";
import Icons from "@miw/Icons";

type Props = {
  id: string;
  ariaControls: string;
  isStartIcon: boolean;
  expandIcon: JSX.Element;
  isGriSummaryAccordion: boolean;
  accordionHeader: string | JSX.Element;
  accordionBody: string | JSX.Element;
  isFullBorder?: boolean;
  maxHeight?: string;
  expanded?: boolean | undefined;
};

const CustomAccordian = ({
  id,
  ariaControls,
  isStartIcon,
  expandIcon,
  isGriSummaryAccordion = false,
  accordionHeader,
  accordionBody,
  isFullBorder,
  expanded,
  maxHeight,
}: Props): JSX.Element => {
  return (
    <StyledAccordion
      expanded={expanded}
      isGriSummaryAccordion={isGriSummaryAccordion}
      isFullBorder={isFullBorder}
    >
      <StyledAccordainSummary
        isStartIcon={isStartIcon}
        expandIcon={expandIcon}
        aria-controls={ariaControls}
        id={id}
        isGriSummaryAccordion={isGriSummaryAccordion}
      >
        {accordionHeader}
      </StyledAccordainSummary>
      <StyledAccordionDetails
        maxHeight={maxHeight}
        isGriSummaryAccordion={isGriSummaryAccordion}
      >
        {accordionBody}
      </StyledAccordionDetails>
    </StyledAccordion>
  );
};

CustomAccordian.defaultProps = {
  isStartIcon: false,
  isGriSummaryAccordion: false,
  isFullBorder: false,
  expandIcon: (
    <Icons.DownIcon fill={Theme.colors.iconDarkGray} width={15} height={13} />
  ),
};

export default CustomAccordian;
