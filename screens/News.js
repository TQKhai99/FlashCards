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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
export default class Main extends React.Component {
  state = {
    data: [],
  };

  Button = props => {
    return (
      <TouchableOpacity
        style={styles.Cate}
        onPress={() =>
          this.props.navigation.navigate('PDF', {des: props.item})
        }>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold'}}>
              {props.item.name.toUpperCase()}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  loadData = async () => {
    const response = await fetch('http://192.168.1.16:3000/news');
    const data = await response.json();
    this.setState({data: data});
  };
  componentDidMount() {
    this.loadData();
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <View style={{flex: 1}}>
          <View
            style={{
              flex: 0.5,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => this.props.navigation.navigate('Main')}>
                <Icon size={30} name="arrow-left" />
              </TouchableOpacity>
            </View>
            <View
              style={{flex: 5, alignItems: 'center', justifyContent: 'center'}}>
              <Text
                style={{fontSize: 20, fontWeight: 'bold', color: '#4FD0E9'}}>
                NEWS
              </Text>
            </View>
          </View>
          <View style={{flex: 4}}>
            <ScrollView contentContainerStyle={{alignItems: 'center'}}>
              {this.state.data.map(item => {
                return <this.Button key={item.id} item={item} />;
              })}
            </ScrollView>
          </View>
          <View
            style={{
              flex: 1.2,
              justifyContent: 'center',
              alignItems: 'center',
            }}></View>
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
