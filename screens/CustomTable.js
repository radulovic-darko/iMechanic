import { React, useState } from "react";
import EditRegistration from "./EditRegistration";
import axios from "axios";
import CustomDataTable from "./CustomDataTable";
import CustomCardList from "./CustomCardList";

const CustomTable = ({ tableData, columnNames, handleSort, originalData, setOriginalData, showTable }) => {
    const [showModal, setShowModal] = useState(false);
    const [item2, setItem2] = useState({});

    const closeModal = () => {
        setShowModal(false);
        setOriginalData([]);
    }

    const deleteData = async (id) => {
        try {
          const response = await axios.delete('https://imechanicapi.azure-api.net/delete/'+id+'?subscription-key=1cedd268c81543d7b6e7f736d016475b');
          setOriginalData([])
        } catch (error) {
          console.error('Error deleting data:', error);
        }
    };
    
    const closeModalCancel = () => {
      setShowModal(false);
    };
    
    const formatDate = (date) => {
      const dateToFormat = new Date(date);
      console.log(dateToFormat);
      const formatedDate = `${dateToFormat.getDate()}.${dateToFormat.getMonth() + 1}.${dateToFormat.getFullYear()}.`;
      return formatedDate;
    };

    const setModalData = (data) => {
      setItem2(data);
      setShowModal(true);
    };

    return (
        <>
        
      {showTable && <CustomDataTable tableData={tableData} columnNames={columnNames} onUpdate={setModalData} onDelete={deleteData} getCustomColumnName={getCustomColumnName} formatDate={formatDate} handleSort={handleSort}/> }
      {!showTable && <CustomCardList listData={tableData} formatDate={formatDate} onEdit={setModalData} onDelete={deleteData}/> }
      <EditRegistration isVisible={showModal} closeModal={closeModal} item={item2} closeModalCancel={closeModalCancel}
      brojSasije={item2.brojSasije}/>
      </>
    );
}

const getCustomColumnName = (columnName) => {
  switch (columnName) {
    case 'brojSasije':
      return 'Broj šasije';
    case 'vlasnik':
      return 'Vlasnik';
    case 'datumRegistracije':
      return 'Datum registracije';
    case 'registrovanDo':
      return 'Registrovan do';
    case 'kilometraza':
      return 'Kilometraža';
    case 'registarskaOznaka':
      return 'Registarska oznaka';
    default:
      return columnName;
  }
};

export default CustomTable;