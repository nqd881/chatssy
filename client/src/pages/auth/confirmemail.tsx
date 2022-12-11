import {AuthNotification} from "@components/auth/AuthNotification";
import {AuthPage} from "@components/auth/AuthPage";
import {GetServerSideProps, NextPage} from "next";

interface MyProps {
  success: boolean;
}

const AuthConfirmEmailPage: NextPage<MyProps> = ({success}) => {
  const message = success ? "Confirm email success." : "Confirm email failure.";

  return (
    <AuthPage
      title='Confirm Email'
      content={<AuthNotification message={message} />}
    />
  );
};

export const getServerSideProps: GetServerSideProps<MyProps> = async (
  context
) => {
  return {
    props: {success: true},
  };
};

export default AuthConfirmEmailPage;
