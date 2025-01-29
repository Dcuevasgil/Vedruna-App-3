import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'

export function SettingsScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.settingsText}>SettingsScreen</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsText: {
    fontSize: 20
  }
})