import {AuthForgotPassword} from "@components/auth/AuthForgotPassword";
import {AuthPage} from "@components/auth/AuthPage";
import {NextPage} from "next";

const AuthForgotPasswordPage: NextPage = () => {
  return <AuthPage title='Forgot Password' content={<AuthForgotPassword />} />;
};

export default AuthForgotPasswordPage;
