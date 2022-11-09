import "@fontsource/montserrat";
import {ChakraProvider} from "@chakra-ui/react";
import {AppPropsWithLayout} from "@type";
import theme from "src/styles/theme";
import {QueryClientProvider, QueryClient, Hydrate} from "@tanstack/react-query";
import {useState} from "react";
import {AppStoreProvider} from "@contexts/AppStoreContext";

function MyApp({Component, pageProps}: AppPropsWithLayout) {
  const [queryClient] = useState(() => new QueryClient());

  const getLayout = Component.getLayout || ((page) => page);

  return (
    // <AppStoreProvider>
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ChakraProvider resetCSS={true} theme={theme}>
          {getLayout(<Component {...pageProps} />)}
        </ChakraProvider>
      </Hydrate>
    </QueryClientProvider>
    // </AppStoreProvider>
  );
}

export default MyApp;
