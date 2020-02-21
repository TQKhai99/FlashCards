import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Species from './Species';
import Main from './Main';
import Flashcard from './Flashcard';
import News from './News';
import PDF from './PDF';
const AppNavigator = createStackNavigator(
  {
    Main: Main,
    Species: Species,
    Flashcard: Flashcard,
    News: News,
    PDF: PDF,
  },
  {headerMode: 'none'},
);

export default createAppContainer(AppNavigator);
