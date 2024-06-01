import React from 'react';
import { Paper, List, Container, Button } from '@mui/material';
import Todo from './Todo';
import AddTodo from './AddTodo';
import { call } from './service/ApiService';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    this.fetchTodos();
  }

  // fetchTodos = () => {
  //   call("/todo", "GET", null).then((response) =>
  //     this.setState({ items: response.data })
  //   );
  // }

  fetchTodos = () => {
    call("/todo", "GET", null).then((response) => {
      const sortedItems = response.data.sort((a, b) => {
        const priorityOrder = { high: 1, medium: 2, low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
      this.setState({ items: sortedItems });
    });
  }

  add = (item) => {
    call("/todo", "POST", item).then(() =>
      this.fetchTodos()
    );
  }

  delete = (item) => {
    call("/todo", "DELETE", item).then(() =>
      this.fetchTodos()
    );
  }

  deleteCompleted = () => {
    const completedItems = this.state.items.filter(item => item.done);
    completedItems.forEach(item => {
      this.delete(item);
    });
  }

  update = (item) => {
    call("/todo", "PUT", item).then(() =>
      this.fetchTodos()
    );
  }

  // deleteCompleted = () => {
  //   const completedItems = this.state.items.filter(item => item.done);
  //   const selectedIds = completedItems.map(item => item.id);
  //   call("/todo/deleteSelected", "DELETE", selectedIds).then(() =>
  //     this.fetchTodos()
  //   );
  // }

  


  render() {
    const todoItems = this.state.items.length > 0 && (
      <Paper style={{ margin: 16 }}>
        <List>
          {this.state.items.map((item) => (
            <Todo item={item} key={item.id} delete={this.delete} update={this.update} />
          ))}
        </List>
      </Paper>
    );

    return (
      <div className="App">
        <Container maxWidth="md">
          <AddTodo add={this.add} />
          <div className="TodoList">{todoItems}</div>
          <Button variant="contained" color="secondary" onClick={this.deleteCompleted}>
            Delete Completed
          </Button>
        </Container>
      </div>
    );
  }
}

export default App;
