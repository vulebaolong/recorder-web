import AirplayOutlinedIcon from "@mui/icons-material/AirplayOutlined";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import StopRoundedIcon from "@mui/icons-material/StopRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import {
    Backdrop,
    Box,
    Button,
    Container,
    Fade,
    Modal,
    Stack,
    Typography,
    alpha,
} from "@mui/material";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { RecordRTCPromisesHandler, invokeSaveAsDialog } from "recordrtc";
import Timer from "./components/Timer";
import ModalCountToPlay from "./components/ModalCountToPlay";

let countToPlayInterval: number | undefined = undefined;

export default function Home() {
    const videoRef = useRef();
    const [recorder, setRecorder] = useState<RecordRTCPromisesHandler | null>(null);
    const [statusTime, setStatusTime] = useState<"stop" | "play" | "pause">("stop");
    const [openModalCountToPlay, setOpenModalCountToPlay] = useState(false);
    const [countToPlay, setCountToPlay] = useState(3);
    const [stream, setStream] = useState<MediaStream | null>(null);

    const handleClickSelectTab = async () => {
        if (!videoRef.current) return toast.warn("error not get video element");
        const videoEl = videoRef.current as HTMLVideoElement;

        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
        setStream(stream);
        const recorder = new RecordRTCPromisesHandler(stream, {
            type: "video",
            mimeType: "video/webm",
        });

        videoEl.srcObject = stream;
        videoEl.autoplay = true;

        setRecorder(recorder);
    };

    const handleClickPlay = async () => {
        if (!recorder) return;
        if (statusTime === "play") return toast.warning("đang record");
        if (countToPlayInterval) return console.log("đã có countToPlayInterval");

        setOpenModalCountToPlay(true);

        countToPlayInterval = setInterval(() => {
            console.log("setInterval đang chạy");

            setCountToPlay((prevCount) => {
                if (prevCount === 0) {
                    clearInterval(countToPlayInterval);
                    countToPlayInterval = undefined;
                    setOpenModalCountToPlay(false);
                    recorder.startRecording();
                    setStatusTime("play");
                    return 3;
                }
                return prevCount - 1;
            });
        }, 1000);
    };

    const handleClickStop = async () => {
        if (!recorder) return;

        setStatusTime("stop");

        await recorder.stopRecording();

        setRecorder(null);

        let blob = await recorder.getBlob();

        invokeSaveAsDialog(blob, "abc.webm");

        if (stream) {
            stream.getTracks().forEach((track) => track.stop());
            setStream(null);
        }
    };

    const handleClickPause = async () => {
        if (!recorder) return;
        setStatusTime("pause");
        await recorder.pauseRecording();
    };

    const handleClickResume = async () => {
        if (!recorder) return;
        setStatusTime("play");
        await recorder.resumeRecording();
    };

    const handleCloseModalCountToPlay = () => setOpenModalCountToPlay(false);

    return (
        <>
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
                        {/* CONTROL */}
                        <Stack sx={{ flexDirection: "row", gap: "10px", alignItems: "center" }}>
                            {/* SELECT TAB */}
                            {statusTime === "stop" && !recorder && (
                                <Button
                                    variant="contained"
                                    color="error"
                                    startIcon={<AirplayOutlinedIcon />}
                                    onClick={handleClickSelectTab}
                                >
                                    Select Tab
                                </Button>
                            )}

                            {/* RECORD */}
                            {statusTime === "stop" && recorder && (
                                <Button
                                    variant="contained"
                                    color="error"
                                    startIcon={<FiberManualRecordIcon />}
                                    onClick={handleClickPlay}
                                >
                                    Record
                                </Button>
                            )}

                            {/* PAUSE */}
                            {statusTime === "play" && recorder && (
                                <Button
                                    variant="outlined"
                                    startIcon={<PauseRoundedIcon />}
                                    onClick={handleClickPause}
                                >
                                    Pause
                                </Button>
                            )}

                            {/* RESUME */}
                            {statusTime === "pause" && recorder && (
                                <Button
                                    variant="contained"
                                    color="error"
                                    startIcon={<PlayArrowRoundedIcon />}
                                    onClick={handleClickResume}
                                >
                                    Resume
                                </Button>
                            )}

                            {/* STOP */}
                            {(statusTime === "play" || statusTime === "pause") && recorder && (
                                <Button
                                    color="error"
                                    variant="contained"
                                    startIcon={<StopRoundedIcon />}
                                    onClick={handleClickStop}
                                >
                                    Stop
                                </Button>
                            )}

                            {/* TIME VIDEO */}
                            {recorder && (
                                <Stack
                                    sx={{
                                        width: "180px",
                                        justifyContent: "space-between",
                                        flexDirection: "row",
                                        gap: "10px",
                                        alignItems: "center",
                                        ml: " auto",
                                    }}
                                >
                                    <FiberManualRecordIcon
                                        className={statusTime === "play" ? "flicker" : ""}
                                        color="error"
                                    />
                                    <Timer statusTime={statusTime} />
                                </Stack>
                            )}
                        </Stack>

                        {/* VIDEO */}
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

            <ModalCountToPlay
                handleCloseModalCountToPlay={handleCloseModalCountToPlay}
                openModalCountToPlay={openModalCountToPlay}
                countToPlay={countToPlay}
            />
        </>
    );
}
