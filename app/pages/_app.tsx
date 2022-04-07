import {
  AppProps,
  ErrorComponent,
  useRouter,
  AuthenticationError,
  AuthorizationError,
  ErrorFallbackProps,
  useQueryErrorResetBoundary,
} from "blitz"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import Loading from "../core/components/loading"
import Layout from "app/core/layouts/layout"

const theme = extendTheme({
  colors: {
    brandGreen: {
      100: "#F0F1E7",
      200: "#D9DBC2",
      300: "#C2C69E",
      400: "#ABB079",
      500: "#939959",
      600: "#727746",
      700: "#535633",
      800: "#343620",
      900: "#15160D",
    },
    brandChestnut: {
      100: "#F1ECE7",
      200: "#DBCFC2",
      300: "#C6B29E",
      400: "#B09679",
      500: "#967959",
      600: "#775F46",
      700: "#564533",
      800: "#362B20",
      900: "#16110D",
    },
    brandSilver: {
      100: "#ECECEC",
      200: "#CFCFCF",
      300: "#B2B2B2",
      400: "#959595",
      500: "#787878",
      600: "#6F6F6F",
      700: "#676767",
      800: "#5E5E5E",
      900: "#565656",
    },
  },
  components: {
    Input: {
      baseStyle: {
        field: {
          _hover: {
            borderColor: "#D9DBC2",
            boxShadow: "0 0 0 1px #d9dbc2",
          },
        },
      },
      defaultProps: {
        focusBorderColor: "#535633",
      },
    },
    Button: {
      baseStyle: {
        _focus: {
          boxShadow: "0 0 0 2px #D9DBC2",
        },
      },
      variants: {
        brand: {
          borderWidth: "2px",
          borderColor: "#727746",
          _hover: {
            bgColor: "#939959",
            color: "white",
          },
        },
        "brand-ghost": {
          _hover: {
            bgColor: "#939959",
            color: "white",
          },
        },
        "brand-close": {
          borderWidth: "2px",
          borderColor: "#967959",
          bgColor: "#F1ECE7",
          _hover: {
            bgColor: "#B09679",
            color: "white",
          },
        },
        "brand-chat": {
          color: "#535633",
          minW: "min-content",
          height: "min-content",
          _focus: {
            boxShadow: "0 0 0 1px #D9DBC2",
          },
        },
      },
    },
    Link: {
      baseStyle: {
        _focus: {
          boxShadow: "0 0 0 2px #D9DBC2",
        },
      },
    },
  },
})
export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)
  const router = useRouter()

  return (
    <ChakraProvider theme={theme}>
      <ErrorBoundary
        FallbackComponent={RootErrorFallback}
        resetKeys={[router.asPath]}
        onReset={useQueryErrorResetBoundary().reset}
      >
        <Suspense fallback={<Loading />}>
          <Layout>
            <ErrorBoundary
              FallbackComponent={InnerErrorFallback}
              resetKeys={[router.asPath]}
              onReset={useQueryErrorResetBoundary().reset}
            >
              <Suspense fallback={<Loading />}>{getLayout(<Component {...pageProps} />)}</Suspense>
            </ErrorBoundary>
          </Layout>
        </Suspense>
      </ErrorBoundary>
    </ChakraProvider>
  )
}

function RootErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return <ErrorComponent statusCode={error.statusCode || 400} title={error.message || error.name} />
}

function InnerErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title={
          "Sorry, please login or sign up to see this. If you logged in already, try to reload the page."
        }
      />
    )
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title={error.message || "Sorry, you are not authorized to access this."}
      />
    )
  } else {
    return (
      <ErrorComponent statusCode={error.statusCode || 400} title={error.message || error.name} />
    )
  }
}
