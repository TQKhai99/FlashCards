import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Picker,
  TextInput,
  Alert,
} from 'react-native';
import Modal from 'react-native-modal';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-community/async-storage';
export default class Species extends React.Component {
  state = {
    species: [],

    modal: false,
    color: 'pink',
    name: '',
    des: '',
  };

  saveData = id => {
    AsyncStorage.setItem(id, JSON.stringify(this.state.species));
  };
  loadData = async id => {
    try {
      let species = await AsyncStorage.getItem(id);
      if (species != undefined) {
        let parse = JSON.parse(species);
        this.setState({species: parse});
      }
    } catch (error) {
      alert(error);
    }
  };
  Save = id => {
    this.setState({modal: false});
    if (this.state.name != '') {
      this.state.species.push({
        id: this.state.name,
        des: this.state.des,
        color: this.state.color,
      });
      this.saveData(id);
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
                  onPress={() => this.Save(props.item)}>
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
  Button = props => {
    if (props.item.color == null) props.item.color = 'white';
    return (
      <TouchableOpacity
        style={[styles.Cate, {backgroundColor: props.item.color}]}
        onPress={() =>
          this.props.navigation.navigate('Flashcard', {item: props.item})
        }
        onLongPress={() => this.delete(props)}>
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
            this.state.species = this.state.species.filter(
              item => item.id != props.item.id,
            );
            this.setState({});
            this.saveData(props.pass);
          },
        },
      ],
      {cancelable: false},
    );
  };

  render() {
    const {navigation} = this.props;
    const item = navigation.getParam('item', 'null');

    this.loadData(item.id);
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <this.Add item={item.id} />
        <View style={{flex: 1}}>
          <View
            style={{
              flex: 0.5,
              flexDirection: 'row',
            }}>
            <View
              style={{
                flex: 1,
              }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => this.props.navigation.navigate('Main')}>
                <Icon size={30} name="arrowleft" />
              </TouchableOpacity>
            </View>
            <View
              style={{flex: 4, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>{item.id}</Text>
              <Text style={{marginLeft: 20, marginRight: 20}}>{item.des}</Text>
            </View>
          </View>
          <View style={{flex: 4}}>
            <ScrollView contentContainerStyle={{alignItems: 'center'}}>
              {this.state.species.map(it => {
                return <this.Button key={it.id} item={it} pass={item.id} />;
              })}
            </ScrollView>
          </View>
          <View
            style={{
              flex: 1.2,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.setState({modal: true})}>
              <Text style={styles.text}>ADD</Text>
            </TouchableOpacity>
          </View>
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
