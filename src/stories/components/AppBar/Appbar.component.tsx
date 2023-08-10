import React from "react";
import { IconButton } from "@mui/material";
import Keycloak from "keycloak-js";
import {
  StyledHeaderContainer,
  StyledHeader,
  StyledHeaderLeft,
  StyledHeaderLogo,
  StyledHeaderRight,
  StyledBrandLogo,
  StyledListItem,
} from "./Appbar.styled";
import {
  ACCESS_TOKEN_KEY,
  HEADER_NAVIGATION_ITEM_ID,
} from "@miw/utils/constant";
import { removeFromStore } from "@miw/utils/helper";
import { useKeycloak } from "@react-keycloak/web";
import Button from "../Button";
import { useTranslation } from "react-i18next";

type AppMenu = {
  tabIcon?: JSX.Element;
  tabName?: string;
  tabValue?: string;
}[];

type AppbarPropMenu = {
  appMenu: AppMenu;
  selectedTab: string;
  onHeaderItemClick: (e: MouseEvent, item) => void;
  keyclockAuth: {
    initialized: boolean;
    keycloak: Keycloak;
  };
  profileDetails: {
    email: string;
    name?: string;
    avatarUrl?: string;
    role?: string;
    title?: string;
  };
};

const Appbar = ({
  appMenu,
  onHeaderItemClick,
  selectedTab,
}: AppbarPropMenu) => {
  const auth = useKeycloak();
  const { t } = useTranslation();
  const handleLogOut = () => {
    auth.keycloak.logout({ redirectUri: window.location.origin });
    removeFromStore(ACCESS_TOKEN_KEY);
  };
  return (
    <StyledHeaderContainer>
      <StyledHeader>
        <StyledHeaderLeft>
          <StyledHeaderLogo>
            <StyledBrandLogo>{t("LABELS.MIW")}</StyledBrandLogo>
          </StyledHeaderLogo>

          <ul>
            {appMenu.map((menu, index) => {
              return (
                <li key={index}>
                  <StyledListItem
                    id={HEADER_NAVIGATION_ITEM_ID}
                    onClick={(e) => {
                      onHeaderItemClick(e, menu);
                    }}
                    className={selectedTab === menu.tabValue ? "active" : ""}
                  >
                    {menu.tabIcon}
                    {menu.tabName}
                  </StyledListItem>
                </li>
              );
            })}
          </ul>
        </StyledHeaderLeft>
        <StyledHeaderRight>
          <Button onClick={handleLogOut}>{t("LABELS.LOGOUT")}</Button>
        </StyledHeaderRight>
      </StyledHeader>
    </StyledHeaderContainer>
  );
};

export default Appbar;
