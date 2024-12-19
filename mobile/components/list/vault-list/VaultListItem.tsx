import { colors } from "@/assets/styles/colors";
import Text from "@/components/text";
import { KeyInfo } from "@gnolang/gnonative";
import { TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import AntDesign from '@expo/vector-icons/AntDesign';
import Row from "@/components/row";

interface Props {
  vault: KeyInfo;
  chains?: string[];
  onVaultPress: (vault: KeyInfo) => void;
}

const VaultListItem = ({ vault, onVaultPress, chains = [] }: Props) => {

  return (
    <Container onPress={() => onVaultPress(vault)}>
      <View style={{ flex: 1, height: 40 }}>
        <View style={{ flex: 1 }}>
          <Text.BodyMedium>{vault.name}</Text.BodyMedium>
        </View>
        <View style={{ flex: 1 }}>
          {chains ? <Text.Caption1 style={{ textAlign: 'left', paddingTop: 4 }}>{chains.join(', ')}</Text.Caption1> : null}
        </View>
      </View>
      <AntDesign name="edit" size={24} color="black" />
    </Container>
  )
}

const Container = styled(TouchableOpacity)`
  border-width: 1px;
  border-color: ${colors.grayscale[500]};
  margin: 4px;
  height: 64px;
  padding: 16px;
  flex-direction: row;
  space-between: space-between;
`;

export default VaultListItem
