
import React from "react";
import Svg, {Path} from "react-native-svg";

function SoundOffSVG() {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
        >
            <Path
                stroke="#fff"
                strokeLinecap="round"
                strokeWidth="2"
                d="M22 9l-6 6m6 0l-6-6 6 6z"
            ></Path>
            <Path
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M2 14.959V9.04C2 8.466 2.448 8 3 8h3.586a.98.98 0 00.707-.305l3-3.388c.63-.656 1.707-.191 1.707.736v13.914c0 .934-1.09 1.395-1.716.726l-2.99-3.369A.98.98 0 006.578 16H3c-.552 0-1-.466-1-1.041z"
            ></Path>
        </Svg>
    );
}

export default SoundOffSVG;
