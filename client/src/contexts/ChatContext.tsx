import {useRouter} from "next/router";
import React, {PropsWithChildren, RefObject, useRef, useState} from "react";
import {isUndefined} from "@utils";

type ChatContextValue = {
  chatAppRef: RefObject<HTMLDivElement>;
  currentId: string;
  openRightSide: boolean;
  toggleOpenRightSide: (open?: boolean) => void;
  rightSide: ChatRightSide;
  setRightSide: (side: ChatRightSide) => void;
  handleOpenSide: (side: ChatRightSide) => void;
};

export enum ChatRightSide {
  PROFILE,
  SEARCH,
}

const ChatContext = React.createContext<ChatContextValue>(
  {} as ChatContextValue
);

export const useChatCtx = () => React.useContext(ChatContext);

export const ChatProvider: React.FC<PropsWithChildren> = (props) => {
  const router = useRouter();
  const chatAppRef = useRef<HTMLDivElement>(null);
  const [openRightSide, setOpenRightSide] = useState(false);
  const [rightSide, setRightSide] = useState<ChatRightSide>(
    ChatRightSide.PROFILE
  );

  const toggleOpenRightSide = (open?: boolean) => {
    if (!isUndefined(open)) setOpenRightSide(open as boolean);
    else setOpenRightSide((preOpenRightSide) => !preOpenRightSide);
  };

  const handleOpenSide = (side: ChatRightSide) => {
    if (!openRightSide) toggleOpenRightSide(true);
    else if (rightSide === side) toggleOpenRightSide();
    setRightSide(side);
  };

  const value = {
    chatAppRef,
    currentId: router.query.id as string,
    openRightSide,
    toggleOpenRightSide,
    rightSide,
    setRightSide,
    handleOpenSide,
  };

  return (
    <ChatContext.Provider value={value}>{props.children}</ChatContext.Provider>
  );
};
