import { View, TouchableOpacity, Text } from 'react-native';
import tw from '../tailwind';

export default function MenuButtons() {
  return (
    <View style={tw`flex-row justify-between mt-4`}>
      <TouchableOpacity style={tw`bg-primary px-4 py-2 rounded-xl`}>
        <Text style={tw`text-white font-semibold`}>Quiz Bíblico</Text>
      </TouchableOpacity>
      <TouchableOpacity style={tw`bg-secondary px-4 py-2 rounded-xl`}>
        <Text style={tw`text-white font-semibold`}>Desafios</Text>
      </TouchableOpacity>
    </View>
  );
}
