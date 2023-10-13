import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import TabNav from './components/tabnav';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>     
      <TabNav />
      <StatusBar style="auto" />
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
