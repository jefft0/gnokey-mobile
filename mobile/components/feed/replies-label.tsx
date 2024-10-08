import { StyleProp, TextStyle, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Text from "../text";
import { colors } from "@/assets/styles/colors";

interface Props {
  replyCount: number;
  style?: StyleProp<TextStyle> | undefined;
}

function RepliesLabel({ replyCount, style }: Props) {
  return (
    <View style={[style, { flexDirection: "row", gap: 8 }]}>
      <MaterialCommunityIcons
        name={replyCount > 0 ? "message-reply" : "message-reply-outline"}
        size={16}
        color={colors.grayscale[200]}
      />
      <Text.Caption1 style={{ color: colors.text.secondary }}>{replyCount} replies</Text.Caption1>
    </View>
  );
}

export default RepliesLabel;
