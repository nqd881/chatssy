import {AuthPage} from "@components/auth/AuthPage";
import {AuthResetPassword} from "@components/auth/AuthResetPassword";
import {NextPage} from "next";

const AuthResetPasswordPage: NextPage = () => {
  return <AuthPage title='Reset Password' content={<AuthResetPassword />} />;
};

export default AuthResetPasswordPage;
