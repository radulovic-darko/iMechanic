import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Modal, TextInput, Button as RNButton, TouchableWithoutFeedback } from 'react-native';
import { Searchbar, Button, ToggleButton  } from 'react-native-paper';
import _, { filter } from 'lodash';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CustomTable from './CustomTable';
import { Colors } from '../components/styles';
import CreateRegistration from './CreateRegistration';
import axios from 'axios';
import uuid from 'react-native-uuid';

//colors
const { primary, red } = Colors;

const columnNames = [
  'id',
  'brojSasije',
  'vlasnik',
  'datumRegistracije',
  'registrovanDo',
  'kilometraza',
  'proizvodjac',
  'model',
  'registarskaOznaka'
];

const Registrations = () => {
  const [tableData, setTableData] = useState([]);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [showModal, setShowModal] = useState(false);
  const [originalData, setOriginalData] = useState([]);
  const [showTable, setShowTable] = useState(true);

  useEffect(() => {
    // Function to make the Axios GET request
    const fetchData = async () => {
      try {
        const response = await axios.get('https://imechanicapi.azure-api.net/registrations?subscription-key=1cedd268c81543d7b6e7f736d016475b');
        console.log('uslo  ------>  ' + response.data[0].registarskaOznaka);
        setData(response.data); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [originalData]); 

  useEffect(() => {
    setTableData(data);
  }, [data])
  
  const closeModalCancel = () => {
    setShowModal(false);
  };

  const closeModal = async (data) => {
    console.log('data je '+data.datumRegistracije);
    
    const url = 'https://imechanicapi.azure-api.net/create?subscription-key=1cedd268c81543d7b6e7f736d016475b';
    const requestBody = {
      "id": uuid.v4(),
      "brojSasije": data.brojSasije,
      "vlasnik": data.owner,
      "datumRegistracije": data.dateOfRegistration,
      "registrovanDo": data.dateOfRegistrationExpiration,
      "kilometraza": data.km,
      "proizvodjac": data.proizvodjac,
      "model": data.model,
      "registarskaOznaka": data.registarskaOznaka
    };
    console.log('id je :' + requestBody.id);
    try {
      const response = await axios.post(url, requestBody);
  
      if (response.status === 200) {
        console.log('Uspešan odgovor:', response.data);
      } else {
        console.error('Neuspešan zahtev:', response.status, response.data);
      }
    } catch (error) {
      console.error('Greška:', error);
    }

    setShowModal(false);
        
    setOriginalData([]);
  }

  useEffect(() => {
    setTableData(originalData)
  }, [originalData]);

  const handleSort = (columnName) => {
    const direction = sortedColumn === columnName && sortDirection === 'asc' ? 'desc' : 'asc';
    const sortedData = _.orderBy(tableData, [columnName], [direction]);
    setSortedColumn(columnName);
    setSortDirection(direction);
    setTableData(sortedData);
  };

  const handleSearch = (text) => {
    setSearch(text);
    const temp = data;

    // Filtrirajte podatke na osnovu unosa pretrage u sve kolone
    const filteredData = _.filter(temp, (item) =>
      _.some(item, (value) => value.toLowerCase().includes(text.toLowerCase()))
    );
    
    setTableData(filteredData);
  };

  return (
    <>
      <View style={styles.searchBarContainer}>
        <Searchbar
          placeholder="Search"
          value={search}
          onChangeText={handleSearch}
          style={{ flex: 1 }}
        />
        <ToggleButton
          icon={!showTable ? 'format-list-bulleted' : 'magnify'}
          value="table"
          status="unchecked"
          onPress={() => setShowTable(!showTable)}
          style={styles.toggleButton}
        />
      </View>
      
      <ScrollView horizontal style={{ marginHorizontal: 20 }}>
          <CustomTable tableData={tableData} columnNames={columnNames} handleSort={handleSort} originalData={originalData} setOriginalData={setOriginalData} showTable={showTable}></CustomTable>
      </ScrollView>
      <Button
        mode="contained"
        onPress={() => setShowModal(true)}
        style={{ margin: 30 }}
      >
        Kreiraj novu registraciju
      </Button>
      <CreateRegistration isVisible={showModal} closeModal={closeModal} cancelModal={closeModalCancel} setOriginalData={setOriginalData}/>
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%', 
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  textInput: {
    color: red,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 30,
  },
  toggleButton: {
    marginLeft: 10,
  },
});

export default Registrations;
