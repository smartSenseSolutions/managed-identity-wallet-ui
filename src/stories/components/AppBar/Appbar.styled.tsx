import styled from 'styled-components';

export const StyledHeaderContainer = styled.div`
    background: ${({ theme }) => theme.colors.white};
    box-shadow: 0px 2px 10px #c4c4c4;
    padding: 1rem 0;
    position: sticky;
    top: 0;
    z-index: 999;
`;

export const StyledBrandLogo = styled.h1`
    cursor: pointer;
    position: relative;
    margin: 0;
`;

export const StyledListItem = styled.p`
    cursor: pointer;
    position: relative;
    text-align: center;
    font-weight: 600;
    &::after {
        content: '';
        position: absolute;
        height: 0.2rem;
        width: 0;
        bottom: -0.5rem;
        left: 0;
        right: 0;
        margin: 0 auto;
        transition: all 0.3s ease;
        -webkit-transition: all 0.3s ease;
        -moz-transition: all 0.3s ease;
        background: ${({ theme }) => theme.colors.primary};
    }
    &.active {
        ::after {
            width: 100%;
        }
    }
    :hover {
        ::after {
            width: 100%;
        }
    }
`;

export const StyledHeader = styled.div`
    max-width: 1220px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${({ theme }) => theme.colors.secondary};
`;

export const StyledHeaderLeft = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 4rem;

    ul {
        display: flex;
        gap: 4rem;
        padding: 0;
        margin: 0;

        li {
            list-style-type: none;

            &:hover {
                .MuiIconButton-root {
                    opacity: 1;
                }
            }

            .MuiIconButton-root {
                display: flex;
                alingn-items: center;
                color: white;
                flex-flow: column;
                gap: 0.5rem;
                font-size: 1.2rem;
                line-height: 1.5rem;
                font-weight: 500;
                opacity: 0.8;
                position: relative;

                &.active {
                    opacity: 1;
                    &:after {
                        content: '';
                        position: absolute;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        margin: 0 auto;
                        height: 2px;
                        width: 28px;
                        background: ${({ theme }) => theme.colors.redColor};
                    }
                }
            }
        }
    }
`;

export const StyledHeaderLogo = styled.div`
    color: ${({ theme }) => theme.colors.secondary};
`;

export const StyledHeaderRight = styled.div`
    display: flex;
    align-items: center;
    gap: 2.5rem;

    .MuiIconButton-root {
        opacity: 0.8;

        &:hover {
            opacity: 1;
        }
    }
`;

export const StyledUserID = styled.p`
    color: ${({ theme }) => theme.colors.secondary};
    font-weight: 600;
`;

export const StyleUserProfile = styled.div`
    .userIcon {
        height: 4rem;
        width: 4rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: ${({ theme }) => theme.colors.white};
        cursor: pointer;

        img {
            height: 100%;
            width: 100%;
            border-radius: 50%;
        }

        h2 {
            font-size: 2rem;
            line-height: 2.5rem;
            font-weight: 500;
        }
    }
`;
