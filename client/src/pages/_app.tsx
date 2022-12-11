import {ChakraProvider} from "@chakra-ui/react";
import "@fontsource/montserrat";
import {Hydrate, QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {AppPropsWithLayout} from "@type";
import {useState} from "react";
import theme from "src/styles/theme";

export function reportWebVitals(metric) {
  console.log(metric);
}

function MyApp({Component, pageProps}: AppPropsWithLayout) {
  const [queryClient] = useState(() => new QueryClient());

  const getLayout = Component.getLayout || ((page) => page);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ChakraProvider resetCSS={true} theme={theme}>
          {getLayout(<Component {...pageProps} />)}
        </ChakraProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
