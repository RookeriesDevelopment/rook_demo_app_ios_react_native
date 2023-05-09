import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, View } from 'react-native';
//import { useRookAuth } from 'rook_auth';

const Example = () => {
  const navigation = useNavigation();

  /*const { apiURL, clientUUID, password } = useRookAuth();

  const { checkUserID } = useUser({ user: 'example@example.com' });
  useEffect(() => {
    console.log(apiURL, clientUUID, password);
    checkUserID().then(console.log);
  }, [apiURL, clientUUID, password]);*/

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
