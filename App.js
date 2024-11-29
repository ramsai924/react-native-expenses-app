import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './RootStack';
import RootContext from './store/context';

export default function App() {
  return (
    <>
      <StatusBar style='light' />
      <RootContext>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </RootContext>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
   
  },
});
