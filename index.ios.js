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
      isRefreshing: false,
      topInset: -REFRESH_HEADER_HEIGHT,
    };
  },

  handleScroll: function(e) {
    var {contentInset,contentOffset} = e.nativeEvent;
    this._scrollEvent = e.nativeEvent;
  },

  handleResponderRelease: function(e) {
    // change the inset on release
    var {contentInset,contentOffset} = this._scrollEvent;
    console.log("offset y",contentOffset.y);
    if(contentOffset.y < 0 && this.state.isRefreshing == false) {
      this.setState({isRefreshing: true});
    }
  },

  hideHeader: function() {
    console.log("hide header");
    this.setState({isRefreshing: false});
  },

  render: function() {
    var resetOffset;

    var {isRefreshing} = this.state;
    var topInset = isRefreshing ? 0 : -REFRESH_HEADER_HEIGHT;

    // if contentOffset is set, it behaves strangely again.
    var offset = {}; // isRefreshing ? {} : {y: 0};


    return (
      <ScrollView style={styles.scrollView}
        /* contentOffset={shouldResetOffset ? {y: 0} : undefined} */
         /* {...resetOffset} */
        contentOffset={offset}
        contentInset={{top: topInset}}
        onScroll={this.handleScroll}
        scrollEventThrottle={4}
        onResponderRelease={this.handleResponderRelease}
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
