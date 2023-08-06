import * as React from 'react';
import { SVGProps } from 'react';
import styled from 'styled-components';

type ColorType = {
    fill?: string;
};

const StyledPath = styled.path<ColorType>`
    fill: ${({ theme, fill }) => (fill ? fill : '#fff')};
`;

const DownIcon = ({ height, width, fill, ...props }: SVGProps<SVGSVGElement>) => (
    <svg width={width} height={height} viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <StyledPath
            d="M5.025 8.04 1.037 4.605a.42.42 0 0 1-.04-.606.453.453 0 0 1 .625-.038l3.696 3.182L9.014 3.96a.453.453 0 0 1 .61.05.42.42 0 0 1-.025.594L5.61 8.04a.454.454 0 0 1-.585 0Z"
            fill={fill}
        />
    </svg>
);

DownIcon.defaultProps = {
    height: 12,
    width: 11,
    fill: '#fff',
};

export default DownIcon;
