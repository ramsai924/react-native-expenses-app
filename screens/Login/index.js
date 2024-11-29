import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, Alert } from 'react-native'
import React, { useMemo, useState } from 'react'
import Field from '../../components/UI/Field'
import Button from '../../components/UI/Button'
import { authenticate } from '../../services/auth'
import { useExpensesContext } from '../../store/context'

const Login = ({ navigation }) => {
    const [authForm, setAuthForm] = useState({
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
    })
    const { createToken } = useExpensesContext()

    const validateFields = (name, value) => {
        if(name === 'email'){
            return value.includes('@')
        }else{
            return value.length >= 6
        }
    }

    const onChangeHandler = (name, value) => {
        setAuthForm((prev) => {
            return {
                ...prev,
                [name]: {
                    value,
                    isValid: validateFields(name, value)
                }
            }
        })
    }

    const isInValidForm = useMemo(() => {
        const objectKeys = Object.keys(authForm)
        return objectKeys.some((key) => !authForm[key]?.isValid)
    }, [authForm])


     const onSubmit = async () => {
        try {
            if(isInValidForm){
                Alert.alert('Invalid form', 'Please fill in all details!')
                return;
            }
            const response = await authenticate('signInWithPassword', { email: authForm.email.value?.toLowerCase(), password: authForm.password.value })
            if(response){
                // const success = Object.keys(response).includes('error')
                // if(!success){
                //     Alert.alert('Error', 'Something went wrong!')
                //     return;
                // }
                createToken(response?.idToken)
            }else{
                Alert.alert('Error', 'Something went wrong!')
            }
        } catch (error) {
            Alert.alert('Error', 'Something went wrong!')
        }
    }

  return (
    <ScrollView style={{ flex: 1 }} overScrollMode='never'>
        <KeyboardAvoidingView
            behavior={'position'}
            style={{ flex: 1 }}>
            <View style={styles.container}>
                    <View style={styles.form}>
                        <Field 
                            label={'Email'} 
                            labelStyles={styles.labelStyles}
                            inputStyle={styles.inputStyles}
                             fieldConfig={{
                                keyboardType: 'email-address',
                                onChangeText: (value) => onChangeHandler('email', value)
                            }}
                        />
                        <Field 
                            label={'Password'} 
                            labelStyles={styles.labelStyles}
                            inputStyle={styles.inputStyles}
                            fieldConfig={{
                                secureTextEntry: true,
                                onChangeText: (value) => onChangeHandler('password', value)
                            }}
                        />
                        <Button 
                            style={styles.button} 
                            varient=''
                            buttonTextStyle={{ color: 'white' }}
                            onPress={onSubmit}
                        >Login</Button>
                        <Text style={styles.alertText} onPress={() => {
                            navigation.replace('signup')
                        }}>Click here to <Text style={styles.alertBold}>Sign up</Text></Text>
                    </View>
            </View>
        </KeyboardAvoidingView>
    </ScrollView>
  )
}

export default Login

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    labelStyles: {
        color: 'white'
    },
    inputStyles: {
        borderColor: 'white',
        color: 'white'
    },
    form: {
        paddingHorizontal: 16,
        paddingVertical: 24,
        minWidth: 320,
        maxWidth: 400,
        backgroundColor: '#3985d1',
        borderRadius: 8,
        flexDirection: 'column',
        gap: 16,
        marginTop: 180
    },
    button: {
        borderRadius: 4,
        backgroundColor: '#3544f7',
        borderWidth: 0
    },
    alertText: {
        color: 'white',
        marginVertical: 8,
    },
    alertBold: {
        fontWeight: 'bold'
    }
})