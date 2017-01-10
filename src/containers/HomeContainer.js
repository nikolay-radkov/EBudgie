import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { SideMenu, List, ListItem } from 'react-native-elements'

class HomeContainer extends Component {
  constructor() {
    super()
    this.state = {
      isOpen: false
    }
    this.toggleSideMenu = this.toggleSideMenu.bind(this)
  }
    toggleSideMenu() {
      this.setState({
        isOpen: !this.state.isOpen
      })
    }
  render() {
    const list = [{
      avatar_url: 'https://openclipart.org/download/216151/Head.svg',
      name: 'pesho',
      subtitle: 'gosho'
    }];

    const MenuComponent = (
      <View style={{ flex: 1, backgroundColor: '#ededed', paddingTop: 50 }}>
        <List containerStyle={{ marginBottom: 20 }}>
          {
            list.map((l, i) => (
              <ListItem
                roundAvatar
                onPress={() => console.log('Pressed')}
                avatar={l.avatar_url}
                key={i}
                title={l.name}
                subtitle={l.subtitle}
                />
            ))
          }
        </List>
      </View>
    )


    return (
      //toggleSideMenu={this.toggleSideMenu.bind(this)}
      <SideMenu
        isOpen={this.state.isOpen}
        menu={MenuComponent}>
        <View style={{flex:1, backgroundColor: 'red'}}>
          <Text onPress={this.toggleSideMenu.bind(this)}> sdas</Text>
        </View>
      </SideMenu>
    )
  }
}

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);
