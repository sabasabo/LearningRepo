import React from 'react';
import { StyleSheet, Text, TextInput, View, Image } from 'react-native';


export default class App extends React.Component {
  render() {
    let pic = {
      uri: 'https://embarkvet.com/wp-content/uploads/2018/09/dog-transparent1.png'
    }
    return (
      <View style={styles.container}>
        <PizzaTranslator></PizzaTranslator>
        <Image source={pic} style={{ width: 200, height: 200 }} />
        <Blink text='Hello World'></Blink>
        <Greetings name='moti'></Greetings>
        <Greetings name='yosi'></Greetings>
      </View>
      // <View style={{flex:1, flexDirection: 'row', justifyContent: 'space-evenly'}}>
      //   <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}}></View>
      //   <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}}></View>
      //   <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}}></View>
      // </View>

      // <View style={{flex:1, flexDirection: 'column'}}>
      //   <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}}></View>
      //   <View style={{width: 100, height: 100, backgroundColor: 'skyblue'}}></View>
      //   <View style={{width: 150, height: 150, backgroundColor: 'steelblue'}}></View>
      // </View>

      // <View style={{flex: 1}}>
      //   <View style={{flex: 1, backgroundColor: 'powderblue'}}></View>
      //   <View style={{flex: 2, backgroundColor: 'skyblue'}}></View>
      //   <View style={{flex: 3, backgroundColor: 'steelblue'}}></View>
      // </View>
    );
  }
}

export class PizzaTranslator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { textToTranslate: '' };
  }

  render() {
    return (
      <View>
        <TextInput 
          style={{height: 40}}
          onChangeText={text => this.setState({ textToTranslate: text })}
          placeholder='Insert your text here'>
        </TextInput>        
        <Text
        style={{padding: 10, fontSize: 20}}>
          {this.state.textToTranslate.split(' ').map((char) => char && '🍕').join('')}
        </Text>
      </View>
    )
  }
}

export class Greetings extends React.Component {
  render() {
    return (
      <View>
        <Text>Hello {this.props.name} </Text>
      </View>
    );
  }
}

export class Blink extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isShow: false };

    setInterval(() => {
      this.setState(prevState => ({ isShow: !prevState.isShow }));
    }, 1000);
  }
  render() {
    if (!this.state.isShow) {
      return (
        <Text>{this.props.text}!!!</Text>
      )
    }
    return (
      <View>
        <Text>{this.props.text}</Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});