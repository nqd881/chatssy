import {loginApi} from "@apis/auth/login";
import {useMutation} from "@tanstack/react-query";
import {useRouter} from "next/router";

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: loginApi,
    onSuccess: () => {
      router.push("/apps/chat");
    },
  });
};
