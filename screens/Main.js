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
} from 'react-native';
import Modal from 'react-native-modal';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
export default class Main extends React.Component {
  saveData = () => {
    AsyncStorage.setItem('FL', JSON.stringify(this.state.languages));
  };
  loadData = async () => {
    try {
      let languages = await AsyncStorage.getItem('FL');
      let parse = JSON.parse(languages);
      if (languages != undefined)
        this.setState({
          languages: parse,
        });
      this.setState({isLoading: true});
    } catch (error) {
      alert(error);
    }
  };
  state = {
    isLoading: false,
    modal: false,
    languages: [],

    color: 'pink',
    name: '',
    des: '',
  };

  Save = () => {
    this.setState({modal: false});
    if (this.state.name != '') {
      this.state.languages.push({
        id: this.state.name,
        des: this.state.des,
        color: this.state.color,
      });
      this.saveData();
      this.setState({});
    }
  };
  Add = props => {
    return (
      <View>
        <Modal
          isVisible={this.state.modal}
          backdropOpacity={0.9}
          backdropColor={'black'}
          animationIn="slideInDown"
          animationOut="slideOutUp">
          <View
            style={{
              flex: 1,
              backgroundColor: 'white',
              borderRadius: 10,
            }}>
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontWeight: 'bold', fontSize: 20}}>ADD</Text>
            </View>
            <View style={{flex: 2}}>
              <View
                style={{
                  flex: 1,

                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{fontSize: 15}}>Name</Text>
                </View>
                <View
                  style={{
                    flex: 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <TextInput
                    style={{
                      flex: 1,
                      margin: 5,

                      width: 200,
                    }}
                    placeholder={'Name'}
                    autoFocus={true}
                    onChangeText={text => this.setState({name: text})}
                  />
                </View>
              </View>
              <View
                style={{
                  flex: 1,

                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{fontSize: 15}}>Description</Text>
                </View>
                <View
                  style={{
                    flex: 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <TextInput
                    style={{
                      flex: 1,
                      margin: 5,
                      width: 200,
                    }}
                    placeholder={'Description'}
                    onChangeText={text => this.setState({des: text})}
                  />
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{fontSize: 15}}>Color</Text>
                </View>
                <View
                  style={{
                    flex: 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Picker
                    selectedValue={this.state.color}
                    style={{
                      height: 50,
                      width: 200,
                      borderRadius: 20,
                      borderWidth: 20,
                      backgroundColor: this.state.color,
                    }}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({color: itemValue})
                    }>
                    <Picker.Item label="Pink" value="hotpink" />
                    <Picker.Item label="Yellow" value="yellow" />
                    <Picker.Item label="Light Blue" value="aqua" />
                    <Picker.Item label="White" value="white" />
                  </Picker>
                </View>
              </View>
              <View
                style={{
                  flex: 1,

                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => this.setState({modal: false})}>
                  <Text style={{fontSize: 18}}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderLeftWidth: 2,
                    borderColor: '#f2f2f2',
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                  onPress={() => this.Save()}>
                  <Text style={{fontSize: 18}}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={{flex: 1}}
            onPress={() => this.setState({modal: false})}></TouchableOpacity>
        </Modal>
      </View>
    );
  };
  delete = props => {
    Alert.alert(
      'THÔNG BÁO',
      'Bạn có muốn xoá thể loại này không?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            this.state.languages = this.state.languages.filter(
              item => item.id != props.id,
            );
            this.saveData();
            this.setState({});
          },
        },
      ],
      {cancelable: false},
    );
  };
  Button = props => {
    if (props.item.color == null) props.item.color = 'white';
    return (
      <TouchableOpacity
        style={[styles.Cate, {backgroundColor: props.item.color}]}
        onPress={() =>
          this.props.navigation.navigate('Species', {item: props.item})
        }
        onLongPress={() => this.delete(props.item)}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold'}}>
              {props.item.id.toUpperCase()}
            </Text>
          </View>
          <View style={{flex: 2, alignItems: 'center'}}>
            <Text>{props.item.des}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  componentDidMount() {
    this.loadData();
  }
  render() {
    if (!this.state.isLoading) {
      //this.loadData();
      return (
        <View style={styles.container}>
          <StatusBar hidden />

          <View style={{flex: 1}}>
            <ActivityIndicator
              size="large"
              color="#4FD0E9"
              style={{margin: 20}}
            />
          </View>
          <View style={styles.view1}>
            <View style={{flex: 2}} />
            <View style={{Flex: 5}}>
              <View
                style={{
                  flex: 3,
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    flex: 2,
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                  }}>
                  <Image
                    source={require('../Pic/logo.png')}
                    style={{width: 1150, height: 150, resizeMode: 'contain'}}
                  />
                </View>
                <View
                  style={{
                    flex: 2.5,
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                  }}>
                  <Text style={{fontSize: 34, color: '#4FD0E9'}}>
                    FlashCards
                  </Text>
                  <Text style={{fontSize: 20, color: '#4FD0E9'}}>By HK</Text>
                </View>
              </View>
              <View
                style={{
                  flex: 2,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}></View>
            </View>
            <View style={{flex: 2}}></View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <StatusBar hidden />
          <this.Add />
          <View style={{flex: 1}}>
            <View
              style={{
                flex: 0.5,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                CHOOSE CATEGORY
              </Text>
            </View>
            <View style={{flex: 4}}>
              <ScrollView contentContainerStyle={{alignItems: 'center'}}>
                {this.state.languages.map(item => {
                  return <this.Button key={item.id} item={item} />;
                })}
              </ScrollView>
            </View>
            <View
              style={{
                flex: 1.2,
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  flex: 3,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.setState({modal: true})}>
                  <Text style={styles.text}>ADD</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flex: 1.5,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('News')}>
                  <Icon size={30} name="newspaper" color="#4FD0E9" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      );
    }
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
