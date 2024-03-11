import { ReactNode } from "react";
import { Provider as ProviderRedux } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { store } from "../../store/store";
import ThemeProvider from "./theme/ThemeProvider";
import "../../styles/index.css";
import "react-toastify/dist/ReactToastify.css";

export default function Provider({ children }: { children: ReactNode }) {
    return (
        <ProviderRedux store={store}>
            <BrowserRouter>
                <ThemeProvider>
                    {children}
                    <ToastContainer
                        position="bottom-right"
                        autoClose={3000}
                        hideProgressBar
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable={false}
                        pauseOnHover
                    />
                </ThemeProvider>
            </BrowserRouter>
        </ProviderRedux>
    );
}
