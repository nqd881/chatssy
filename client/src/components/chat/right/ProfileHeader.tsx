import {Avatar, IconButton} from "@chakra-ui/react";
import React from "react";
import {MdOutlineEdit} from "react-icons/md";
import {sassClasses} from "@utils";
import styles from "./ProfileHeader.module.scss";

const cl = sassClasses(styles);

export const ProfileHeader = () => {
  return (
    <div className={cl("ProfileHeader")}>
      <IconButton
        aria-label=''
        variant='ghost'
        className={cl("edit-btn")}
        icon={<MdOutlineEdit className={cl("edit-icon")} />}
      />
      <Avatar className={cl("profile-avatar")} />
      <div className={cl("profile-name")}>Ho Ngoang</div>
      <div className={cl("profile-last-seen")}>last seen 2 hours ago</div>
    </div>
  );
};
