import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button, View } from 'react-native';

const Example = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Button
        title="Permissions"
        onPress={() => navigation.navigate('Permissions' as never, {} as never)}
      />
      <Button
        title="Sleep"
        onPress={() => navigation.navigate('Sleep' as never, {} as never)}
      />
      <Button
        title="Body"
        onPress={() => navigation.navigate('Body' as never, {} as never)}
      />
      <Button
        title="Physical"
        onPress={() => navigation.navigate('Physical' as never, {} as never)}
      />
    </View>
  );
};

export default Example;
