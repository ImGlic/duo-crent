import { View, Text } from 'react-native';
import tw from '../tailwind';

export default function DevocionalCard() {
  return (
    <View style={tw`bg-white p-4 rounded-2xl shadow-md mb-4`}>
      <Text style={tw`text-primary text-lg font-bold`}>Palavra do Dia</Text>
      <Text style={tw`text-base mt-2`}>“Porque Deus amou o mundo de tal maneira...” - João 3:16</Text>
    </View>
  );
}
