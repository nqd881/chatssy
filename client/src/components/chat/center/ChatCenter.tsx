import {useChatCenterContext} from "@contexts/ChatCenterContext";
import {useChatCtx} from "@contexts/ChatContext";
import {sassClasses} from "@utils/buildClassName";
import {CenterHeader} from "./CenterHeader";
import styles from "./ChatCenter.module.scss";
import {MessageContextMenu} from "./MessageContextMenu";
import {MessageInput} from "./MessageInput";
import {MessagesView} from "./MessagesView";

const cl = sassClasses(styles);

export const ChatCenter = () => {
  const {openRightSide} = useChatCtx();
  const {centerRef, contextMenuHandlers} = useChatCenterContext();

  const {
    isContextMenuOpen,
    contextMenuPosition,
    closeContextMenu,
    clearContextMenuPosition,
  } = contextMenuHandlers;

  return (
    <div
      ref={centerRef}
      className={cl(["ChatCenter", openRightSide ? "" : "expanded"])}
    >
      <CenterHeader />
      <MessagesView />
      <MessageInput />
      {contextMenuPosition && (
        <MessageContextMenu
          isContextOpen={isContextMenuOpen}
          anchor={contextMenuPosition}
          clearContextMenuPosition={clearContextMenuPosition}
          closeContextMenu={closeContextMenu}
        />
      )}
    </div>
  );
};

export default ChatCenter;
