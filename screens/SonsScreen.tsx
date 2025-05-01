import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, Slider } from 'react-native';

const SonsScreen = () => {
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [volume, setVolume] = useState(0.5);

  const toggleSound = () => setIsSoundEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações de Som</Text>

      <View style={styles.soundToggle}>
        <Text style={styles.label}>Habilitar Som:</Text>
        <Switch
          value={isSoundEnabled}
          onValueChange={toggleSound}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isSoundEnabled ? '#4FC3F7' : '#f4f3f4'}
        />
      </View>

      <View style={styles.volumeControl}>
        <Text style={styles.label}>Volume:</Text>
        <Slider
          style={styles.slider}
          value={volume}
          onValueChange={setVolume}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#4FC3F7"
          maximumTrackTintColor="#d3d3d3"
        />
        <Text style={styles.volumeValue}>{Math.round(volume * 100)}%</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  soundToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  label: {
    fontSize: 18,
    color: '#333',
    marginRight: 10,
  },
  volumeControl: {
    width: '100%',
    alignItems: 'center',
  },
  slider: {
    width: 300,
    marginBottom: 10,
  },
  volumeValue: {
    fontSize: 16,
    color: '#333',
  },
});

export default SonsScreen;
