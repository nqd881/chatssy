import "@fontsource/montserrat";
import {ChakraProvider} from "@chakra-ui/react";
// import "reset.css";
import {AppPropsWithLayout} from "@types";
import theme from "src/styles/theme";

function MyApp({Component, pageProps}: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <ChakraProvider resetCSS={true} theme={theme}>
      {getLayout(<Component {...pageProps} />)}
    </ChakraProvider>
  );
}

export default MyApp;
