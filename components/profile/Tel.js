import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements'

import mainColor from './constants'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 25,
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  iconRow: {
    flex: 2,
    justifyContent: 'center',
  },
  smsIcon: {
    color: 'darkgray',
    fontSize: 30,
  },
  telIcon: {
    color: mainColor,
    fontSize: 30,
  },
  telNameColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  telNameText: {
    color: 'gray',
    fontSize: 14,
    fontWeight: '200',
  },
  telNumberColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 5,
  },
  telNumberText: {
    fontSize: 16,
  },
  telRow: {
    flex: 8,
    flexDirection: 'column',
    justifyContent: 'center',
  },
})

const Tel = ({
  name,
  number,
}) => {

  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.iconRow}>
            <Icon
              name="call"
              underlayColor="transparent"
              iconStyle={styles.telIcon}
            />
        </View>
        <View style={styles.telRow}>
          <View style={styles.telNumberColumn}>
            <Text style={styles.telNumberText}>{number} </Text>
          </View>
          <View style={styles.telNameColumn}>
            {name.length !== 0 && (
              <Text style={styles.telNameText}>{name} </Text>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default Tel;
