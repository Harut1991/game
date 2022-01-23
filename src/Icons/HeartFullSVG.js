
import React from "react";
import Svg, {Path, G, Rect, Defs} from "react-native-svg";

function HeartFullSVG() {
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
                d="M44 8c-2.1 0-3.95 1.05-5 2.7C37.95 9.05 36.1 8 34 8c-3.3 0-6 2.7-6 6 0 5.95 11 12 11 12s11-6 11-12c0-3.3-2.7-6-6-6z"
            ></Path>
        </Svg>
    );
}

export default HeartFullSVG;
