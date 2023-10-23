import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { DataTable, Searchbar } from 'react-native-paper';
import _ from 'lodash';

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
];

const columnNames = [
  'brojSasije',
  'owner',
  'dateOfRegistration',
  'dateOfRegistrationExpiration',
  'km',
];

const Registrations = () => {
  const [tableData, setTableData] = useState(originalData);
  const [search, setSearch] = useState('');
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSort = (columnName) => {
    const direction = sortedColumn === columnName && sortDirection === 'asc' ? 'desc' : 'asc';
    const sortedData = _.orderBy(tableData, [columnName], [direction]);
    setSortedColumn(columnName);
    setSortDirection(direction);
    setTableData(sortedData);
  };

  const handleSearch = (text) => {
    setSearch(text);

    // Filtrirajte podatke na osnovu unosa pretrage u sve kolone
    const filteredData = _.filter(originalData, (item) =>
      _.some(item, (value) => value.toLowerCase().includes(text.toLowerCase()))
    );

    setTableData(filteredData);
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
    </>
  );
};

const styles = StyleSheet.create({
  columnFiltersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default Registrations;
