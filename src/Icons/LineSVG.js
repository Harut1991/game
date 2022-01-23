
import React from "react";
import Svg, {Path} from "react-native-svg";

function LineSVG() {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="2"
            fill="none"
            viewBox="0 0 30 2"
        >
            <Path stroke="#ECD2B4" strokeWidth="2" d="M0 1L30 1"></Path>
        </Svg>
    );
}

export default LineSVG;
