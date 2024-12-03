import { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';

import ManageExpenses from './screens/ManageExpenses';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import IconButton from './components/UI/IconButton';
import Login from './screens/Login';
import Signup from './screens/SignUp';
import { useExpensesContext } from './store/context';


SplashScreen.preventAutoHideAsync();

// SplashScreen.setOptions({
//   duration: 1000,
//   fade: true,
// });

const Stack = createNativeStackNavigator()
const BottomTab = createBottomTabNavigator()

const ExpensesOverview = () => {
  const { deleteToken } = useExpensesContext()
  
  return (
    <BottomTab.Navigator
        screenOptions={({ navigation }) => ({
            headerStyle: {
                backgroundColor: '#505df4'
            },
            headerTitleStyle: {
              color: 'white',
            },
            headerRight: () => (
              <IconButton 
                icon={'exit-outline'} 
                size={28} color={'white'} 
                style={{ paddingBottom: 8 }} 
                onPress={deleteToken}
              />
            ),
            headerLeft: () => (
              <IconButton 
                icon={'add-circle-outline'} 
                size={28} color={'white'} 
                style={{ paddingBottom: 8 }} 
                onPress={() => {
                  navigation.navigate('manageExpenses', { 
                    action: 'ADD',
                    data: null
                  })
                }}
              />
            ),
        })}
    >
      <BottomTab.Screen 
        name="recentExpenses" 
        component={RecentExpenses}
        options={{
          title: 'Recent',
          tabBarIcon: ({ focused, color, size }) => <Ionicons name='time' color={color} size={size} />,
          tabBarLabelStyle: {
            fontSize: 12
          }
        }}
      />
      <BottomTab.Screen 
        name="allExpenses" 
        component={AllExpenses}
        options={{
          title: 'All Expenses',
          tabBarIcon: ({ focused, color, size }) => <Ionicons name='list' color={color} size={size} />,
          tabBarLabelStyle: {
            fontSize: 12
          }
        }}
      />
    </BottomTab.Navigator>
  )
}

const ProtectedStack = () => {
  return (
      <Stack.Navigator 
          screenOptions={{
              headerStyle: {
                  backgroundColor: '#3544f7'
              }
          }}
      >
          <Stack.Screen 
          name='expensesOverview' 
          component={ExpensesOverview}
          options={{
              headerShown: false
          }} 
          />
          <Stack.Screen 
            name='manageExpenses' 
            component={ManageExpenses} 
            options={{
              presentation: 'modal',
              headerTitleStyle: {
                color: 'white',
              }
            }}
          />
      </Stack.Navigator>
  )
}

const Authentication = () => {
  return (
    <Stack.Navigator
      screenOptions={{
          headerStyle: {
              backgroundColor: '#3544f7'
          },
          headerTitleStyle: {
            color: 'white',
          },
      }}
    >
      <Stack.Screen name='login' component={Login} options={{ title: 'Login' }}/>
      <Stack.Screen name='signup' component={Signup} options={{ title: 'Sign Up' }} />
    </Stack.Navigator>
  )
}

const RootStack = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const { token, createToken } = useExpensesContext()

     const getStoredToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('expenses-token')
        if(storedToken !== null){
          createToken(storedToken)
          setAppIsReady(true);
          SplashScreen.hide();
        }
      } catch (error) {
        
      }
    }

    useEffect(() => {
      getStoredToken()
    }, [])

    if (!appIsReady) {
    return null;
  }

  return (
    <>
      {!token && <Authentication />}
      {token && <ProtectedStack />}
    </>
  )
}

export default RootStack