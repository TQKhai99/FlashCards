import React, {Component} from 'react';
import Swiper from 'react-native-deck-swiper';
import {Text, View, Image, TouchableOpacity, Alert} from 'react-native';
import CardFlip from 'react-native-card-flip';
import {TextInput} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/AntDesign';

import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
export default class FlashCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      swipedAllCards: false,
      swipeDirection: '',
      cardIndex: 0,
      Next: 0,
      modal: false,

      name: '',
      image:
        'https://cdn1.iconfinder.com/data/icons/rounded-black-basic-ui/139/Photo_Add-RoundedBlack-512.png',
      des: '',
    };
  }
  saveData = id => {
    AsyncStorage.setItem(id, JSON.stringify(this.state.cards));
    this.setState({});
  };
  loadData = async id => {
    try {
      let cards = await AsyncStorage.getItem(id);
      if (cards != undefined) {
        let parse = JSON.parse(cards);
        this.setState({cards: parse});
      }
    } catch (error) {
      alert(error);
    }
  };
  chooseImage = () => {
    var options = {
      //title: 'Select Image',
      //customButtons: [
      //  { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      //],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, response => {
      //console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let source = response;
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          image: response.uri,
        });
      }
    });
  };
  Save = id => {
    this.setState({modal: false});
    if (this.state.name != '' || this.state.image != '') {
      this.state.cards.push({
        name: this.state.name,
        des: this.state.des,
        image: this.state.image,
      });
      this.saveData(id);
    }
  };
  add = props => {
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
                  <Text style={{fontSize: 15}}>Picture</Text>
                </View>
                <View
                  style={{
                    flex: 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <TouchableOpacity
                    style={{flex: 1}}
                    onPress={() => this.chooseImage()}>
                    <Image
                      style={{width: 70, height: 70}}
                      source={{uri: this.state.image}}
                    />
                  </TouchableOpacity>
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
                  <Text style={{fontSize: 15}}>Title</Text>
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
                    placeholder={'Title'}
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
                  onPress={() => this.Save(props.id)}>
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
      'Bạn có muốn xoá flashcard này không?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            this.state.cards = this.state.cards.filter(
              item => item.name != props.name,
            );
            //this.setState({});
            this.saveData(props.pass);
          },
        },
      ],
      {cancelable: false},
    );
  };
  onSwiped = type => {};

  onSwipedAllCards = () => {
    this.setState({
      swipedAllCards: true,
    });
  };

  swipeLeft = () => {
    this.swiper.swipeLeft();
  };
  Card = props => {
    return (
      <View
        style={{
          width: 370,
          height: 500,
        }}>
        <CardFlip style={{flex: 1}} ref={card => (this.card = card)}>
          <TouchableOpacity
            style={{flex: 1, backgroundColor: 'white', borderRadius: 20}}
            onPress={() => this.card.flip()}
            onLongPress={() => this.delete(props)}>
            <View
              style={{flex: 5, alignItems: 'center', justifyContent: 'center'}}>
              <Image
                style={{width: 300, height: 300, borderRadius: 20}}
                source={{uri: props.image}}
              />
            </View>
            <View
              style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                {props.name}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flex: 1, backgroundColor: 'white', borderRadius: 20}}
            onPress={() => this.card.flip()}
            onLongPress={() => this.delete(props)}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                margin: 10,
              }}>
              <Text style={{fontSize: 15}}>{props.des}</Text>
            </View>
          </TouchableOpacity>
        </CardFlip>
      </View>
    );
  };
  render() {
    const {navigation} = this.props;
    const item = navigation.getParam('item', 'null');
    this.loadData(item.id);
    if (this.state.Next < 1) {
      return (
        <View
          style={{
            flex: 1,
          }}>
          <this.add id={item.id} />
          <View
            style={{
              width: 412,
              height: 70,
              flexDirection: 'row',
              backgroundColor: '#4FD0E9',
            }}>
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'center',
                margin: 20,
              }}
              onPress={() => this.props.navigation.navigate('Species')}>
              <Icon size={30} name="arrowleft" />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'flex-end',
                margin: 20,
              }}
              onPress={() => this.setState({modal: true})}>
              <Icon size={30} name="plus" />
            </TouchableOpacity>
          </View>
          <Swiper
            ref={swiper => {
              this.swiper = swiper;
            }}
            marginTop={70}
            disableLeftSwipe
            disableBottomSwipe
            disableTopSwipe
            onSwipedRight={() => {
              this.onSwiped('right');
              this.setState({Next: this.state.Next + 1});
            }}
            cards={this.state.cards}
            cardIndex={this.state.cardIndex}
            renderCard={cardData => <this.Card {...cardData} pass={item.id} />}
            onSwipedAll={() => this.onSwipedAllCards()}
            stackSize={1}
            stackSeparation={15}
            overlayLabels={{
              right: {
                title: 'Next',
                style: {
                  label: {
                    backgroundColor: 'black',
                    borderColor: 'black',
                    color: 'white',
                    fontSize: 25,
                    borderWidth: 1,
                  },
                  wrapper: {
                    alignItems: 'flex-start',
                    marginTop: -10,
                    marginLeft: 45,
                  },
                },
              },
            }}
            animateOverlayLabelsOpacity
            animateCardOpacity
            swipeBackCard></Swiper>
        </View>
      );
    } else {
      return (
        <View style={{flex: 1}}>
          <View
            style={{
              width: 412,
              height: 70,
              flexDirection: 'row',
              backgroundColor: '#4FD0E9',
            }}>
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'center',
                margin: 20,
              }}
              onPress={() => this.props.navigation.navigate('Species')}>
              <Icon size={30} name="arrowleft" />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'flex-end',
                margin: 20,
              }}
              onPress={() => this.setState({modal: true})}>
              <Icon size={30} name="plus" />
            </TouchableOpacity>
          </View>
          <Swiper
            ref={swiper => {
              this.swiper = swiper;
            }}
            marginTop={70}
            onSwipedAborted={() => this.func}
            onSwipedLeft={() => {
              this.onSwiped('left');
              this.setState({Next: this.state.Next - 1});
            }}
            onSwipedRight={() => {
              this.onSwiped('right');
              this.setState({Next: this.state.Next + 1});
            }}
            disableBottomSwipe
            disableTopSwipe
            cards={this.state.cards.slice(1)}
            cardIndex={this.state.cardIndex}
            renderCard={cardData => <this.Card {...cardData} key={item} />}
            onSwipedAll={() => this.onSwipedAllCards()}
            goBackToPreviousCardOnSwipeLeft={true}
            stackSize={1}
            stackSeparation={15}
            overlayLabels={{
              left: {
                title: 'Previous',
                style: {
                  label: {
                    backgroundColor: 'black',
                    borderColor: 'black',
                    color: 'white',
                    fontSize: 25,
                    borderWidth: 1,
                  },
                  wrapper: {
                    alignItems: 'flex-end',
                    marginTop: -10,
                    marginLeft: -45,
                  },
                },
              },
              right: {
                title: 'Next',
                style: {
                  label: {
                    backgroundColor: 'black',
                    borderColor: 'black',
                    color: 'white',
                    fontSize: 25,
                    borderWidth: 1,
                  },
                  wrapper: {
                    alignItems: 'flex-start',
                    marginTop: -10,
                    marginLeft: 45,
                  },
                },
              },
            }}
            animateOverlayLabelsOpacity
            animateCardOpacity
            swipeBackCard></Swiper>
        </View>
      );
    }
  }
}
