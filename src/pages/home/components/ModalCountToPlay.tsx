import { Backdrop, Box, Fade, Modal, Stack, Typography } from "@mui/material";

type TProps = {
    openModalCountToPlay: boolean;
    handleCloseModalCountToPlay: () => void;
    countToPlay: number;
};

export default function ModalCountToPlay({
    openModalCountToPlay,
    handleCloseModalCountToPlay,
    countToPlay,
}: TProps) {
    return (
        <Modal
            open={openModalCountToPlay}
            onClose={handleCloseModalCountToPlay}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
            sx={{
                "& .MuiModal-backdrop": {
                    backdropFilter: "blur(5px)",
                },
            }}
        >
            <Fade in={openModalCountToPlay}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        outline: "none",
                    }}
                >
                    <Stack
                        sx={{
                            alignItems: "center",
                            justifyContent: "center",
                            width: "300px",
                            height: "300px",
                            borderRadius: "20px",
                            background: "white",
                        }}
                    >
                        <Typography
                            variant="h3"
                            sx={{
                                fontSize: "150px",
                                fontWeight: "700",
                                color: (theme) =>
                                    theme.palette.mode === "light"
                                        ? "primary.main"
                                        : "primary.light",
                            }}
                        >
                            {countToPlay}
                        </Typography>
                    </Stack>
                </Box>
            </Fade>
        </Modal>
    );
}
