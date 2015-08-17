/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,

  TouchableOpacity,

  ScrollView,
} = React;

var REFRESH_HEADER_HEIGHT = 50;

var ScrollViewContentInsetChangeJitter = React.createClass({
  getInitialState: function() {
    return {
      topInset: -REFRESH_HEADER_HEIGHT,
    };
  },

  handleScroll: function(e) {
    var {contentInset,contentOffset} = e.nativeEvent;
    console.log("offset y",contentOffset.y);
    if(contentOffset.y < 0 && this.state.topInset != 0) {
      this.setState({topInset: 0});
    }
  },

  hideHeader: function() {
    console.log("hide header");
    this.setState({topInset: -REFRESH_HEADER_HEIGHT});
  },

  render: function() {
    return (
      <ScrollView style={styles.scrollView}
        contentOffset={{y: -this.state.topInset}} /* reset initial offset */
        contentInset={{top: this.state.topInset}}
        onScroll={this.handleScroll}
        scrollEventThrottle={4}
        automaticallyAdjustContentInsets={false}>
        <Image style={styles.image} source={require("image!hikers")}/>

        <View style={styles.refreshHeader}>
          <TouchableOpacity onPress={this.hideHeader}>
            <Text>Tap to hide refresh header</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    );
  }
});

var styles = StyleSheet.create({
  scrollView: {
    flex: 1,

  },

  refreshHeader: {
    backgroundColor: 'rgba(255,0,0,0.3)',

    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 50,

    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    flex: 1,
    // width: 400,
    height: 800,
  },
});

AppRegistry.registerComponent('ScrollViewContentInsetChangeJitter', () => ScrollViewContentInsetChangeJitter);
