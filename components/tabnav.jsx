import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '../screens/home';

const Tab = createBottomTabNavigator();
const TabNav = () => {
              return (
                            <NavigationContainer>
                                          <Tab.Navigator
                                                        screenOptions={({ route }) => ({
                                                                      tabBarIcon: ({ focused, color, size }) => {
                                                                                    let iconName;

                                                                                    if (route.name === 'Anasayfa') { //Altdaki ikonların focuslama işlemi için
                                                                                                  iconName = focused
                                                                                                                ? 'home'
                                                                                                                : 'home-outline';
                                                                                    } else if (route.name === 'Ayarlar') {
                                                                                                  iconName = focused ? 'settings' : 'settings-outline';
                                                                                    }

                                                                                    return <Ionicons name={iconName} size={size} color={color} />;
                                                                      },
                                                                      tabBarActiveTintColor: 'darkred',
                                                                      tabBarInactiveTintColor: 'gray',
                                                                      headerTitle: 'To Do App',
                                                                      headerTitleAlign: 'center',
                                                                      headerStyle: {
                                                                                    backgroundColor: '#E2E8ED',
                                                                                    shadowColor: "#000",
                                                                                    shadowOffset: {
                                                                                                  width: 0,
                                                                                                  height: 8,
                                                                                    },
                                                                                    shadowOpacity: 0.44,
                                                                                    shadowRadius: 10.32,

                                                                                    elevation: 13,
                                                                      },
                                                                      headerTitleStyle: {
                                                                                    fontWeight: '600'
                                                                      },
                                                                      tabBarActiveTintColor: 'darkred',
                                                                      tabBarInactiveTintColor: 'gray',
                                                        })}
                                          >
                                                        {/* name ismi üstde yazan yerler */}
                                                        <Tab.Screen name="Anasayfa" component={Home} />

                                          </Tab.Navigator>
                            </NavigationContainer>
              );
}

export default TabNav;