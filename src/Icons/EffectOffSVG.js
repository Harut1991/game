
import React from "react";
import Svg, {Path, G, Defs, ClipPath} from "react-native-svg";

function EffectOffSVG() {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="none"
            viewBox="0 0 18 18"
        >
            <G clipPath="url(#clip0_468_128)">
                <Path
                    fill="#fff"
                    d="M18.07.127a1.104 1.104 0 00-.41-.122 1.2 1.2 0 00-.438.036l.006-.001L6.151 2.993a.942.942 0 00-.444.253.583.583 0 00-.169.399v9.63a4.894 4.894 0 00-1.846-.353h-.001c-.936-.029-1.85.222-2.54.696-.692.474-1.106 1.134-1.152 1.836v.006c.044.704.458 1.366 1.151 1.841.693.476 1.61.727 2.548.698h-.007c.936.028 1.85-.222 2.54-.697.692-.474 1.106-1.134 1.152-1.835V5.797l9.23-2.417v6.73a4.911 4.911 0 00-1.846-.353h-.001c-.936-.028-1.85.222-2.54.696-.692.474-1.106 1.134-1.151 1.836v.006c.044.704.458 1.367 1.15 1.842.694.476 1.61.726 2.549.697h-.007l.105.001c.807 0 1.591-.202 2.228-.574.636-.372 1.088-.893 1.285-1.48l.005-.02a.537.537 0 00.069-.254V.692c0-.11-.035-.219-.102-.317a.797.797 0 00-.286-.247l-.003-.001h.002z"
                ></Path>
                <Path
                    stroke="#fff"
                    strokeWidth="2"
                    d="M1.707 3.293L15.707 17.293"
                ></Path>
                <Path
                    stroke="#FCAD51"
                    strokeWidth="2"
                    d="M2.707 2.293L16.707 16.293"
                ></Path>
            </G>
            <Defs>
                <ClipPath id="clip0_468_128">
                    <Path fill="#fff" d="M0 0H18V18H0z"></Path>
                </ClipPath>
            </Defs>
        </Svg>
    );
}

export default EffectOffSVG;
