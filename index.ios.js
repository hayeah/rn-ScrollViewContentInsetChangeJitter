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

  ActivityIndicatorIOS,

  TouchableOpacity,
  LayoutAnimation,
  ScrollView,
  StatusBarIOS,
} = React;

StatusBarIOS.setHidden(true);

var REFRESH_HEADER_HEIGHT = 50;

var ScrollViewContentInsetChangeJitter = React.createClass({
  getInitialState: function() {
    return {
      isRefreshing: false,
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
    if(contentOffset.y < -REFRESH_HEADER_HEIGHT && this.state.isRefreshing == false) {
      this.setState({isRefreshing: true});
    }
  },

  /* Refresh hiding kludge to avoid setting contentOffset.

     1. Use negative margin to animate the entire scrollView up.
     2. After animation is done, remove margin and add contentInset to hide header.

     It works. Except for a weird bug where LayoutAnimation callback doesn't get called.
     Use a timeout callack instead ┐(´д`)┌
  */
  hideHeader: function() {
    if(!this.state.isRefreshing || this.state.isAnimatingHide) {
      return;
    }

    console.log("hide header");
    this.setState({isAnimatingHide: true});
    LayoutAnimation.easeInEaseOut(() => {
      console.log("end hide animation");
      // this.setState({isAnimatingHide: false, isRefreshing: false});
    },() => {
      console.log("hide animation error");
    });

    setTimeout(() => {
      console.log("end hide animation");
      this.setState({isAnimatingHide: false, isRefreshing: false});
    },300);
    // this.setState({isRefreshing: false});

  },

  render: function() {
    console.log(this.state);
    var resetOffset;

    var {isRefreshing, isAnimatingHide} = this.state;
    var topInset = isRefreshing ? REFRESH_HEADER_HEIGHT : 0;

    // Tried using offset to hide refresh header. Result: abrupt playback.
    // var offset = isRefreshing ? {} : {y: 0};


    return (
      <View style={styles.scrollViewWrapper}>
        <View style={styles.refreshHeader}>
          <ActivityIndicatorIOS size="small"/>
          <Text>Loading...</Text>

        </View>

        <ScrollView style={[styles.scrollView, isAnimatingHide && {marginTop: -REFRESH_HEADER_HEIGHT}]}
          // Kludge 1: If you fiddle around with contentOffset in anyway, scroll-back would halt abruptly. Avoid that.
          // contentOffset={offset}
          contentInset={{top: topInset}}
          onScroll={this.handleScroll}
          scrollEventThrottle={4}
          onResponderRelease={this.handleResponderRelease}
          automaticallyAdjustContentInsets={false}>

          <View style={styles.contentView}>
            <Image style={styles.image} source={require("image!hikers")}/>
            <TouchableOpacity onPress={this.hideHeader}>
              <View style={styles.hideRefreshContainer}>
                <Text style={styles.hideRefreshText}>hide refresh header</Text>
              </View>
            </TouchableOpacity>
          </View>







        </ScrollView>
      </View>

    );
  }
});

var styles = StyleSheet.create({
  scrollViewWrapper: {
    flex: 1,
  },

  scrollView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0)',
  },

  hideRefreshContainer: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // height: 30,
    // width: 150,
    marginTop: 50,
    padding: 20,
    alignSelf: 'center',


    backgroundColor: 'rgba(0,0,0,0.3)'
  },

  hideRefreshText: {
    color: '#fff',
  },

  refreshHeader: {
    backgroundColor: 'rgba(0,0,0,0.3)',

    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 50,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  contentView: {
    flex: 1,
    // width: 400,
    height: 800,
  },

  image: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

AppRegistry.registerComponent('ScrollViewContentInsetChangeJitter', () => ScrollViewContentInsetChangeJitter);
