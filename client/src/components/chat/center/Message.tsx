import {Avatar, Checkbox} from "@chakra-ui/react";
import {useChatCenterContext} from "@contexts/ChatCenterContext";
import React, {useRef} from "react";
import {sassClasses} from "@utils";
import styles from "./Message.module.scss";

const cl = sassClasses(styles);

export type MessageProps = {
  data: {
    id: string | number;
    message: string;
    time: Date;
  };
  isMyMessage: boolean;
  isLastMessage?: boolean;
};

export const Message: React.FC<MessageProps> = ({
  data,
  isMyMessage,
  isLastMessage,
}) => {
  const {message, time} = data;
  const ref = useRef<HTMLDivElement>(null);
  const {selectMessageHandlers, contextMenuHandlers, setCurrentMessage} =
    useChatCenterContext();
  const {selectedMessagesCount, toggleSelectMessage, isSelectedMessage} =
    selectMessageHandlers;
  const isSelected = isSelectedMessage(data.id as string);
  const {openContextMenu} = contextMenuHandlers;

  const handleSelectMessage = () => {
    toggleSelectMessage(data.id as string);
  };

  const handleContextMenu = (ev: React.MouseEvent) => {
    openContextMenu(ev);
    setCurrentMessage(data.id as string);
  };

  const fullClassName = cl([
    "Message",
    isMyMessage ? "my-message" : "your-message",
    isLastMessage ? "last-message" : "",
    isSelected ? "is-selected" : "",
    selectedMessagesCount ? "mode-select" : "",
  ]);

  return (
    <div
      ref={ref}
      className={fullClassName}
      onContextMenu={handleContextMenu}
      onClick={selectedMessagesCount ? handleSelectMessage : undefined}
    >
      <Checkbox
        className={cl("checkbox")}
        colorScheme='green'
        isChecked={isSelected}
      />
      <div className={cl("content")}>
        <Avatar className={cl("avatar")} />
        <div className={cl("bubble")}>
          <span>{message}</span>
        </div>
      </div>
      <div className={cl("openable-context-menu")} />
    </div>
  );
};
