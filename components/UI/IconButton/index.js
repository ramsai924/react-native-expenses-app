import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const IconButton = ({ icon, color, size, style, onPress }) => {
  return (
    <Pressable 
        onPress={onPress} 
        style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={[styles.container, style]}>
        <Ionicons name={icon} color={color} size={size} />
      </View>
    </Pressable>
  )
}

export default IconButton

const styles = StyleSheet.create({
    container: {
        paddingVertical: 4,
        paddingHorizontal: 24
    },
    pressed: {
        opacity: 0.75
    }
})