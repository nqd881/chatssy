import {ChakraInputProps, ChatssyInput} from "@components/chatssy-ui";
import {FieldHookConfig, useField} from "formik";
import React from "react";

type AuthInputProps<V = any> = ChakraInputProps & FieldHookConfig<V>;

export const AuthInput: React.FC<AuthInputProps> = (props) => {
  const [field, meta] = useField(props);
  const {touched, error} = meta;

  return <ChatssyInput {...field} {...(props as ChakraInputProps)} />;
};
