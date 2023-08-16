import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  text: {
    color: 'black',
  },
  bg: {
    backgroundColor: '#171821',
    flex: 1,
  },
  whiteText: {
    color: 'white',
  },
  json: {
    marginHorizontal: '5%',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#383A4E',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: '5%',
    marginTop: 5,
  },
  buttonTouch: {
    backgroundColor: '#383A4E',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: '5%',
    marginVertical: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: 35,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginVertical: 10,
    fontFamily: 'System',
  },
});
