import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import MultipleSelectList from 'react-native-multiple-select';
import { categories, states } from '../../constants/data';
import Icon from 'react-native-vector-icons/FontAwesome';

const AddMuseum = () => {
  const [museumName, setMuseumName] = useState('');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [showExist, setShowExist] = useState('No');
  const [showDetails, setShowDetails] = useState([]);
  const [openingTime, setOpeningTime] = useState(new Date());
  const [closingTime, setClosingTime] = useState(new Date());
  const [showOpeningTimePicker, setShowOpeningTimePicker] = useState(false); // for opening time picker
  const [showClosingTimePicker, setShowClosingTimePicker] = useState(false); // for closing time picker
  const [daysOpened, setDaysOpened] = useState([]);

  const addShowDetails = () => {
    setShowDetails([...showDetails, { showName: '', slot: '', seats: '' }]);
  };

  const handleShowDetailChange = (index, field, value) => {
    const updatedDetails = [...showDetails];
    updatedDetails[index][field] = value;
    setShowDetails(updatedDetails);
  };

  const daysList = ['S', 'M', 'T', 'W', 'Th', 'F', 'Sa'];

  const handleTimeChange = (event, selectedTime, setTime, setPickerVisible) => {
    setPickerVisible(false);
    if (selectedTime) {
      setTime(selectedTime);
    }
  };

  return (
    <ScrollView className="p-4 mt-4">
      {/* Museum Name */}
      <Text className="text-4xl">Add a Museum</Text>
      <View className="mb-4 mt-4">
        <Text className="text-lg">Museum Name</Text>
        <TextInput className="border p-2" value={museumName} onChangeText={setMuseumName} placeholder="Enter museum name" />
      </View>

      {/* Address */}
      <View className="mb-4">
        <Text className="text-lg">Address</Text>
        <TextInput className="border p-2" value={address} onChangeText={setAddress} placeholder="Enter address" />
      </View>

      {/* State Dropdown */}
      <View className="mb-4">
        <Text className="text-lg">State</Text>
        <Picker selectedValue={state} onValueChange={(itemValue) => setState(itemValue)}>
          {states.map((state, index) => <Picker.Item key={index} label={state} value={state} />)}
        </Picker>
      </View>

      {/* City */}
      <View className="mb-4">
        <Text className="text-lg">City</Text>
        <TextInput className="border p-2" value={city} onChangeText={setCity} placeholder="Enter city" />
      </View>

      {/* Description */}
      <View className="mb-4">
        <Text className="text-lg">Description</Text>
        <TextInput
          className="border p-2 h-20"
          value={description}
          onChangeText={setDescription}
          placeholder="Enter museum description"
          multiline
        />
      </View>

      {/* Category Dropdown */}
      <View className="mb-4">
        <Text className="text-lg">Category</Text>
        <Picker selectedValue={category} onValueChange={(itemValue) => setCategory(itemValue)}>
          {categories.map((cat, index) => <Picker.Item key={index} label={cat} value={cat} />)}
        </Picker>
      </View>

      {/* Image URL */}
      <View className="mb-4">
        <Text className="text-lg">Image URL</Text>
        <TextInput className="border p-2" value={imageUrl} onChangeText={setImageUrl} placeholder="Enter image URL" />
      </View>

      {/* Show Exists Dropdown */}
      <View className="mb-4">
        <Text className="text-lg">Show Exists</Text>
        <Picker selectedValue={showExist} onValueChange={(itemValue) => setShowExist(itemValue)}>
          <Picker.Item label="No" value="No" />
          <Picker.Item label="Yes" value="Yes" />
        </Picker>
      </View>

      {/* Show Details (if exists) */}
      {showExist === 'Yes' && (
        <View className="mb-4">
          {showDetails.map((show, index) => (
            <View key={index} className="mb-2">
              <Text>Show {index + 1}</Text>
              <TextInput className="border p-2" placeholder="Show Name" value={show.showName} onChangeText={(value) => handleShowDetailChange(index, 'showName', value)} />
              <TextInput className="border p-2" placeholder="Slot" value={show.slot} onChangeText={(value) => handleShowDetailChange(index, 'slot', value)} />
              <TextInput className="border p-2" placeholder="No. of Seats" keyboardType="numeric" value={show.seats} onChangeText={(value) => handleShowDetailChange(index, 'seats', value)} />
            </View>
          ))}
          <Button title="Add Another Show" onPress={addShowDetails} />
        </View>
      )}

      {/* Opening Time */}
      <View className="mb-4">
        <Text className="text-lg">Opening Time</Text>
        <TouchableOpacity onPress={() => setShowOpeningTimePicker(true)}>
          <Text className="border p-2">{openingTime.toLocaleTimeString()}</Text>
        </TouchableOpacity>
        {showOpeningTimePicker && (
          <DateTimePicker
            value={openingTime}
            mode="time"
            onChange={(event, selectedTime) => handleTimeChange(event, selectedTime, setOpeningTime, setShowOpeningTimePicker)}
          />
        )}
      </View>

      {/* Closing Time */}
      <View className="mb-4">
        <Text className="text-lg">Closing Time</Text>
        <TouchableOpacity onPress={() => setShowClosingTimePicker(true)}>
          <Text className="border p-2">{closingTime.toLocaleTimeString()}</Text>
        </TouchableOpacity>
        {showClosingTimePicker && (
          <DateTimePicker
            value={closingTime}
            mode="time"
            onChange={(event, selectedTime) => handleTimeChange(event, selectedTime, setClosingTime, setShowClosingTimePicker)}
          />
        )}
      </View>

      {/* Days Opened */}
      <View className="mb-4">
        <Text className="text-lg">Days Opened</Text>
        <MultipleSelectList
          items={daysList.map((day) => ({ id: day, name: day }))}
          selectedItems={daysOpened}
          setSelectedItems={setDaysOpened}
        />
      </View>

      {/* Submit Button */}
      <Button title="Submit" onPress={() => {/* Add submission logic */}} />
    </ScrollView>
  );
};

export default AddMuseum;
