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
      isRefresh: false,
    };
  },

  handleScroll: function(e) {
    var {contentInset,contentOffset} = e.nativeEvent;
    console.log("offset y",contentOffset.y);
    if(contentOffset.y < -REFRESH_HEADER_HEIGHT && this.state.topInset != 0) {
      this.setState({isRefresh: true});
    }
  },

  hideHeader: function() {
    console.log("hide header");
    this.setState({isRefresh: false});
  },

  render: function() {
    var marginTop = this.state.isRefresh ? REFRESH_HEADER_HEIGHT : 0;

    return (
      <View style={[styles.scrollViewWrapper]}>
        <View style={styles.refreshHeader}>
          <TouchableOpacity onPress={this.hideHeader}>
            <Text>Tap to hide refresh header</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={[styles.scrollViewWrapper,{marginTop: marginTop}]}
          contentOffset={{y: 0}}
          onScroll={this.handleScroll}
          scrollEventThrottle={4}
          automaticallyAdjustContentInsets={false}>
          <Image style={styles.image} source={require("image!hikers")}/>



        </ScrollView>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  scrollViewWrapper: {
    flex: 1,

    // backgroundColor: 'rgba(255,0,0,0.1)',
  },

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
