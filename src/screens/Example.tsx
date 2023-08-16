import { Link } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { styles } from '../theme/styles/style';

const Example = () => {
  return (
    <SafeAreaView>
      <Link to={{ screen: 'Permissions' }} style={styles.button}>
        Permissions
      </Link>
      <Link to={{ screen: 'Body' }} style={styles.button}>
        Body
      </Link>
      <Link to={{ screen: 'Physical' }} style={styles.button}>
        Physical
      </Link>
      <Link to={{ screen: 'Sleep' }} style={styles.button}>
        Sleep
      </Link>
      <Link to={{ screen: 'Events' }} style={styles.button}>
        Events
      </Link>
    </SafeAreaView>
  );
};

export default Example;
