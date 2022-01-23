
import React from "react";
import Svg, {Path} from "react-native-svg";

function BottomSVG({isSuccess}) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="82"
            height="65"
            fill="none"
            viewBox="0 0 58 40"
        >
            <Path
                stroke={isSuccess ? "#22A117": "#FCAD51"}
                d="M46.994 1H11.698a5 5 0 00-4.76 3.467l-4.833 15C1.065 22.695 3.473 26 6.865 26h44.479c3.33 0 5.73-3.194 4.802-6.393l-4.35-15A5 5 0 0046.994 1z"
            ></Path>
        </Svg>
    );
}

export default BottomSVG;
