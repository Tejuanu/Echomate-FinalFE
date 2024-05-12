import { Provider } from "react-redux";
import store from "src/redux/store";
import ThemeProvider from "theme/index";
import { BrowserRouter } from "react-router-dom";
import Routes from "src/service/routes/Routes";

//css files
import "./App.css";
import AlertComponent from "components/global/Alert";
import Loader from "components/global/Loader";

declare global {
  interface Window {
    amplitude: any;
    FB: any;
    fbAsyncInit: any;
  }
}

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ThemeProvider>
          <AlertComponent />
          <Loader />
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
