import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { Colors, Text, View } from "react-native-ui-lib";



const Toast = ({ toastInfo, setToastInfo }) => {
    const { navigate }: NavigationProp<TabNavigationType> = useNavigation();
    const { isSuccess, message, navigatePath } = toastInfo;

    useEffect(() => {
        console.log("toast call")
        let timer;
        if (message) {
            timer = setTimeout(() => {
                console.log("toast hide")
                setToastInfo({ message: "", isSuccess: isSuccess });
                navigate(navigatePath);
            }, 3000)
        }
        return () => {
            if (timer) {
                clearTimeout(timer);
                console.log("Timer cleared")
            }
        }
    }, [isSuccess, message])

    return <View style={{ width: "100%" }}>
        {message && <Text style={{
            width: "100%", paddingVertical: 10, paddingHorizontal: 10, color: "white", fontSize: 17, fontWeight: "400",
            backgroundColor: isSuccess ? Colors.green30 : Colors.red30
        }}>{message}</Text>}
    </View>
}

export default Toast;