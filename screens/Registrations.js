import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Modal, TextInput, Button as RNButton } from 'react-native';
import { DataTable, Searchbar, Button } from 'react-native-paper';
import _ from 'lodash';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const originalData = [
    {
        brojSasije: '1',
        owner: 'Ivan Ivanovic',
        dateOfRegistration: 'test',
        dateOfRegistrationExpiration: 'test',
        km: '123123123'
    },
    {
        brojSasije: '2',
        owner: 'Marko Markovic',
        dateOfRegistration: 'test',
        dateOfRegistrationExpiration: 'test',
        km: '123123123'
    },
    {
        brojSasije: '3',
        owner: 'Petar Petrovic',
        dateOfRegistration: 'test',
        dateOfRegistrationExpiration: 'test',
        km: '123123123'
    },
    {
        brojSasije: '4',
        owner: 'Ivan Ivanovic',
        dateOfRegistration: 'test',
        dateOfRegistrationExpiration: 'test',
        km: '123123123'
    },
    {
        brojSasije: '5',
        owner: 'Marko Markovic',
        dateOfRegistration: 'test',
        dateOfRegistrationExpiration: 'test',
        km: '123123123'
    },
    {
        brojSasije: '6',
        owner: 'Petar Petrovic',
        dateOfRegistration: 'test1',
        dateOfRegistrationExpiration: 'test',
        km: '123123123'
    },
    {
        brojSasije: '7',
        owner: 'Ivan Ivanovic',
        dateOfRegistration: 'test',
        dateOfRegistrationExpiration: 'test34',
        km: '123123123'
    },
    {
        brojSasije: '8',
        owner: 'Marko Markovic',
        dateOfRegistration: 'test',
        dateOfRegistrationExpiration: 'test',
        km: '123123123'
    },
    {
        brojSasije: '9',
        owner: 'Petar Petrovic',
        dateOfRegistration: 'test',
        dateOfRegistrationExpiration: 'test',
        km: '2121'
    },
    {
        brojSasije: '10',
        owner: 'Petar Petrovic',
        dateOfRegistration: 'test',
        dateOfRegistrationExpiration: 'test',
        km: '2121'
    },
    {
        brojSasije: '11',
        owner: 'Petar Petrovic',
        dateOfRegistration: 'test',
        dateOfRegistrationExpiration: 'test',
        km: '2121'
    },
];

const columnNames = [
  'brojSasije',
  'owner',
  'dateOfRegistration',
  'dateOfRegistrationExpiration',
  'km',
];

const Registrations = () => {
  const [tableData, setTableData] = useState([]);
  const [search, setSearch] = useState('');
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [modalVisible, setModalVisible] = useState(false);
  const [newRegistrationData, setNewRegistrationData] = useState(
    {
      brojSasije: '',
      owner: '',
      dateOfRegistration: '',
      dateOfRegistrationExpiration: '',
      km: ''
  }
  )

  useEffect(() => {
    const startIndex = currentPage * PAGE_SIZE;
    console.log('startindex:'+ startIndex);
    const endIndex = startIndex + PAGE_SIZE;
    console.log('endIndex:'+ endIndex);

    // Filtrirajte podatke tako da prikažete samo one na trenutnoj stranici
    const currentPageData = originalData.slice(startIndex, endIndex);

    // Postavite trenutnu stranicu na prikazane podatke
    setTableData(currentPageData)
  }, [originalData, currentPage]);

  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isDatePickerExpirationVisible, setDatePickerExpirationVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateExpiration, setSelectedDateExpiration] = useState(null);  

  const [currentPage, setCurrentPage] = useState(0);
  const PAGE_SIZE = 10;

  const openModal = () => setModalVisible(true);

  const closeModal = () => setModalVisible(false);

  const handleSort = (columnName) => {
    const direction = sortedColumn === columnName && sortDirection === 'asc' ? 'desc' : 'asc';
    const sortedData = _.orderBy(tableData, [columnName], [direction]);
    setSortedColumn(columnName);
    setSortDirection(direction);
    setTableData(sortedData);
  };

  const filteredData = _.filter(originalData, (item) =>
    _.some(item, (value) => value.toLowerCase().includes(search.toLowerCase()))
  );

  const addNewRegistration = () => {
    // Validacija podataka
    if (
      newRegistrationData.brojSasije &&
      newRegistrationData.owner &&
      newRegistrationData.dateOfRegistration &&
      newRegistrationData.dateOfRegistrationExpiration &&
      newRegistrationData.km
    ) {
      const newRegistration = {
        ...newRegistrationData,
        dateOfRegistration: newRegistrationData.dateOfRegistration.toJSON(),
        dateOfRegistrationExpiration: newRegistrationData.dateOfRegistrationExpiration.toJSON(),
      };

      originalData.push(newRegistration);
      closeModal();
      setNewRegistrationData({
        brojSasije: '',
        owner: '',
        dateOfRegistration: '',
        dateOfRegistrationExpiration: '',
        km: '',
      });
    }
  };

  const handleSearch = (text) => {
    setSearch(text);

    // Filtrirajte podatke na osnovu unosa pretrage u sve kolone
    const filteredData = _.filter(originalData, (item) =>
      _.some(item, (value) => value.toLowerCase().includes(text.toLowerCase()))
    );

    setTableData(filteredData);
  };

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };
  
  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };
  
  const showDatePickerExpiration = () => {
    setDatePickerExpirationVisible(true);
  };
  
  const hideDatePickerExpiration = () => {
    setDatePickerExpirationVisible(false);
  };

  const handleDatePicked = (date) => {
    setSelectedDate(date);
    setNewRegistrationData({ ...newRegistrationData, dateOfRegistration: date })
    hideDatePicker();
  };
  
  const handleDateExpirationPicked = (date) => {
    setSelectedDateExpiration(date);
    setNewRegistrationData({ ...newRegistrationData, dateOfRegistrationExpiration: date })
    hideDatePickerExpiration();
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    console.log('current page:' + currentPage);
  };

  return (
    <>
      <Searchbar
        placeholder="Search"
        value={search}
        onChangeText={handleSearch}
        style={{margin: 30}}
      />
      <ScrollView horizontal style={{ marginHorizontal: 20 }}>
        <ScrollView>
          <DataTable>
            <DataTable.Header>
              {columnNames.map((columnName) => (
                <DataTable.Title
                  key={columnName}
                  style={{ width: 150 }} // Podesite željenu širinu kolone
                  onPress={() => handleSort(columnName)}
                >
                  {columnName}
                </DataTable.Title>
              ))}
            </DataTable.Header>
            {tableData.map((item, index) => (
              <DataTable.Row key={index}>
                {columnNames.map((columnName) => (
                  <DataTable.Cell key={columnName} style={{ width: 150 }}>
                    {item[columnName]}
                  </DataTable.Cell>
                ))}
              </DataTable.Row>
            ))}
          </DataTable>
        </ScrollView>
      </ScrollView>
      <Button
        mode="contained"
        onPress={openModal}
        style={{ margin: 30 }}
      >
        Kreiraj novu registraciju
      </Button>
      <Modal visible={modalVisible} animationType="slide">
        <SafeAreaView style={styles.modalContainer}>
          <ScrollView>
            <View style={styles.modalContent}>
              <Text style={styles.modalLabel}>Broj šasije:</Text>
              <TextInput
                placeholder="Unesite broj šasije"
                value={newRegistrationData.brojSasije}
                onChangeText={(text) =>
                  setNewRegistrationData({ ...newRegistrationData, brojSasije: text })
                }
              />
              <Text style={styles.modalLabel}>Vlasnik:</Text>
              <TextInput
                placeholder="Unesite vlasnika"
                value={newRegistrationData.owner}
                onChangeText={(text) =>
                  setNewRegistrationData({ ...newRegistrationData, owner: text })
                }
              />
              <Text style={styles.modalLabel}>Datum registracije:</Text>
              <TouchableOpacity onPress={showDatePicker}>
                <Text>{selectedDate ? selectedDate.toLocaleDateString() : "Izaberite datum"}</Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleDatePicked}
                onCancel={hideDatePicker}
              />

              <Text style={styles.modalLabel}>Datum isteka registracije:</Text>
              <TouchableOpacity onPress={showDatePickerExpiration}>
                <Text>{selectedDateExpiration ? selectedDateExpiration.toLocaleDateString() : "Izaberite datum"}</Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isDatePickerExpirationVisible}
                mode="date"
                onConfirm={handleDateExpirationPicked}
                onCancel={hideDatePickerExpiration}
              />
              <Text style={styles.modalLabel}>Kilometraža:</Text>
              <TextInput
                placeholder="Unesite kilometražu"
                value={newRegistrationData.km}
                onChangeText={(text) =>
                  setNewRegistrationData({ ...newRegistrationData, km: text })
                }
              />
              <RNButton title="Kreiraj" onPress={addNewRegistration} />
              <RNButton title="Zatvori" onPress={closeModal} />
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
      <View style={styles.paginationContainer}>
        <Button
          mode="contained"
          onPress={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
        >
          Prethodna stranica
        </Button>
        <Button
          mode="contained"
          onPress={() => handlePageChange(currentPage + 1)}
          disabled={currentPage * PAGE_SIZE + PAGE_SIZE >= filteredData.length}
        >
          Sledeća stranica
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  // ... (ostatak originalnog koda)
});

export default Registrations;
