import { Box, alpha } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../common/header/Header";

export default function MainLayout() {
  return (
    <Box>
      <Box
        sx={(theme) => ({
          zIndex: "-1",
          position: "absolute",
          width: "100%",
          backgroundImage:
            theme.palette.mode === "light"
              ? "linear-gradient(180deg, #CEE5FD, #FFF)"
              : `linear-gradient(#02294F, ${alpha("#090E10", 0.0)})`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          height: "300px",
        })}
      ></Box>
      <Header />
      <Box sx={{ pt: "160px" }}>
        <Outlet />
      </Box>
    </Box>
  );
}
