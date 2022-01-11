import { View, Button } from 'react-native';

export default function Start({level, onStart}) {
  return (
    <View>
        <Button  
          onPress={onStart}
          title={`Start ${level}`}
        />
    </View>
  );
}
