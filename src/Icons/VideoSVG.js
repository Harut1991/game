
import React from "react";
import Svg, {Path, Rect} from "react-native-svg";

function VideoSVG() {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="58"
            height="35"
            fill="none"
            viewBox="0 0 58 35"
        >
            <Rect
                width="58"
                height="35"
                fill="#FCAD51"
                fillOpacity="0.29"
                rx="5"
            ></Rect>
            <Path
                fill="#FCAD51"
                d="M10.815 21.773v-6.721h1.338v6.721h-1.338zm-2.69-2.695v-1.337h6.722v1.337H8.126z"
            ></Path>
            <Path
                fill="#FCAD51"
                fillRule="evenodd"
                d="M40.031 14.525l8.99-3.217a1.676 1.676 0 011.468.17c.212.139.386.324.505.54.12.215.182.456.182.7v10.701c0 .243-.062.483-.182.698-.12.216-.292.4-.503.539a1.677 1.677 0 01-1.466.172l-8.994-3.188v2.446a2.93 2.93 0 01-.933 2.129 3.28 3.28 0 01-2.251.882h-14.33a3.28 3.28 0 01-2.251-.882 2.93 2.93 0 01-.933-2.129V12.043c0-.798.336-1.564.933-2.129a3.28 3.28 0 012.251-.882h14.33a3.28 3.28 0 012.251.882 2.93 2.93 0 01.933 2.129v2.482z"
                clipRule="evenodd"
            ></Path>
        </Svg>
    );
}

export default VideoSVG;
