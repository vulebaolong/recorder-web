import AirplayOutlinedIcon from "@mui/icons-material/AirplayOutlined";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import StopRoundedIcon from "@mui/icons-material/StopRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { Box, Button, Container, Stack, Typography, alpha } from "@mui/material";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { RecordRTCPromisesHandler, invokeSaveAsDialog } from "recordrtc";
import Timer from "./components/Timer";

export default function Home() {
    console.log("render Home");

    const videoRef = useRef();
    const [recorder, setRecorder] = useState<RecordRTCPromisesHandler | null>(null);
    const [statusTime, setStatusTime] = useState<"stop" | "start" | "pause">("stop");

    const handleClickSelectTab = async () => {
        if (!videoRef.current) return toast.warn("error not get video element");
        const videoEl = videoRef.current as HTMLVideoElement;

        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
        const recorder = new RecordRTCPromisesHandler(stream, {
            type: "video",
            mimeType: "video/webm",
        });

        videoEl.srcObject = stream;
        videoEl.autoplay = true;

        setRecorder(recorder);
    };

    const handleClickStart = async () => {
        if (!recorder) return;
        if (statusTime === "start") return toast.warning("đang record");

        recorder.startRecording();

        setStatusTime("start");
        // startTime = Date.now();
        // timerInterval = setInterval(updateRecordedTime, 1000);
    };

    const handleClickStop = async () => {
        if (!recorder) return;

        setStatusTime("stop");

        await recorder.stopRecording();

        let blob = await recorder.getBlob();

        invokeSaveAsDialog(blob, "abc.webm");
    };

    const handleClickPause = async () => {
        if (!recorder) return;
        setStatusTime("pause");
        await recorder.pauseRecording();
    };
    const handleClickResume = async () => {
        if (!recorder) return;
        setStatusTime("start");
        await recorder.resumeRecording();
    };
    return (
        <div>
            {/* TITLE */}
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

            <Container>
                <Stack sx={{ px: "100px", mt: "50px", gap: "20px" }}>
                    <Stack sx={{ flexDirection: "row", gap: "10px", alignItems: "center" }}>
                        <Button
                            variant="contained"
                            color="error"
                            startIcon={<AirplayOutlinedIcon />}
                            onClick={handleClickSelectTab}
                        >
                            Select Tab
                        </Button>

                        <Button
                            variant="contained"
                            color="error"
                            startIcon={<FiberManualRecordIcon />}
                            onClick={handleClickStart}
                        >
                            Record
                        </Button>

                        <Button
                            variant="outlined"
                            startIcon={<PauseRoundedIcon />}
                            onClick={handleClickPause}
                        >
                            Pause
                        </Button>

                        <Button
                            variant="contained"
                            color="error"
                            startIcon={<PlayArrowRoundedIcon />}
                            onClick={handleClickResume}
                        >
                            Resume
                        </Button>

                        <Button
                            color="error"
                            variant="contained"
                            startIcon={<StopRoundedIcon />}
                            onClick={handleClickStop}
                        >
                            Stop
                        </Button>

                        <Stack sx={{ flexDirection: "row", gap: "10px", alignItems: "center" }}>
                            <FiberManualRecordIcon color="error" />
                            <Timer statusTime={statusTime} />
                        </Stack>
                    </Stack>
                    <Box
                        ref={videoRef}
                        component={"video"}
                        sx={(theme) => ({
                            "width": "100%",
                            "borderRadius": "10px",
                            "backgroundImage":
                                theme.palette.mode === "light"
                                    ? "linear-gradient(180deg, #CEE5FD, #FFF)"
                                    : `linear-gradient(#02294F, ${alpha("#090E10", 0.0)})`,
                            "backgroundSize": "100% 100%",
                            "backgroundRepeat": "no-repeat",
                            "transition": "outline .3s",
                            "outline": "5px solid #CEE5FD",

                            "&:hover": {
                                outline: "5px solid #CEE5FD",
                            },
                        })}
                        muted
                        // controls
                    ></Box>
                </Stack>
            </Container>
        </div>
    );
}
