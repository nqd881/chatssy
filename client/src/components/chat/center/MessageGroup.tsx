import React from "react";
import {sassClasses} from "@utils";
import {Message} from "./Message";
import styles from "./MessageGroup.module.scss";
import {MessageTest} from "./messages";

const cl = sassClasses(styles);

export type MessageGroupProps = {
  data: MessageTest[];
};

export const MessageGroup: React.FC<MessageGroupProps> = ({data}) => {
  const checkIsMyMessage = (message: MessageTest) => message.send_by == "1";

  const checkIsLastMessage = (index: number) => index === data.length - 1;

  return (
    <div className={cl("MessageGroup")}>
      {data.map((message, index) => (
        <Message
          key={message.id}
          data={message}
          isMyMessage={checkIsMyMessage(message)}
          isLastMessage={checkIsLastMessage(index)}
        />
      ))}
    </div>
  );
};
