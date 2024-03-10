import { Typography } from "@mui/material";

export default function Home() {
  return (
    <div>
      <Typography
        component="h1"
        variant="h1"
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Recorder&nbsp;
        <Typography
          component="span"
          variant="h1"
          sx={{
            color: (theme) =>
              theme.palette.mode === "light" ? "primary.main" : "primary.light",
          }}
        >
          web
        </Typography>
      </Typography>
    </div>
  );
}
