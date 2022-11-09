import {ChatApp} from "@components/chat/ChatApp";
import {AppPageWithAppbarLayout} from "@components/shared/AppPageWithAppbarLayout";
import {AppStoreProvider} from "@contexts/AppStoreContext";
import {ChatProvider} from "@contexts/ChatContext";
import {NextPageWithLayout} from "@type";
import {GetServerSideProps} from "next";

type ChatPageProps = {
  initialData: any;
};

const ChatPage: NextPageWithLayout<ChatPageProps> = ({initialData}) => {
  return (
    <AppStoreProvider>
      <ChatProvider>
        <ChatApp />
      </ChatProvider>
    </AppStoreProvider>
  );
};

ChatPage.getLayout = AppPageWithAppbarLayout;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {id} = context.query;

  console.log(
    "Fetch data for chatroom with provided id and return to props for page."
  );

  return {
    props: {
      initialData: {},
    },
  };
};

export default ChatPage;
