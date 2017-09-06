import React from 'react';
import { Text, View } from 'react-native';

import { commonStyle as cs } from '../common/styles';

const ForumPage = () => (
  <View style={cs.header}>
    <Text style={cs.headerText}> All Posts </Text>
  </View>
);

export default ForumPage;
