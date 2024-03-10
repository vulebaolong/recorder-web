import { PaletteMode } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import ModeNightRoundedIcon from "@mui/icons-material/ModeNightRounded";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import { SET_MODE } from "../../../store/slices/setting/setting.slice";
import { useAppDispatch, useAppSelector } from "../../../store/store";

function ToggleColorMode() {
  const { mode } = useAppSelector((state) => state.setting);
  const dispatch = useAppDispatch();

  const toggleColorMode = () => {
    dispatch(SET_MODE());
  };
  return (
    <Box sx={{ maxWidth: "32px" }}>
      <Button
        variant="text"
        onClick={toggleColorMode}
        size="small"
        aria-label="button to toggle theme"
        sx={{ minWidth: "32px", height: "32px", p: "4px" }}
      >
        {mode === "dark" ? (
          <WbSunnyRoundedIcon fontSize="small" />
        ) : (
          <ModeNightRoundedIcon fontSize="small" />
        )}
      </Button>
    </Box>
  );
}

export default ToggleColorMode;
