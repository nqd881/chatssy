import {Formik, FormikConfig} from "formik";
import {useState} from "react";
import {sassClasses} from "@utils";
import {AuthInput} from "./AuthInput";
import AuthLink from "./AuthLink";
import {AuthSubmitButton} from "./AuthSubmitButton";
import styles from "./Content.module.scss";

const cl = sassClasses(styles);

interface LoginForm {
  username: string;
  password: string;
}

const ThirdPartyLogin = () => {
  return <div></div>;
};

export const AuthLogin = () => {
  const formConfig: FormikConfig<LoginForm> = {
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  };

  return (
    <Formik {...formConfig}>
      {(form) => (
        <form className={cl("root")} onSubmit={form.handleSubmit}>
          <AuthInput placeholder='Username' name='username' required />
          <AuthInput
            placeholder='Password'
            name='password'
            type='password'
            required
          />

          <AuthLink href='/auth/forgotpassword' content='Forgot password?' />
          <AuthSubmitButton>Login</AuthSubmitButton>
          <ThirdPartyLogin />
          <AuthLink
            href='/auth/register'
            content="Don't have an account? Register now"
          />
        </form>
      )}
    </Formik>
  );
};
