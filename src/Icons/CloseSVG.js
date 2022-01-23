
import React from "react";
import Svg, {Path} from "react-native-svg";

function CloseSVG() {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="13"
            fill="none"
            viewBox="0 0 13 13"
        >
            <Path
                fill="#fff"
                fillRule="evenodd"
                d="M.293 1.293a1 1 0 011.414 0L6 5.586l4.293-4.293a1 1 0 111.414 1.414L7.414 7l4.293 4.293a1 1 0 01-1.414 1.414L6 8.414l-4.293 4.293a1 1 0 01-1.414-1.414L4.586 7 .293 2.707a1 1 0 010-1.414z"
                clipRule="evenodd"
            ></Path>
        </Svg>
    );
}

export default CloseSVG;
