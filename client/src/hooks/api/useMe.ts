import {detectMeApi} from "@apis/auth/detect-me";
import {useQuery} from "@tanstack/react-query";
import {useRouter} from "next/router";

export const useMe = () => {
  const router = useRouter();

  return useQuery({
    queryKey: ["me"],
    queryFn: detectMeApi,
    onSuccess: () => {
      router.push("/apps/chat");
    },
    onError: () => {
      router.push("/auth/login");
    },
    retry: false,
  });
};
