import React from 'react';

import Todo from './Todo';
import AddTodo from './AddTodo';
import { Paper, List, Container, Grid, Button, AppBar, Toolbar, Typography } from "@mui/material";
import './App.css';
import { call, signout } from './service/ApiService';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      /* 로딩 중이라는 상태를 표현할 변수 생성자에 상태 변수를 초기화한다. */
      loading: true,
    };
  }

  // add 함수 추가
  add = (item) => {
    call("/todo", "POST", item).then((response) =>
      this.setState({ items: response.data })
    );
  }

  delete = (item) => {
    call("/todo", "DELETE", item).then((response) =>
      this.setState({ items: response.data })
    );
  }

  update = (item) => {
    call("/todo", "PUT", item).then((response) =>
      this.setState({ items: response.data })
    );
  }

  // componentDidMount는 페이지(돔) 마운트가 일어나고 렌더링 되기 전에 실행된다.
  componentDidMount() {
    call("/todo", "GET", null).then((response) =>
      this.setState({ items: response.data, loading: false })
    );
  }

  render() {
    // todoItems에 this.state.items.length 가 0보다 크다면 true 이므로 && 뒤에 값을 넘겨준다.
    // todoItem = this.state.items.length > 0 ? (<Paper></Paper>):""; 이렇게 해도 같은 결과이다. 조건선택문 ? ternary operator
    const todoItems = this.state.items.length > 0 && (
      <Paper style={{ margin: 16 }}>
        <List>
          {this.state.items.map((item) => (
            <Todo item={item} key={item.id} delete={this.delete} update={this.update} />
          ))}
        </List>
      </Paper>
    );

    // navigationBar
    const navigationBar = (
      <AppBar position="static">
        <Toolbar>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography variant="h6">오늘의 할일</Typography>
            </Grid>
            <Grid item>
              <Button color="inherit" onClick={signout}>
                logout
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );

    // loading 중이 아닐 때
    const todoListPage = (
      <div>
        {navigationBar}
        <Container maxWidth="md">
          <AddTodo add={this.add} />
          <div className="TodoList">{todoItems}</div>
        </Container>
      </div>
    );

    // loading 중일 때
    const loadingPage = <h1>로딩중..</h1>;

    // 생성된 컴포넌트 JSX를 리턴한다.
    return (
      <div className="App">
        {this.state.loading ? loadingPage : todoListPage}
      </div>
    );
  }
}
export default App;
