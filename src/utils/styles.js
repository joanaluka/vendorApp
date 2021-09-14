import { Dimensions, StyleSheet } from 'react-native';
import * as colors from './colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  headerText: {
    flex: 1,
    color: colors.pow_blue_dark,
    fontSize: 46,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginLeft: 34,
    marginTop: "10%",
  },

  submitButton: {
    backgroundColor: colors.pow_blue_dark,
    borderRadius: 10,
    width: 307,
    height: 56,
    justifyContent: "space-around",
    marginBottom: 20
  },

  submitText: {
    color: "white",
    fontSize: 28,
    textAlign: "center",
  },

  linkText: {
    color: "rgb(94, 94, 94)",
    fontSize: 14,
    textAlign: "center",
  },

  cell: {
    width: 45,
    height: 45,
    lineHeight: 45,
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    // marginLeft: 8,
    marginHorizontal: "5%",
    borderRadius: 6,
    borderColor: "#000",
    borderWidth: 0.5,
    backgroundColor: '#eee',
  },

  focusCell: {
    borderColor: '#000',
    borderWidth: 2
  },

});

export default styles;