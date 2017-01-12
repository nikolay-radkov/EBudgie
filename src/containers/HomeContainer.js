import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { List, ListItem } from 'react-native-elements';
import Drawer from 'react-native-drawer';

import { createNewDrawer } from '../boundActionCreators/drawer';

class HomeContainer extends Component {
  constructor(state) {
    super(state);
    this.getDrawer = this.getDrawer.bind(this);
  }

  getDrawer(drawer) {
    const { createDrawer } = this.props;
    createDrawer(drawer);
  }

  render() {
    const list = [{
      avatar_url: 'https://upload.wikimedia.org/wikipedia/en/6/63/Action_Man_Aqua_Blaster_figure.jpg',
      name: 'Action Man',
      subtitle: 'Online'
    }];

    const MenuComponent = (
      <View style={{
        flex: 1,
        backgroundColor: '#ededed',
        paddingTop: 10,
      }}>
        <List containerStyle={{ marginBottom: 20 }}>
          {
            list.map((l, i) => (
              <ListItem
                avatar={l.avatar_url}
                key={i}
                onPress={() => console.log('Pressed')}
                roundAvatar
                subtitle={l.subtitle}
                title={l.name}
                />
            ))
          }
        </List>
      </View>
    );

    const drawerStyles = {
      drawer: {
        borderRightColor: 'rgba(0,0,0,1)',
        borderRightWidth: 0,
        elevation: 5,
        shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3
      },
      main: {

      }
    };

    return (
      <Drawer
        closedDrawerOffset={0}
        content={MenuComponent}
        openDrawerOffset={100}
        panCloseMask={0.9}
        panOpenMask={0.1}
        panThreshold={0.25}
        ref={this.getDrawer}
        side="left"
        styles={drawerStyles}
        tapToClose
        tweenHandler={(ratio) => ({
          main: { opacity: (2 - ratio) / 2 }
        })}
        type="overlay">

        <View style={{
          flex: 1,
          backgroundColor: 'red',
        }}>
          <Text>Here is your current budget</Text>
        </View>
      </Drawer>
    );
  }
}

HomeContainer.propTypes = {
  createDrawer: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {
    createDrawer: bindActionCreators(createNewDrawer, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);
