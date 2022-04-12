import React, {Component, useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import formatTime from 'minutes-seconds-milliseconds';

const App = () => {
  const [timeElapsed, setTimeElapsed] = useState('');
  const [running, setRunning] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [laps, setLaps] = useState([]);
  let interval = null;

  useEffect(() => {
    if (running) {
      //set start watch
      interval = setInterval(() => setTimeElapsed(new Date() - startTime), 20);
    }
    return () => clearInterval(interval); //componentWillUnmount
  }, [running, startTime]);

  const lapArray = () => {
    return laps.map(function (time, index) {
      //console.log('1');
      return (
        <View key={index} style={styles.lap}>
          <Text style={styles.lapText}>Lap #{index + 1}</Text>
          <Text style={styles.lapText}>{formatTime(time)}</Text>
        </View>
      );
    });
  };

  const startStopButton = () => {
    var style = running ? styles.startButton : styles.stopButton; //Border color (green/red) button
    //console.log('2');
    return (
      <View>
        <TouchableHighlight
          underlayColor="gray"
          onPress={() => handleStartPress()}
          style={[styles.button, style]}>
          <Text>{running ? 'Stop' : 'Start'}</Text>
        </TouchableHighlight>
      </View>
    );
  };

  const lapButton = () => {
    //console.log('3');
    return (
      <View>
        <TouchableHighlight
          style={styles.button}
          underlayColor="gray"
          onPress={() => handleLapPress()}>
          <Text>Lap</Text>
        </TouchableHighlight>
      </View>
    );
  };

  const handleStartPress = () => {
    if (running) {
      setRunning(false);
      return;
    }
    //console.log('4');
    setRunning(true);
    setStartTime(new Date());
  };

  const handleLapPress = () => {
    var lap = timeElapsed;
    //console.log('5');
    setStartTime(new Date());
    setLaps(laps.concat([lap]));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.timerWrapper}>
          <Text style={styles.timer}>{formatTime(timeElapsed)}</Text>
        </View>
        <View style={styles.buttonWrapper}>
          {lapButton()}
          {startStopButton()}
        </View>
      </View>

      <View style={styles.footer}>{lapArray()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  header: {
    flex: 1,
  },
  footer: {
    flex: 1,
  },
  timerWrapper: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWrapper: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  lap: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    backgroundColor: 'lightgrey',
    padding: 10,
    marginTop: 10,
  },
  button: {
    borderWidth: 2,
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timer: {
    fontSize: 60,
  },
  lapText: {
    fontSize: 30,
  },
  startButton: {
    borderColor: 'green',
  },
  stopButton: {
    borderColor: 'red',
  },
});

export default App;
