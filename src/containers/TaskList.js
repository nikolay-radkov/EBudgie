 import React, { Component } from 'react';
 import {
   View,
   StyleSheet,
   ListView,
   TouchableHighlight,
   Text,
   Switch
 } from 'react-native';
import TaskRow from '../components/TaskRow/Component';

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    backgroundColor: '#F7F7F7',
    flex: 1,
    justifyContent: 'flex-start'
  },
  button: {
    height: 60,
    borderColor: '#05A5D1',
    borderWidth: 2,
    backgroundColor: '#333',
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: '#FAFAFA',
    fontSize: 20,
    fontWeight: '600'
  },
  toggleRow: {
    padding: 10,
    flexDirection: 'row'
  },
  toggleText: {
    fontSize: 20,
    paddingLeft: 10,
    paddingTop: 3
  }
});

class TaskList extends Component {
  constructor(props, context) {
    super(props, context);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.state =  {
      dataSource: ds.cloneWithRows(props.todos)
    };
  }

  componentWillReceiveProps(nextProps) {
    const dataSource = this.state.dataSource.cloneWithRows(nextProps.todos);
    this.setState({ dataSource });
  }

  renderRow(todo) {
    return (
      <TaskRow
        onDone={this.props.onDone}
        todo={todo}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.toggleRow}>
          <Switch
            onValueChange={this.props.onToggle}
            style={styles.switch}
            value={this.props.filter !== 'pending'}
          />
          <Text style={styles.toggleText}>
            Showing {this.props.todos.length} {this.props.filter} todo(s)
          </Text>
        </View>
        <ListView
          dataSource={this.state.dataSource}
          key={this.props.todos}
          renderRow={this.renderRow.bind(this)}
          />

        <TouchableHighlight
          onPress={this.props.onAddStarted}
          style={styles.button}>
          <Text style={styles.buttonText}>
           Add one
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

TaskList.propTypes = {
  onAddStarted: React.PropTypes.func.isRequired,
  onDone: React.PropTypes.func.isRequired,
  todos: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  filter: React.PropTypes.string.isRequired,
  onToggle: React.PropTypes.func.isRequired
};

export default TaskList;
