import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView } from 'react-native';
import { bindActionCreators } from 'redux';
import { List, ListItem } from 'react-native-elements';
import Drawer from 'react-native-drawer';
import Calendar from 'react-native-calendar';

import { createNewDrawer } from '../boundActionCreators/drawer';
import { pushRoute } from '../boundActionCreators/navigation';

class HomeContainer extends Component {
  constructor(state) {
    super(state);
    this.getDrawer = this.getDrawer.bind(this);
    this.goTo = this.goTo.bind(this);
  }

  getDrawer(drawer) {
    const { createDrawer } = this.props;
    createDrawer(drawer);
  }

  goTo(route) {
    const { push } = this.props;

    push({
      key: route
    });
  }

  render() {
    const list = [{
      icon: 'money-off',
      name: 'Add new expense',
      subtitle: 'Current: -1000$',
      color: '#fd1111',
      route: 'add_expense'
    }, {
      icon: 'attach-money',
      name: 'Add new income',
      subtitle: 'Current: 200$',
      color: '#11dd22',
      route: 'add_income'
    }, {
      icon: 'library-add',
      name: 'Add new category',
      subtitle: '25 categories now',
      route: 'add_category'
    }, {
      icon: 'add',
      name: 'Add new item',
      subtitle: '135 categories now',
      route: 'add_item'
    }, {
      icon: 'repeat',
      name: 'Change montly salary',
      subtitle: 'Current: 2000$',
      route: 'edit_salary'
    }, {
      icon: 'timeline',
      name: 'See reports',
      subtitle: '2 reports',
      route: 'reports'
    }];

    const MenuComponent = (
      <ScrollView style={{
        flex: 1,
        backgroundColor: '#ededed',
      }}>
        <List containerStyle={{ marginBottom: 20 }}>
          {
            list.map((l, i) => (
              <ListItem
                avatar={l.avatar_url}
                key={i}
                leftIcon={{
                  name: l.icon,
                  color: l.color
                }}
                onPress={() => this.goTo(l.route)}
                roundAvatar
                subtitle={l.subtitle}
                title={l.name}
                />
            ))
          }
        </List>
      </ScrollView>
    );

    const drawerStyles = {
      drawer: {
        borderRightColor: 'rgba(0,0,0,1)',
        borderRightWidth: 0,
        elevation: 5,
        shadowColor: '#000000',
        shadowOpacity: 0.8,
        shadowRadius: 3
      },
      main: {

      }
    };

    return (
      <Drawer
        closedDrawerOffset={0.0}
        content={MenuComponent}
        openDrawerOffset={0.2}
        panCloseMask={0.2}
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

        <ScrollView style={{
          flex: 1,
          backgroundColor: '#EEF1F4',
        }}>
          <Calendar
            customStyle={{
              day: {
                fontSize: 15,
                textAlign: 'center'
              }
            }}
            eventDates={['2015-07-01']}
            events={[{ date: '2015-07-01' }]}
            nextButtonText={'Next'}
            onDateSelect={(date) => this.onDateSelect(date)}
            onSwipeNext={this.onSwipeNext}
            onSwipePrev={this.onSwipePrev}
            onTouchNext={this.onTouchNext}
            onTouchPrev={this.onTouchPrev}
            prevButtonText={'Prev'}
            scrollEnabled
            selectedDate={'2015-08-15'}
            showControls
            showEventIndicators
            startDate={'2015-08-01'}
            titleFormat={'MMMM YYYY'}
            today={'2016-16-05'}
            weekStart={1}
            />
        </ScrollView>
      </Drawer>
    );
  }
}

HomeContainer.propTypes = {
  createDrawer: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createDrawer: createNewDrawer,
    push: pushRoute
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);
