import {IconButton} from "@chakra-ui/react";
import React, {ChangeEvent, useEffect, useState} from "react";
import {BsEmojiSunglasses} from "react-icons/bs";
import {IoMdSend} from "react-icons/io";
import {RiAttachment2} from "react-icons/ri";
import {sassClasses} from "@utils";
import styles from "./MessageInput.module.scss";

import data from "@emoji-mart/data";
import {PickerProps} from "emoji-mart";
import {useRef} from "react";

const cl = sassClasses(styles);

const EmojiPicker: React.FC<PickerProps> = (props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import("emoji-mart").then(({Picker}) => {
      new Picker({...props, data, ref} as PickerProps);
    });
  }, [props]);

  return <div ref={ref} />;
};

type MessageInputProps = {};

export const MessageInput: React.FC<MessageInputProps> = (props) => {
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    const input = inputRef.current;
    if (!input) return;

    input.focus();
  };

  const handleEnterMessage = (ev: ChangeEvent<HTMLInputElement>) => {
    setMessage(ev.target.value);
  };

  return (
    <div className={cl("MessageInput")} onClick={handleClick}>
      <div className={cl("input-container")}>
        <div className={cl("icon-box")}>
          <BsEmojiSunglasses className={cl("input_icon")} />
        </div>
        <input
          className={cl("enter-field")}
          ref={inputRef}
          placeholder='Enter Message'
          type='text'
          value={message}
          onChange={handleEnterMessage}
        />
        <div className={cl("icon-box")}>
          <RiAttachment2 className={cl("input_icon")} />
        </div>
      </div>
      <IconButton
        aria-label='send'
        variant='unstyled'
        className={cl("send_btn")}
        icon={<IoMdSend className={cl("send_icon")} />}
      />
    </div>
  );
};
