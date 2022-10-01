import {AuthPage} from "@components/auth/AuthPage";
import {AuthRegister} from "@components/auth/AuthRegister";
import {NextPage} from "next";

const AuthRegisterPage: NextPage = () => {
  return <AuthPage title='Register' content={<AuthRegister />} />;
};

export default AuthRegisterPage;
