import { Dimensions, View } from "react-native"
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg"

import { StylesSettings } from '../Styles/StylesSettings';

export const PresentationBox = () => {
    return (
        <View>
            <Svg height={330} width={Dimensions.get('window').width * 1} fill="none">
                <Path
                    fill="#B6CCD8"
                    d="M302.6 283.159c-20.717.889-41.374 4.079-61.981 9.571-5.128 1.377-14.55 4.166-14.465 4.288.147.209 11.1 3.4 16.362 4.759 18.918 4.899 36.417 7.653 56.658 8.926 4.772.296 20.118.401 25.514.174 23.459-.993 45.339-4.532 67.978-11 5.262-1.499 9.57-2.806 9.508-2.894-.061-.087-6.155-1.935-9.728-2.963-22.296-6.328-44.36-9.902-67.329-10.878-4.553-.192-17.879-.192-22.517.017Z"
                />
                <Path
                    fill="url(#a)"
                    d="M.02 151.841.052 303.67l.772.301c43.636 16.651 85.955 22.829 129.179 18.874 26.587-2.437 52.619-8.69 80.049-19.213 29.962-11.502 58.195-17.869 87.663-19.777 6.246-.402 9.487-.49 17.286-.49 9.085 0 14.312.201 22.482.866 27.152 2.235 55.139 8.803 82.292 19.326l.226.088V0H0l.02 151.841Z"
                />
                <Defs>
                    <LinearGradient
                        id="a"
                        x1={210.557}
                        x2={88.487}
                        y1={312}
                        y2={42.938}
                        gradientUnits="userSpaceOnUse"
                    >
                        <Stop stopColor="#00668C" />
                        <Stop offset={1} stopColor="#FBFDFE" />
                    </LinearGradient>
                </Defs>
            </Svg>
        </View>
    )
}
