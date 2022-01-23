import React, {useCallback, useEffect, useMemo, useState} from "react";
import {Text} from "react-native";

function Timer({time, onFailHandler, win, setRestTime}) {
    const [currentTime, setCurrentTime] = useState(null);

    const {
        minutes,
        seconds,
        dangerous
    } = useMemo(() => {
        const minutes = Math.floor(currentTime / 60);
        const seconds = currentTime - minutes * 60;
        return {
            dangerous: minutes === 0 && seconds <= 10,
            minutes: minutes < 10 ? '0' + minutes: minutes,
            seconds: seconds < 10 ? '0' + seconds: seconds
        }
    }, [currentTime]);

    const timeHandler = useCallback(() => {
        const intervalId = setInterval(() => {
            setRestTime(currentTime);
            if (win){
                clearInterval(intervalId);
            } else {
                if (currentTime && !win){
                    setCurrentTime(currentTime - 1);
                } else if (currentTime === 0) {
                    onFailHandler(true);
                    clearInterval(intervalId);
                }
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [setCurrentTime, currentTime, win, time, setRestTime]);

    useEffect(timeHandler, [currentTime, win]);
    useEffect(() => setCurrentTime(time.time), [time]);

    return (  <Text style={{fontSize: 20, color: dangerous ? 'red':  '#FCAD51'}}> {minutes}:{seconds}</Text> );
}

export default Timer;
