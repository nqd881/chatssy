import {VerticalScrollableView} from "@components/shared/VerticalScrollableView";
import React from "react";
import {sassClasses} from "@utils";
import {MessageGroup} from "./MessageGroup";
import {createMessageGroups, message_data} from "./messages";
import styles from "./MessagesView.module.scss";

type MessageViewProps = {};

const cl = sassClasses(styles);

const groups = createMessageGroups(message_data);

export const MessagesView: React.FC<MessageViewProps> = () => {
  return (
    <div className={cl("MessagesView")}>
      <VerticalScrollableView>
        {groups.map((group) => (
          <MessageGroup key={group[0].id} data={group} />
        ))}
      </VerticalScrollableView>
    </div>
  );
};
