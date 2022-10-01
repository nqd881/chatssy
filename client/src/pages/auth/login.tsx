import {AuthLogin} from "@components/auth/AuthLogin";
import {AuthPage} from "@components/auth/AuthPage";
import {NextPage} from "next";

const AuthLoginPage: NextPage = () => {
  return <AuthPage title='Login' content={<AuthLogin />} />;
};

export default AuthLoginPage;
