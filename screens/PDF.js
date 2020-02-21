import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Picker,
  TextInput,
  Alert,
  Image,
  Vibration,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import PDF from 'react-native-view-pdf';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
export default class Main extends React.Component {
  render() {
    const {navigation} = this.props;
    const item = navigation.getParam('des', 'null');
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <View
          style={{flex: 1.5, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#4FD0E9'}}>
            {item.name.toUpperCase()}
          </Text>
        </View>
        <View style={{flex: 8}}>
          <ScrollView>
            <View style={{flex: 1, margin: 20}}>
              <Text style={{fontSize: 17}}>{item.des}</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  view1: {
    flex: 9,
    backgroundColor: 'white',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    alignContent: 'center',
    justifyContent: 'center',
  },
  Cate: {
    height: 70,
    width: 350,
    marginTop: 20,
    backgroundColor: '#4FD0E9',
    justifyContent: 'center',
    borderRadius: 20,
  },

  text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  button: {
    height: 60,
    width: 200,
    borderRadius: 20,
    backgroundColor: '#4FD0E9',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
