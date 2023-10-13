import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, FlatList, TextInput, View, Text, Button, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';

const Home = () => {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    loadSavedData();
  }, []);

  const loadSavedData = async () => {
    try {
      const savedData = await AsyncStorage.getItem('data');
      if (savedData) {
        setData(JSON.parse(savedData));
      }
    } catch (error) {
      setError('Veriler yüklenirken bir hata oluştu.');
    }
  };

  const saveDataToStorage = async (newData) => {
    try {
      await AsyncStorage.setItem('data', JSON.stringify(newData));
    } catch (error) {
      setError('Veriler kaydedilirken bir hata oluştu.');
    }
  };

  const handleInputChange = (text) => {
    setInputValue(text);
  };

  const handleAddData = () => {
    if (inputValue && selectedDate) {
      const newData = {
        date: selectedDate,
        value: inputValue,
        additionalData: 'Ek bilgi',
      };

      const updatedData = [...data, newData];
      setData(updatedData);
      saveDataToStorage(updatedData);

      setInputValue('');
      setSelectedDate('');

      const currentDate = new Date();
      const selectedDateTime = new Date(selectedDate);

      if (
        currentDate.getDate() === selectedDateTime.getDate() &&
        currentDate.getMonth() === selectedDateTime.getMonth() &&
        currentDate.getFullYear() === selectedDateTime.getFullYear()
      ) {
        PushNotification.localNotification({
          title: 'Hatırlatma',
          message: `Bugün - ${inputValue}`,
        });
      }
    }
  };

  const handleDeleteData = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
    saveDataToStorage(newData);
  };

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  return (
    <ScrollView>
      <View>
        <Calendar onDayPress={handleDayPress} />
        <Text style={styles.showText}>Seçilen Tarih: {selectedDate}</Text>
        <TextInput
          style={styles.inputText}
          placeholder="Değerinizi girin"
          onChangeText={handleInputChange}
          value={inputValue}
        />
        <TouchableOpacity style={styles.button} onPress={handleAddData}>
          <Text style={styles.buttonText}>Ekle</Text>
        </TouchableOpacity>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <Text style={styles.showTitle}>Yapılacaklar Listesi</Text>
        <SafeAreaView>
          <FlatList
            data={data}
            renderItem={({ item, index }) => (
              <View style={styles.listItem}>
                <View>
                  <Text style={styles.showToDo} key={index}>- {item.value}</Text>
                  <Text style={styles.showDate} key={index}>{item.date}</Text>
                </View>
                <TouchableOpacity style={styles.deletebutton} onPress={() => handleDeleteData(index)}>
                  <Text style={styles.buttonText}>Sil</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </SafeAreaView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginVertical: 5,
    width: 150,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  inputText: {
    borderRadius: 15,
    backgroundColor: '#ffffff',
    fontSize: 20,
    marginVertical: 10,
    paddingVertical: 25,
    paddingHorizontal: 10,
  },
  showText: {
    fontSize: 20,
    marginVertical: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  showTitle: {
    fontWeight: 'bold',
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: 20,
    paddingHorizontal: 10,
  },
  listItem: {
    marginBottom: 5,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  showToDo: {
    fontSize: 20,
    paddingHorizontal: 10,
  },
  showDate: {
    paddingVertical: 15,
    fontSize: 15,
    paddingHorizontal: 10,
  },
  deletebutton: {
    backgroundColor: '#db0808',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Home;
