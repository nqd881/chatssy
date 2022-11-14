import {getChatsApi} from "@apis/user/get-chats";
import {useQuery} from "@tanstack/react-query";
import {useMe} from "./useMe";

export const useChats = () => {
  const {data} = useMe();

  return useQuery({
    queryKey: ["chats"],
    queryFn: async () => getChatsApi((data as any)?.user_id),
    enabled: Boolean((data as any)?.user_id),
  });
};
