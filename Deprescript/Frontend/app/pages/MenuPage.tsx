import React from 'react';
import { View, Text } from 'react-native';
import { style } from '../../styles/sharedStyles';

export default function MenuPage() {
  return (
    <View style={[style.container, { justifyContent: 'center', alignItems: 'center' }]}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Página do Menu</Text>
      <Text style={{ marginTop: 10, color: '#6B7280' }}>Em construção...</Text>
    </View>
  );
}
