
import React from "react";
import Svg, {Path, Rect} from "react-native-svg";

function AddRowSVG() {
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
                d="M22.088 19.946v-5.761h1.147v5.761h-1.147zm-2.305-2.31V16.49h5.761v1.146h-5.761z"
            ></Path>
            <Path
                stroke="#FCAD51"
                strokeWidth="1.5"
                d="M39.376 8h-20.34a3 3 0 00-2.901 2.239l-3.148 12A3 3 0 0015.889 26h26.32a3 3 0 002.92-3.69l-2.833-12A3 3 0 0039.376 8z"
            ></Path>
            <Path
                fill="#FCAD51"
                fillRule="evenodd"
                d="M36.103 15.678l3.52-1.203a.687.687 0 01.575.064c.083.052.15.12.197.202a.52.52 0 01.072.261v3.999a.52.52 0 01-.072.26.586.586 0 01-.197.202.687.687 0 01-.574.064l-3.52-1.191v.914c0 .298-.132.584-.366.796-.234.21-.55.329-.881.329h-5.61c-.331 0-.648-.119-.882-.33A1.072 1.072 0 0128 19.25v-4.5c0-.298.131-.585.365-.796.234-.21.551-.329.882-.329h5.61c.33 0 .647.118.881.33.234.21.365.497.365.795v.928z"
                clipRule="evenodd"
            ></Path>
        </Svg>
    );
}

export default AddRowSVG;
