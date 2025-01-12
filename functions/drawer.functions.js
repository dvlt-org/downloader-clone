import { Image, Text } from "react-native"
import FontIcon from "react-native-vector-icons/FontAwesome"
import { dataOfSites } from "../constants/downloadingSites";
import Browser from "../assets/icons/browser.png"

export const hasIcon = (url) => {
    if (typeof url !== "string") return <Text>Bunday malumot qabul qilinmaydi !</Text>
    for (const item of dataOfSites) {
        if (url.toLowerCase().includes(item.title.toLowerCase())) {
            return item.iconName ? <FontIcon name={item.iconName} size={25} color={item.iconColor} style={{
                textAlign: 'center'
            }} /> : <Image source={item.iconImage} style={{
                width: 25,
                height: 25,
                justifyContent: "center",
                alignItems: "center",
                objectFit: "contain"
            }} />
        }
    }
    return (<Image source={Browser} style={{
        width: 25,
        height: 25,
        objectFit: "contain"
    }} />);
};