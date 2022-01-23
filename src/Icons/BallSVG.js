
import React from "react";
import Svg, {Rect, Defs, LinearGradient, Stop} from "react-native-svg";

function BallSVG() {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            fill="none"
            viewBox="0 0 50 50"
        >
            <Rect
                width="50"
                height="50"
                fill="url(#paint0_linear_415_454)"
                rx="3"
            ></Rect>
            <Defs>
                <LinearGradient
                    id="paint0_linear_415_454"
                    x1="15"
                    x2="15"
                    y1="0"
                    y2="30"
                    gradientUnits="userSpaceOnUse"
                >
                    <Stop stopColor="#FCAD51"></Stop>
                    <Stop offset="1" stopColor="#F0D95F"></Stop>
                </LinearGradient>
            </Defs>
        </Svg>
    );
}

export default BallSVG;
