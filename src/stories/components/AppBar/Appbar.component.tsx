import React, { useRef, useState } from "react";
import { IconButton, Menu } from "@mui/material";
import Keycloak from "keycloak-js";
// import ThemeIcons from "../../../ThemeIcons";
import {
  StyledHeaderContainer,
  StyledHeader,
  StyledHeaderLeft,
  StyledHeaderLogo,
  StyledHeaderRight,
  StyleUserProfile,
} from "./Appbar.styled";
import {
  ACCESS_TOKEN_KEY,
  HEADER_NAVIGATION_ITEM_ID,
} from "@miw/utils/constant";
import { removeFromStore } from "@miw/utils/helper";
import { useKeycloak } from "@react-keycloak/web";
// import ProfileMenu from "../ProfileMenu";
// import Avatar from "../Avatar";
// import { HEADER_NAVIGATION_ITEM_ID } from "@assessment/util/constants";
// import { getFirstLatterOfString } from "@assessment/util/helper";

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
}: // profileDetails,
AppbarPropMenu) => {
  const auth = useKeycloak();

  // const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  // const myProfileMenuButton = useRef();

  // const toggleMyProfileMenu = () => {
  //   setProfileMenuOpen((i) => !i);
  // };
  // const onMyProfileMenuClick = () => {
  //   setProfileMenuOpen(false);
  // };
  // const renderMyProfileMenu = (
  //   <Menu
  //     anchorEl={myProfileMenuButton.current}
  //     anchorOrigin={{ vertical: "top", horizontal: "right" }}
  //     keepMounted
  //     transformOrigin={{ horizontal: "right", vertical: "top" }}
  //     open={profileMenuOpen}
  //     onClose={toggleMyProfileMenu}
  //     sx={{ mt: "50px" }}
  //     onClick={onMyProfileMenuClick}
  //     classes={{ paper: "myProfilePaper", list: "customMenuListHeader" }}
  //   >
  //     <ProfileMenu profileDetails={profileDetails} auth={keyclockAuth} />
  //   </Menu>
  // );

  const handleLogOut = () => {
    auth.keycloak.logout({ redirectUri: window.location.origin });
    removeFromStore(ACCESS_TOKEN_KEY);
  };
  return (
    <StyledHeaderContainer>
      <StyledHeader>
        <StyledHeaderLeft>
          <StyledHeaderLogo>
            <IconButton className="headerIcon">MIW</IconButton>
          </StyledHeaderLogo>

          <ul>
            {appMenu.map((menu, index) => {
              return (
                <li key={index}>
                  <IconButton
                    id={HEADER_NAVIGATION_ITEM_ID}
                    onClick={(e) => {
                      onHeaderItemClick(e, menu);
                    }}
                    className={selectedTab === menu.tabValue ? "active" : ""}
                  >
                    {menu.tabIcon}
                    {menu.tabName}
                  </IconButton>
                </li>
              );
            })}
          </ul>
        </StyledHeaderLeft>
        <StyledHeaderRight>
          <button onClick={handleLogOut}>logout</button>
        </StyledHeaderRight>
      </StyledHeader>
    </StyledHeaderContainer>
  );
};

export default Appbar;
