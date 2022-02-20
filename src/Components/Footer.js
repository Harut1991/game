import React from 'react';
import { View } from "react-native";
import {AdMobBanner} from "expo-ads-admob";

export default function Footer() {
    return (
        <View style={{width: '100%'}}>
            <AdMobBanner
                bannerSize="fullBanner"
                adUnitID="ca-app-pub-1811884588047510/8113044720"
            />
        </View>
    );
}
