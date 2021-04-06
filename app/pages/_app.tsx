import {
  AppProps,
  ErrorComponent,
  useRouter,
  AuthenticationError,
  AuthorizationError,
  ErrorFallbackProps,
} from "blitz"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { queryCache } from "react-query"
import LoginForm from "app/auth/components/LoginForm"
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import Loading from "../components/loading"

const theme = extendTheme({
  colors: {
    brandGreen: {
      100: "#B3B885",
      200: "#ABB079",
      300: "#9CA261",
      400: "#9CA261",
      500: "#939959",
      600: "#868C52",
      700: "#7C814C",
      800: "#727746",
      900: "#676C3F",
    },
    brandChestnut: {
      100: "#B89F85",
      200: "#B09679",
      300: "#A98C6D",
      400: "#A28361",
      500: "#967959",
      600: "#8C7052",
      700: "#81684C",
      800: "#775F46",
      900: "#6C563F",
    },
    brandSilver: {
      100: "#9E9E9E",
      200: "#959595",
      300: "#8B8B8B",
      400: "#828282",
      500: "#787878",
      600: "#6F6F6F",
      700: "#676767",
      800: "#5E5E5E",
      900: "#565656",
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
        onReset={() => {
          // This ensures the Blitz useQuery hooks will automatically refetch
          // data any time you reset the error boundary
          queryCache.resetErrorBoundaries()
        }}
      >
        <Suspense fallback={<Loading />}>{getLayout(<Component {...pageProps} />)}</Suspense>
      </ErrorBoundary>
    </ChakraProvider>
  )
}

function RootErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <LoginForm onSuccess={resetErrorBoundary} />
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent statusCode={error.statusCode || 400} title={error.message || error.name} />
    )
  }
}
