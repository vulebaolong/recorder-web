import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

let timerInterval: number | undefined = undefined;

type TTimer = {
    statusTime: "stop" | "start" | "pause";
};

function Timer({ statusTime }: TTimer) {
    console.log("render Timer");

    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        if (statusTime === "stop") {
            clearInterval(timerInterval);
            setMinutes(0);
            setSeconds(0);
        }

        if (statusTime === "pause") {
            clearInterval(timerInterval);
        }

        if (statusTime === "start") {
            if(timerInterval) return console.log("đã có timerInterval");
            timerInterval = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds + 1);

                if (seconds >= 59) {
                    setSeconds(0);
                    setMinutes((prevMinutes) => prevMinutes + 1);
                }
            }, 1000);
        }

        return () => clearInterval(timerInterval);
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
