import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import { Swipeable } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

const CustomCardList = ({ listData, formatDate, onEdit, onDelete }) => {
    const [expandedItem, setExpandedItem] = useState(null);
    
    const renderRightActions = (item) => {
        return (
          <View style={styles.rightActions}>
            <Button style={styles.actionButton} onPress={() => onEdit(item)}>
              <Icon style={styles.icons} name="edit" size={20} color="white" />
            </Button>
            <Button style={styles.deleteButton} onPress={() => onDelete(item.id)}>
              <Icon name="trash-2" size={20} color="white" />
            </Button>
          </View>
        );
    };

    const toggleExpansion = (itemId) => {
        if (expandedItem === itemId) {
          setExpandedItem(null);
        } else {
          setExpandedItem(itemId);
        }
    };
    
    const renderItem = ({ item }) => (
        <Swipeable
            renderRightActions={() => renderRightActions(item)}
            overshootLeft={false}        
            overshootRight={false}
        >          
            <TouchableWithoutFeedback onPress={() => toggleExpansion(item.id)}>
            <View style={styles.card}>
              <View style={styles.details}>
                <Text style={styles.title}>{item.vlasnik}</Text>
                <Text style={styles.text}>Datum registracije: {formatDate(item.datumRegistracije)}</Text>
                <Text style={styles.text}>Registrovan do: {formatDate(item.registrovanDo)}</Text>
                {expandedItem === item.id && (
                  <>
                    <Text style={styles.text}>Broj šasije: {item.brojSasije}</Text>
                    <Text style={styles.text}>Kilometraža: {item.kilometraza} km</Text>
                    <Text style={styles.text}>Proizvođač: {item.proizvodjac}</Text>
                    <Text style={styles.text}>Model: {item.model}</Text>
                  </>
                )}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Swipeable>
    );
    
    return (
        <FlatList
        data={listData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.flatList}
        />
    );
}

const styles = StyleSheet.create({
    container: {},
  card: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 20,
    padding: 20,
  },
  details: {
    paddingLeft: 20,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    marginBottom: 5,
  },
  flatList: {
    width: Dimensions.get('window').width - 50,
  },
  rightActions: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    maxWidth: 100
  },
  actionButton: {
    backgroundColor: 'green',
    marginRight: 10,
    marginBottom: 10
  },
  deleteButton: {
    backgroundColor: 'red',
    marginRight: 10,
  },
  actionSeparator: {
    width: 10,
  },
   });

export default CustomCardList;