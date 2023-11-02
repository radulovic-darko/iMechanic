import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';

const CreateRegistration = ({ isVisible, closeModal, setOriginalData, cancelModal }) => {
  const [brojSasije, setBrojSasije] = useState('');
  const [vlasnik, setVlasnik] = useState('');
  const [datumRegistracije, setDatumRegistracije] = useState(new Date());
  const [registrovanDo, setRegistrovanDo] = useState(new Date());
  const [kilometraza, setKilometraza] = useState('');
  const [proizvodjac, setProizvodjac] = useState('');
  const [model, setModel] = useState('');
  const [registarskaOznaka, setRegistarskaOznaka] = useState('');
  
  const [error, setError] = useState('');

  const [showTest1Picker, setShowTest1Picker] = useState(true);
  const [showTest2Picker, setShowTest2Picker] = useState(true);

  useEffect(() => {
    setShowTest1Picker(true);
    setShowTest2Picker(true);
  }, []);

  const handleSubmit = () => {
    if (brojSasije === '') {
        setError('Unesi broj šasije')
    } else if (vlasnik === '') {
        setError('Unesi ime vlasnika')
    } else if (registrovanDo === datumRegistracije) {
        setError('Unesi datum do kada važi registracija')
    } else if (kilometraza === '') {
        setError('Unesi kilometražu')
    } else if (proizvodjac === '') {
      setError('Unesi naziv proizvođača')
    } else if (model === '') {
      setError('Unesi naziv modela')
    } else if (registarskaOznaka === '') {
      setError('Unesi registarsku oznaku')
    } else {
        closeModal({
            brojSasije: brojSasije,
            owner: vlasnik,
            dateOfRegistration: datumRegistracije.toString(),
            dateOfRegistrationExpiration: registrovanDo.toString(),
            km: kilometraza,
            proizvodjac: proizvodjac,
            model: model,
            registarskaOznaka: registarskaOznaka
        });

        setBrojSasije('')
        setVlasnik('')
        setDatumRegistracije(new Date())
        setRegistrovanDo(new Date())
        setKilometraza('')
        setProizvodjac('')
        setModel('')
        setRegistarskaOznaka('')
    }
  };

  return (
    <Modal isVisible={isVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.row}>
          <Text style={styles.label}>Broj šasije</Text>
          <TextInput
            style={styles.input}
            value={brojSasije}
            onChangeText={setBrojSasije}
            placeholder="Unesite broj šasije"
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Vlasnik:</Text>
          <TextInput
            style={styles.input}
            value={vlasnik}
            onChangeText={setVlasnik}
            placeholder="Unesite ime vlasnika"
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Registrovan do</Text>
            <DateTimePicker
                value={registrovanDo}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={(event, selectedDate) => {
                    setShowTest1Picker(false);
                    if (selectedDate) {
                        setRegistrovanDo(selectedDate);
                    }
                }}
            />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Kilometraža</Text>
          <TextInput
            style={styles.input}
            value={kilometraza}
            onChangeText={setKilometraza}
            placeholder="Unesite kilometražu"
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Proizvođač:</Text>
          <TextInput
            style={styles.input}
            value={proizvodjac}
            onChangeText={setProizvodjac}
            placeholder="Unesite naziv proizvođača"
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Model:</Text>
          <TextInput
            style={styles.input}
            value={model}
            onChangeText={setModel}
            placeholder="Unesite naziv modela"
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Registarska oznaka:</Text>
          <TextInput
            style={styles.input}
            value={registarskaOznaka}
            onChangeText={setRegistarskaOznaka}
            placeholder="Unesite registarsku oznaku"
          />
        </View>
        <Button title="Potvrdi" onPress={handleSubmit} />
        <Button title="Otkaži" onPress={cancelModal} />
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

export default CreateRegistration;
