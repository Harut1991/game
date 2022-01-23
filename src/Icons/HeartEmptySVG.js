
import React from "react";
import Svg, {Path, Rect} from "react-native-svg";

function HeartEmptySVG() {
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
                stroke="#FCAD51"
                d="M28.578 10.968l.422.663.422-.663C30.38 9.463 32.07 8.5 34 8.5c3.024 0 5.5 2.476 5.5 5.5 0 1.35-.621 2.746-1.622 4.11-.997 1.36-2.337 2.642-3.695 3.753a39.386 39.386 0 01-3.733 2.684 38.47 38.47 0 01-1.449.879 38.833 38.833 0 01-1.45-.885 39.921 39.921 0 01-3.734-2.696c-1.358-1.114-2.698-2.398-3.695-3.756C19.12 16.726 18.5 15.336 18.5 14c0-3.024 2.476-5.5 5.5-5.5 1.93 0 3.62.963 4.578 2.468z"
            ></Path>
        </Svg>
    );
}

export default HeartEmptySVG;
