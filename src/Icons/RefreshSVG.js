
import React from "react";
import Svg, {Path, Rect} from "react-native-svg";

function RefreshSVG() {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="58"
            height="35"
            fill="none"
            viewBox="0 0 58 35"
        >
            <Path
                fill="#FCAD51"
                d="M37.473 8.525A11.945 11.945 0 0028.993 5C22.358 5 17 10.37 17 17s5.358 12 11.992 12c5.599 0 10.267-3.825 11.603-9h-3.122a8.986 8.986 0 01-8.48 6c-4.969 0-9.006-4.035-9.006-9s4.037-9 9.006-9c2.491 0 4.712 1.035 6.334 2.67l-4.834 4.83H41V5l-3.527 3.525z"
            ></Path>
            <Rect
                width="58"
                height="35"
                fill="#FCAD51"
                fillOpacity="0.29"
                rx="5"
            ></Rect>
        </Svg>
    );
}

export default RefreshSVG;
