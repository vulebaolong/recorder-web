import { CssBaseline, ThemeProvider as ThemeProviderMui } from "@mui/material";
import { ReactNode } from "react";
import { useAppSelector } from "../../../store/store";
import getLPTheme from "./getLPTheme";
import createTheme from "@mui/material/styles/createTheme";

export default function ThemeProvider({ children }: { children: ReactNode }) {
    const { mode } = useAppSelector((state) => state.setting);

    const LPtheme = createTheme(getLPTheme(mode));

    return (
        <ThemeProviderMui theme={LPtheme}>
            <CssBaseline />
            {children}
        </ThemeProviderMui>
    );
}
