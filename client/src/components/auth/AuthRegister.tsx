import {Text} from "@chakra-ui/react";
import {Formik, FormikConfig} from "formik";
import React, {useState} from "react";
import {sassClasses} from "@utils";
import {AuthInput} from "./AuthInput";
import AuthLink from "./AuthLink";
import {AuthNotification} from "./AuthNotification";
import {AuthSubmitButton} from "./AuthSubmitButton";
import styles from "./Content.module.scss";
import {useMutation} from "@tanstack/react-query";
import {RegisterApiData, registerApi} from "@apis/auth/register";

const cl = sassClasses(styles);

enum RegisterSide {
  FORM,
  NOTIFICATION,
}

interface RegisterForm extends RegisterApiData {}

type AuthRegisterFormProps = {
  changeSide: (state: RegisterSide) => any;
};

const AuthRegisterForm: React.FC<AuthRegisterFormProps> = ({changeSide}) => {
  const register = useMutation({
    mutationFn: registerApi,
    onSuccess: (data, variables, context) => {
      changeSide(RegisterSide.NOTIFICATION);
    },
  });

  // miss birth date
  const formConfig: FormikConfig<RegisterForm> = {
    initialValues: {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      email: "",
    },
    onSubmit: (values) => {
      register.mutate(values);
    },
  };

  return (
    <Formik {...formConfig}>
      {(form) => (
        <form className={cl("root")} onSubmit={form.handleSubmit}>
          <AuthInput placeholder='First name' name='firstName' required />
          <AuthInput placeholder='Last name' name='lastName' required />
          <AuthInput placeholder='Username' name='username' required />
          <AuthInput
            placeholder='Password'
            type='password'
            name='password'
            required
          />
          <AuthInput placeholder='Email' type='email' name='email' required />

          <Text fontSize='sm' m={2}>
            {`By signing up, you confirm that you've read and accepted our User
            Notice and Privacy Policy.`}
          </Text>

          <AuthSubmitButton isLoading={false}>Register</AuthSubmitButton>

          <AuthLink
            href='/auth/login'
            content='Already have an account? Login now'
          />
        </form>
      )}
    </Formik>
  );
};

export const AuthRegister = () => {
  const [side, changeSide] = useState(RegisterSide.FORM);

  switch (side) {
    case RegisterSide.FORM:
      return <AuthRegisterForm changeSide={changeSide} />;
    case RegisterSide.NOTIFICATION:
      return (
        <AuthNotification message='We have sent an email to your mail. Please check it.' />
      );
  }
};
