import React, { useLayoutEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const NavBar = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English'); // Default language set to English

  const languages = ['English', 'Tamil', 'Hindi'];

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const selectLanguage = (language) => {
    setSelectedLanguage(language);
    setDropdownVisible(false);
  };

  return (
    <View style={styles.navContainer}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('home')}>
        <Icon name="home" size={20} color="#333" />
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('profile')}>
        <Icon name="user" size={20} color="#333" />
        <Text style={styles.buttonText}>Profile</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ticket')}>
        <Icon name="envelope" size={20} color="#333" />
        <Text style={styles.buttonText}>Ticket</Text>
      </TouchableOpacity> */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('chat')}>
        <Icon name="envelope" size={20} color="#333" />
        <Text style={styles.buttonText}>Chat</Text>
      </TouchableOpacity>
      <View style={styles.dropdownContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleDropdown}>
          <Icon name="language" size={20} color="#333" />
          <Text style={styles.buttonText}>{selectedLanguage}</Text>
        </TouchableOpacity>
        {dropdownVisible && (
          <View style={styles.dropdown}>
            <FlatList
              data={languages}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.dropdownItem} onPress={() => selectLanguage(item)}>
                  <Text style={[styles.dropdownItemText, item === selectedLanguage && styles.selectedText]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    marginBottom: 0,
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(128, 128, 128, 0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 20,
  },
  button: {
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
  },
  dropdownContainer: {
    position: 'relative',
  },
  dropdown: {
    position: 'absolute',
    top: '-400%',
    marginLeft: '-140%',
    width: '300%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#EA5141',
    borderRadius: 10,
    shadowColor: '#000',
    elevation: 5,
    zIndex: 1000,
  },
  dropdownItem: {
    padding: 4
  },
  dropdownItemText: {
    fontSize: 25,
    color: 'black',
    padding: 2,
  },
  selectedText: {
    color: 'white',
    backgroundColor: '#EA5141',
    borderRadius: 5,
  },
});

export default NavBar;