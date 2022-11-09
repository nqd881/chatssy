import {Formik, FormikConfig} from "formik";
import {useState} from "react";
import {sassClasses} from "@utils";
import {AuthInput} from "./AuthInput";
import {AuthNotification} from "./AuthNotification";
import {AuthSubmitButton} from "./AuthSubmitButton";
import styles from "./Content.module.scss";
import {useMutation} from "@tanstack/react-query";
import {passwordForgotApi, PasswordForgotData} from "@apis/auth/reset-password";

const cl = sassClasses(styles);

enum ForgotPasswordSide {
  FORM,
  NOTIFICATION,
}

interface ForgotPasswordForm extends PasswordForgotData {}

interface AuthForgotPasswordFormProps {
  changeSide: (state: ForgotPasswordSide) => any;
}

const AuthForgotPasswordForm: React.FC<AuthForgotPasswordFormProps> = ({
  changeSide,
}) => {
  const forgotPassword = useMutation({
    mutationFn: passwordForgotApi,
    onSuccess: () => {
      changeSide(ForgotPasswordSide.NOTIFICATION);
    },
  });

  const formConfig: FormikConfig<ForgotPasswordForm> = {
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      forgotPassword.mutate(values);
    },
  };

  return (
    <Formik {...formConfig}>
      {(form) => (
        <form className={cl("root")} onSubmit={form.handleSubmit}>
          <AuthInput placeholder='Email' type='email' name='email' required />
          <AuthSubmitButton isLoading={false}>Next</AuthSubmitButton>
        </form>
      )}
    </Formik>
  );
};

export const AuthForgotPassword = () => {
  const [side, changeSide] = useState(ForgotPasswordSide.FORM);

  switch (side) {
    case ForgotPasswordSide.FORM:
      return <AuthForgotPasswordForm changeSide={changeSide} />;
    case ForgotPasswordSide.NOTIFICATION:
      return (
        <AuthNotification message='We have sent an email to your mail. Please check it.' />
      );
  }
};
