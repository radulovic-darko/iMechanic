import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';

const EditRegistration = ({ isVisible, closeModal, item, closeModalCancel, brojSasije }) => {
  const [brojSasijeNew, setBrojSasijeNew] = useState(item.brojSasije);
  const [vlasnikNew, setVlasnikNew] = useState(item.vlasnik);
  const [datumRegistracijeNew, setDatumRegistracijeNew] = useState(new Date());
  const [registrovanDoNew, setRegistrovanDoNew] = useState(new Date());
  const [kilometrazaNew, setKilometrazaNew] = useState(item.kilometraza);
  const [proizvodjac, setProizvodjac] = useState(item.proizvodjac);
  const [model, setModel] = useState(item.model);
  const [registarskaOznaka, setRegistarskaOznaka] = useState(item.registarskaOznaka);

  const [error, setError] = useState('');

  const [showTest1Picker, setShowTest1Picker] = useState(true);
  const [showTest2Picker, setShowTest2Picker] = useState(true);

  // const setData = (item) => {
  //   console.log('item je -----------------------------> ' + item);
  //   setBrojSasijeNew(item.brojSasije);
  //   setVlasnikNew(item.vlasnik);
  //   // setDatumRegistracijeNew(new Date(item.dateOfRegistration));
  //   // setRegistrovanDoNew(new Date(item.dateOfRegistrationExpiration));
  //   setKilometrazaNew(item.kilometraza);
  //   setRegistarskaOznaka(item.registarskaOznaka);
  // }

  useEffect(() => {
    setShowTest1Picker(true);
    setShowTest2Picker(true);
  }, []);

  const handleSubmit = async () => {
    if (brojSasijeNew === '') {
        setError('Unesi broj šasije')
    } else if (vlasnikNew === '') {
        setError('Unesi ime vlasnika')
    } else if (datumRegistracijeNew > new Date()) {
      setError('Unesi ispravan datum registracije')
    } else if (registrovanDoNew === datumRegistracijeNew) {
        setError('Unesi datum do kada važi registracija')
    } else if (kilometrazaNew === '') {
        setError('Unesi kilometražu')
    } else if (proizvodjac === '') {
      setError('Unesi naziv proizvođača')
    } else if (model === '') {
      setError('Unesi naziv modela')
    }  else if (registarskaOznaka === '') {
      setError('Unesi registarsku oznaku')
    }  else {
      const url = 'https://imechanicapi.azure-api.net/update?subscription-key=1cedd268c81543d7b6e7f736d016475b';
      
      const requestBody = {
        "id": item.id,
        "brojSasije": brojSasijeNew,
        "vlasnik": vlasnikNew,
        "datumRegistracije": datumRegistracijeNew,
        "registrovanDo": registrovanDoNew,
        "kilometraza": kilometrazaNew,
        "proizvodjac": proizvodjac,
        "model": model,
        "registarskaOznaka": registarskaOznaka
      };
    
      try {
        const response = await axios.put(url, requestBody);
    
        if (response.status === 200) {
          console.log('Uspešan odgovor:', response.data);
        } else {
          console.error('Neuspešan zahtev:', response.status, response.data);
        }
      } catch (error) {
        console.error('Greška:', error);
      }
      
      closeModal();
    }
  };

  return (
    <Modal isVisible={isVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.row}>
          <Text style={styles.label}>Broj šasije</Text>
          <TextInput
            style={styles.input}
            onChangeText={setBrojSasijeNew}
            placeholder="Unesite broj šasije"
          >{item.brojSasije}</TextInput>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Vlasnik:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setVlasnikNew}
            placeholder="Unesite ime vlasnika"
          >{item.vlasnik}</TextInput>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Datum registracije</Text>
            <DateTimePicker
                value={datumRegistracijeNew}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={(event, selectedDate) => {
                    setShowTest1Picker(false);
                    if (selectedDate) {
                        setDatumRegistracijeNew(selectedDate);
                    }
                }}
            />
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>Registrovan do</Text>
            <DateTimePicker
                value={registrovanDoNew}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={(event, selectedDate) => {
                    setShowTest1Picker(false);
                    if (selectedDate) {
                        setRegistrovanDoNew(selectedDate);
                    }
                }}
            />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Kilometraža</Text>
          <TextInput
            style={styles.input}
            onChangeText={setKilometrazaNew}
            placeholder="Unesite kilometražu"
          >{item.kilometraza}</TextInput>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Proizvođač:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setProizvodjac}
            placeholder="Unesite naziv proizvođača"
          >{item.proizvodjac}</TextInput>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Model:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setModel}
            placeholder="Unesite naziv modela"
          >{item.model}</TextInput>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Registarska oznaka:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setRegistarskaOznaka}
            placeholder="Unesite registarsku oznaku"
          >{item.registarskaOznaka}</TextInput>
        </View>
        <Button title="Potvrdi" onPress={handleSubmit} />
        <Button title="Otkaži" onPress={closeModalCancel} />
        <Text style={styles.error}> {error} </Text>
      </View>
    </Modal>
  );
};

const styles = {
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    flex: 2,
    marginRight: 10,
  },
  input: {
    flex: 3,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 5
  },
  error: {
    color: 'red',
    width: 200
  }
};

export default EditRegistration;
