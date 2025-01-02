import { View, Text, TouchableOpacity } from "react-native"
import MaterialIcon from "react-native-vector-icons/MaterialIcons"
import { homeMenuItems } from "../constants/homeMenuItems"

export default function HomeMenu() {
    return (
        <View
            style={{
                width: "100%",
            }}>
            {
                homeMenuItems.map((items, index) => (
                    <TouchableOpacity
                        onPress={items.onPress}
                        key={index}
                        style={{
                            flexDirection: "row",
                            width: "100%",
                            marginBottom: 5,
                            alignItems: 'center',
                            padding: 10,
                        }}>
                        <MaterialIcon name={items.iconName} size={27} />
                        <Text style={{
                            color: "#000",
                            marginLeft: 10,
                            fontSize: 17,
                        }}>{items.title}</Text>
                    </TouchableOpacity>
                ))
            }
        </View>
    )
}