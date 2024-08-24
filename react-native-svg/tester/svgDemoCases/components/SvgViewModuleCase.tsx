import React, {Component} from 'react';
import Svg, {
  Circle,
  Ellipse,
  G,
  Text,
  Path,
  Rect,
  Image,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
} from 'react-native-svg';
import {
  View,
  StyleSheet,
  ScrollView,
  Text as RNText,
  Image as RNImage,
  Button,
} from 'react-native';
import {Tester, Filter, TestCase, TestSuite} from '@rnoh/testerino';

const dataUriExample =
  'data:image/jpeg;base64,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';

const samples = [
  LinearGradientExample,
  ImageExample,
];

class LinearGradientExample extends Component {
  static title = 'The base64 conversion of SVG graphics';
  root?:Svg | null;
    state = {
        base64: null,
    };
    alert = () => {
        this.root?.toDataURL((base64: string) => {
            console.log(base64);
            this.setState({base64})
        },new Object())
    }
  render() {
    return (
      <View>
        <Button title='GetBase64' onPress={this.alert} />
      <Svg width="400" height="200" viewBox="0 0 500 400" ref={ele=>{this.root = ele;}}>
        <Defs>
          <LinearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="rgb(255,0,0)" />
            <Stop offset="100%" stopColor="rgb(0,0,255)" />
          </LinearGradient>
        </Defs>
        <Rect x="50" y="50" width="200" height="100" fill="url(#gradient)" />
        <Circle
          cx="300"
          cy="200"
          r="100"
          stroke="black"
          strokeWidth="5"
          fill="none"
        />
        <Text
          x="300"
          y="205"
          textAnchor="middle"
          fontSize="24"
          fill="url(#gradient)">
          SVG Circle
        </Text>
        <Path
          d="M100,100 C100,200 200,200 200,100"
          stroke="green"
          strokeWidth="2"
          fill="none"
        />
        <Rect x="400" y="50" width="100" height="100" fill="blue"></Rect>
        <Ellipse
          cx="50"
          cy="300"
          rx="100"
          ry="50"
          fill="url(#gradient)"></Ellipse>
      </Svg>
      <RNText style={{fontSize: 8, color: 'black'}} numberOfLines={5}>  
        {`data:image/png;base64,${this.state.base64}`}
      </RNText>
      <View style={{width: 400, height: 200, borderWidth: 1, marginTop: 5}}>
          {this.state.base64 && (
            <RNImage
              source={{uri: `data:image/png;base64,${this.state.base64}`}}
              style={{width: 400, height: 200}}
            />
          )}
        </View>
      </View>
    );
  }
}

class ImageExample extends Component {
  static title = 'The base64 conversion of url image';
  state = {
    base64: String,
  }
  root?:Svg | null;
  alert = () => {
    this.root?.toDataURL((base64: String) => {
        console.log(base64)
        this.setState({
            base64,
        })
    },new Object())
  }
  render() {
    return (
      <View>
        <Button title='GetBase64' onPress={this.alert} />
        <Svg height="100" width="100" ref= {ele=>{this.root = ele}}>
            <Defs>
            <ClipPath id="image-clip">
                <Circle cx="50%" cy="50%" r="40%" />
            </ClipPath>
            </Defs>
            <Rect x="0" y="0" width="100%" height="100%" fill="red" />
            <Rect x="5%" y="5%" width="50%" height="90%" />
            <Image
            x="5%"
            y="5%"
            width="50%"
            height="90%"
            preserveAspectRatio="xMidYMid slice"
            opacity="0.5"
            href={{uri: dataUriExample}}
            clipPath="url(#image-clip)"
            />
            <Text
            x="50"
            y="50"
            textAnchor="middle"
            fontWeight="bold"
            fontSize="16"
            fill="blue">
            HOGWARTS
            </Text>
      </Svg>
        <RNText style={{fontSize: 8, color: 'black'}} numberOfLines={5}>  
        {`data:image/png;base64,${this.state.base64}`}
        </RNText>
        <View style={{width: 150, height: 150, borderWidth: 1, marginTop: 5}}>
        {this.state.base64 && (
            <RNImage
            source={{uri: `data:image/png;base64,${this.state.base64}`}}
            style={{width: 150, height: 150}}
          />
        )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
    width: 200,
    backgroundColor: 'red',
  },
  svg: {
    height: '80%',
    width: '80%',
    flex: 1,
    alignSelf: 'stretch',
  },
});

export default function() {
    return(
      <Tester style={{flex: 1}}>
        <ScrollView>
          <TestCase itShould="The base64 conversion of SVG graphics">
            <LinearGradientExample />
          </TestCase>
          <TestCase itShould="The base64 conversion of url image">
            <ImageExample />
          </TestCase>
        </ScrollView>
      </Tester>
    )
}