import {Text} from "@chakra-ui/react";
import {Formik, FormikConfig} from "formik";
import React, {useState} from "react";
import {sassClasses} from "@utils";
import {AuthInput} from "./AuthInput";
import AuthLink from "./AuthLink";
import {AuthNotification} from "./AuthNotfication";
import {AuthSubmitButton} from "./AuthSubmitButton";
import styles from "./Content.module.scss";

const cl = sassClasses(styles);

enum RegisterSide {
  FORM,
  NOTIFICATION,
}

interface RegisterForm {
  username: string;
  password: string;
  name: string;
  email: string;
  phone?: string;
}

type AuthRegisterFormProps = {
  changeSide: (state: RegisterSide) => any;
};

const AuthRegisterForm: React.FC<AuthRegisterFormProps> = ({changeSide}) => {
  const formConfig: FormikConfig<RegisterForm> = {
    initialValues: {
      username: "",
      password: "",
      name: "",
      email: "",
      phone: "",
    },
    onSubmit: (values) => {
      changeSide(RegisterSide.NOTIFICATION);
    },
  };

  return (
    <Formik {...formConfig}>
      {(form) => (
        <form className={cl("root")} onSubmit={form.handleSubmit}>
          <AuthInput placeholder='Username' name='username' required />
          <AuthInput
            placeholder='Password'
            type='password'
            name='password'
            required
          />
          <AuthInput placeholder='Name' name='name' required />
          <AuthInput placeholder='Email' type='email' name='email' required />
          <AuthInput placeholder='Phone' name='phone' />

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
