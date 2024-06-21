import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { auth } from '../../config/firebase';

const CustomDrawerContent = () => {
  return (
    <View>
      <Text>Custom Drawer Content</Text>
    </View>
  );
};



export default CustomDrawerContent;