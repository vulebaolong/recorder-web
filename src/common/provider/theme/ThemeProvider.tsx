import {
  CssBaseline,
  ThemeProvider as ThemeProviderMui,
  createTheme,
} from "@mui/material";
import { ReactNode } from "react";
import { useAppSelector } from "../../../store/store";
import getLPTheme from "./getLPTheme";

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
