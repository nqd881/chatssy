import {Formik, FormikConfig} from "formik";
import {useState} from "react";
import {sassClasses} from "@utils";
import {AuthInput} from "./AuthInput";
import {AuthNotification} from "./AuthNotification";
import {AuthSubmitButton} from "./AuthSubmitButton";
import styles from "./Content.module.scss";

const cl = sassClasses(styles);

enum ResetPasswordSide {
  FORM,
  NOTIFICATION,
}

interface ResetPasswordForm {
  new_password: string;
  repeat_new_password: string;
}

interface ResetPasswordFormProps {
  changeSide: (state: ResetPasswordSide) => any;
}

const AuthResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  changeSide,
}) => {
  const formConfig: FormikConfig<ResetPasswordForm> = {
    initialValues: {
      new_password: "",
      repeat_new_password: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  };

  return (
    <Formik {...formConfig}>
      {(form) => (
        <form className={cl("root")} onSubmit={form.handleSubmit}>
          <AuthInput
            placeholder='New password'
            name='new_password'
            type='password'
            required
          />
          <AuthInput
            placeholder='Repeat new password'
            name='repeat_new_password'
            type='password'
            required
          />

          <AuthSubmitButton>Send</AuthSubmitButton>
        </form>
      )}
    </Formik>
  );
};

export const AuthResetPassword = () => {
  const [side, changeSide] = useState(ResetPasswordSide.FORM);

  switch (side) {
    case ResetPasswordSide.FORM:
      return <AuthResetPasswordForm changeSide={changeSide} />;
    case ResetPasswordSide.NOTIFICATION:
      return (
        <AuthNotification message='We have sent an email to your mail. Please check it.' />
      );
  }
};
