import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { reducers } from './store';
const store=createStore(reducers);
export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <AppNavigator/>
    </NavigationContainer>
    </Provider>
  );
}


