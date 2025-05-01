import { View, ScrollView } from 'react-native';
import tw from '../tailwind';
import DevocionalCard from '../components/DevocionalCard';
import MenuButtons from '../components/MenuButtons';

export default function HomeScreen() {
  return (
    <ScrollView style={tw`flex-1 bg-background`}>
      <View style={tw`p-4`}>
        <DevocionalCard />
        <MenuButtons />
      </View>
    </ScrollView>
  );
}
