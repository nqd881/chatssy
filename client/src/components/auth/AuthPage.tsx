import {detectMeApi} from "@apis/auth/detect-me";
import {useMe} from "@hooks/api/useMe";
import {useQuery} from "@tanstack/react-query";
import {sassClasses} from "@utils";
import {AxiosError} from "axios";
import {NextPage} from "next";
import {useRouter} from "next/router";
import {ReactElement} from "react";
import styles from "./AuthPage.module.scss";

const cl = sassClasses(styles);

interface AuthPageProps {
  title: string;
  content: ReactElement;
}

export const AuthPage: NextPage<AuthPageProps> = ({title, content}) => {
  const router = useRouter();

  const me = useMe();

  // const detectMe = useQuery({
  //   queryKey: ["me"],
  //   queryFn: detectMeApi,
  //   staleTime: Infinity,
  //   onError: (err: AxiosError) => {
  //     console.log(err.message);
  //   },
  // });

  // if (detectMe.isLoading) {
  //   return <div>Loading me data</div>;
  // }

  // console.log(detectMe);

  // if (detectMe.error) {
  //   return <div>{detectMe.error.message}</div>;
  // }

  // if ((detectMe.data as any)._id) {
  //   router.push("/apps/chat");
  // }

  // if (me.data) {
  //   router.push("/apps/chat");
  // }

  return (
    <div className={cl("AuthPage")}>
      <div className={cl("box")}>
        <div className={cl("logo")}>Chatssy</div>
        <div className={cl("title")}>{title}</div>
        <div className={cl("content")}>{content}</div>
      </div>
    </div>
  );
};
