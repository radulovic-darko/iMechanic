import React from 'react';

import { ScrollView } from "react-native";
import { DataTable, IconButton  } from "react-native-paper";

const CustomDataTable = ({ tableData, columnNames, onUpdate, onDelete, getCustomColumnName, formatDate, handleSort }) => {
  return (
    <DataTable>
      <DataTable.Header>
          {columnNames.filter(columnName => columnName !== 'id').map((columnName) => (
              <DataTable.Title
                  key={columnName}
                  style={{ width: 150 }}
                  onPress={() => handleSort(columnName)}
              >
                  {getCustomColumnName(columnName)}
              </DataTable.Title>
          ))}
          <DataTable.Title>Uredi</DataTable.Title>
          <DataTable.Title>Izbrisi</DataTable.Title>
      </DataTable.Header>
      <ScrollView>
        {tableData.map((item, index) => (
          <DataTable.Row key={index}>
              {columnNames.filter(columnName => columnName !== 'id').map((columnName) => (
              <DataTable.Cell key={columnName} style={{ width: 150 }}>
                  {columnName == 'datumRegistracije' || columnName == 'registrovanDo' || columnName == 'datumServisa' || columnName == 'vaziDo' ? formatDate(item[columnName]) : item[columnName]}
              </DataTable.Cell>
              ))}
              <DataTable.Cell>
                  <IconButton
                  icon="pencil"
                  color="blue"
                  size={20}
                  onPress={() => { onUpdate(item) }}
                  />
              </DataTable.Cell>
              <DataTable.Cell>
                  <IconButton
                  icon="delete"
                  color="red"
                  size={20}
                  onPress={() => onDelete(item.id)}
                  />
              </DataTable.Cell>
          </DataTable.Row>
        ))}
      </ScrollView>
    </DataTable>
  );
};

export default CustomDataTable;
