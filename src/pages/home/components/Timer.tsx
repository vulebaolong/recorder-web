import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

let timerInterval: number | undefined = undefined;

type TTimer = {
    statusTime: "stop" | "play" | "pause";
};

function Timer({ statusTime }: TTimer) {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        if (statusTime === "stop") {
            clearInterval(timerInterval);
            timerInterval = undefined;
            setMinutes(0);
            setSeconds(0);
        }

        if (statusTime === "pause") {
            clearInterval(timerInterval);
            timerInterval = undefined;
        }

        if (statusTime === "play") {
            if (timerInterval) return console.log("đã có timerInterval");
            timerInterval = setInterval(() => {
                console.log("setInterval đang chạy");
                setSeconds((prevSeconds) => {
                    if (prevSeconds >= 59) {
                        setMinutes((prevMinutes) => prevMinutes + 1);
                        return 0;
                    }
                    return prevSeconds + 1;
                });
            }, 1000);
        }

        return () => {
            clearInterval(timerInterval);
            timerInterval = undefined;
        };
    }, [statusTime]);

    const formatTime = (time: number) => {
        return time < 10 ? `0${time}` : `${time}`;
    };

    return (
        <Stack sx={{ flexDirection: "row", gap: "10px", alignItems: "center" }}>
            <Typography component="h3" variant="h3">
                {formatTime(minutes)}
            </Typography>
            <Typography component="h3" variant="h3">
                :
            </Typography>
            <Typography component="h3" variant="h3">
                {formatTime(seconds)}
            </Typography>
        </Stack>
    );
}

export default Timer;
