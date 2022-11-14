import {getBasicProfileApi} from "@apis/user/get-basic-profile";
import {useQuery} from "@tanstack/react-query";

export const useBasicProfile = (userID: string) => {
  return useQuery({
    queryKey: ["basic-profile", userID],
    queryFn: async () => getBasicProfileApi(userID),
  });
};
