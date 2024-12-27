import { View, Text, TouchableOpacity } from "react-native"
import MaterialIcon from "react-native-vector-icons/MaterialIcons"
import { homeMenuItems } from "../constants/homeMenuItems"

export default function HomeMenu() {
    return (
        <View
            style={{
                width: "100%"
            }}>
            {
                homeMenuItems.map((items, index) => (
                    <TouchableOpacity
                        onPress={items.onPress}
                        key={index}
                        style={{
                            flexDirection: "row",
                            width: "100%",
                            marginBottom: 10,
                            alignItems: 'center'
                        }}>
                        <MaterialIcon name={items.iconName} size={27} />
                        <Text style={{
                            color: "#000",
                            marginLeft: 5,
                            fontSize: 16,
                        }}>{items.title}</Text>
                    </TouchableOpacity>
                ))
            }
        </View>
    )
}