import { LogBox } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import Root from "./navigation/Root";
import useColorScheme from "react-native/Libraries/Utilities/useColorScheme";
import { ThemeProvider } from "@emotion/react";
import { darkTheme, lightTheme } from "./theme";
import store from "./redux/config/configStore";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";

export default function App() {
  const queryClient = new QueryClient();

  const isDark = useColorScheme() === "dark";
  // console.log('isDark: ', isDark);

  LogBox.ignoreLogs(["source"]);

  return (
    // 기동 : 다크모드 추가
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
          <Root />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
