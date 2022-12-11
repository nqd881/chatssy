import {detectMeApi} from "@apis/auth/detect-me";
import {useQuery} from "@tanstack/react-query";

export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: detectMeApi,
    retry: false,
  });
};
