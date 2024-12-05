import AppRouter from "./router/AppRouter";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <AppRouter />
    </SnackbarProvider>
  );
}

export default App;
