import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'

const Button = ({ children, onPress, style, varient, disabled, buttonTextStyle }) => {
  return (
    <Pressable onPress={onPress} style={({ pressed}) => pressed && styles.pressed} disabled={disabled}>
      <View style={[styles.container, style, varient === 'primary' && styles.primary]}>
        <Text style={[styles.buttonText, buttonTextStyle, varient === 'primary' && styles.primaryText]}>{children}</Text>
      </View>
    </Pressable>
  )
}

export default Button

const styles = StyleSheet.create({
    container: {
        padding: 12,
        borderWidth: 2,
        borderColor: 'grey',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    primary: {
        backgroundColor: '#3544f7',
        borderColor: '#3544f7'
    },
    primaryText: {
        color: 'white'
    },
    pressed: {
        opacity: 0.75
    },
    buttonText: {
        fontSize: 12,
        color: '#3544f7',
        fontWeight: 'bold'
    }
})