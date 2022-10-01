import {Avatar} from "@chakra-ui/react";
import {VerticalScrollableView} from "@components/shared/VerticalScrollableView";
import React from "react";
import {sassClasses} from "@utils";
import styles from "./MembersTab.module.scss";

const cl = sassClasses(styles);

type MemberDetail = {
  id: string;
  name: string;
  avatar: string;
  lastSeen: string;
};

const members: MemberDetail[] = [
  {
    id: "1",
    name: "No Name Person",
    avatar: "",
    lastSeen: "last seen 2 hours ago",
  },
  {
    id: "2",
    name: "No Name Person",
    avatar: "",
    lastSeen: "last seen 2 hours ago",
  },
  {
    id: "3",
    name: "No Name Person",
    avatar: "",
    lastSeen: "last seen 2 hours ago",
  },
  {
    id: "4",
    name: "No Name Person",
    avatar: "",
    lastSeen: "last seen 2 hours ago",
  },
  {
    id: "5",
    name: "No Name Person",
    avatar: "",
    lastSeen: "last seen 2 hours ago",
  },
  {
    id: "6",
    name: "No Name Person",
    avatar: "",
    lastSeen: "last seen 2 hours ago",
  },
  {
    id: "7",
    name: "No Name Person",
    avatar: "",
    lastSeen: "last seen 2 hours ago",
  },
  {
    id: "8",
    name: "No Name Person",
    avatar: "",
    lastSeen: "last seen 2 hours ago",
  },
  {
    id: "9",
    name: "No Name Person",
    avatar: "",
    lastSeen: "last seen 2 hours ago",
  },
  {
    id: "10",
    name: "No Name Person",
    avatar: "",
    lastSeen: "last seen 2 hours ago",
  },
  {
    id: "11",
    name: "No Name Person",
    avatar: "",
    lastSeen: "last seen 2 hours ago",
  },
  {
    id: "12",
    name: "No Name Person",
    avatar: "",
    lastSeen: "last seen 2 hours ago",
  },
  {
    id: "13",
    name: "No Name Person",
    avatar: "",
    lastSeen: "last seen 2 hours ago",
  },
  {
    id: "14",
    name: "No Name Person",
    avatar: "",
    lastSeen: "last seen 2 hours ago",
  },
  {
    id: "15",
    name: "No Name Person",
    avatar: "",
    lastSeen: "last seen 2 hours ago",
  },
  {
    id: "16",
    name: "No Name Person",
    avatar: "",
    lastSeen: "last seen 2 hours ago",
  },
  {
    id: "17",
    name: "No Name Person",
    avatar: "",
    lastSeen: "last seen 2 hours ago",
  },
  {
    id: "18",
    name: "No Name Person",
    avatar: "",
    lastSeen: "last seen 2 hours ago",
  },
  {
    id: "19",
    name: "No Name Person",
    avatar: "",
    lastSeen: "last seen 2 hours ago",
  },
  {
    id: "20",
    name: "No Name Person",
    avatar: "",
    lastSeen: "last seen 2 hours ago",
  },
];

type MemberProps = {
  data: MemberDetail;
};

const Member: React.FC<MemberProps> = ({data}) => {
  return (
    <div className={cl("Member")}>
      <Avatar className={cl("member-avatar")} src={data.avatar} />
      <div className={cl("member-info")}>
        <div className={cl("member-name")}>{data.name}</div>
        <div className={cl("member-last-seen")}>{data.lastSeen}</div>
      </div>
    </div>
  );
};

export const MembersTab = () => {
  return (
    <VerticalScrollableView>
      <div className={cl("MembersTab")}>
        {members.map((member) => (
          <Member key={member.id} data={member} />
        ))}
      </div>
    </VerticalScrollableView>
  );
};
