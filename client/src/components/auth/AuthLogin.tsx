import {Formik, FormikConfig} from "formik";
import {useState} from "react";
import {sassClasses} from "@utils";
import {AuthInput} from "./AuthInput";
import AuthLink from "./AuthLink";
import {AuthSubmitButton} from "./AuthSubmitButton";
import styles from "./Content.module.scss";
import {useMutation} from "@tanstack/react-query";
import {loginApi} from "@apis/auth/login";
import {useRouter} from "next/router";
import {useAppStore} from "@contexts/AppStoreContext";

const cl = sassClasses(styles);

interface LoginForm {
  username: string;
  password: string;
}

const ThirdPartyLogin = () => {
  return <div></div>;
};

export const AuthLogin = () => {
  const router = useRouter();

  const login = useMutation({
    mutationFn: loginApi,
    onSuccess: (result) => {
      router.push("/apps/chat");
    },
  });

  const formConfig: FormikConfig<LoginForm> = {
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      login.mutate(values);
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
