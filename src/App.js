// import React from 'react';
// import Todo from './Todo';
// import AddTodo from './AddTodo';
// import { Paper, List, Container, Grid, Button, AppBar, Toolbar, Typography } from "@mui/material";
// import './App.css';
// import { call, signout } from './service/ApiService';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       items: [],
//       loading: true,
//     };
//   }

//   componentDidMount() {
//     this.fetchTodos();
//   }

//   fetchTodos = () => {
//     call("/todo", "GET", null)
//       .then((response) => {
//         if (response) {
//           const sortedItems = response.sort((a, b) => {
//             const priorityOrder = { high: 1, medium: 2, low: 3 };
//             return priorityOrder[a.priority] - priorityOrder[b.priority];
//           });
//           this.setState({ items: sortedItems, loading: false });
//         } else {
//           this.setState({ items: [], loading: false });
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching todos:", error);
//         this.setState({ loading: false }); // 에러가 발생하더라도 로딩 상태를 변경하여 UI를 업데이트합니다.
//       });
//   };

//   add = (item) => {
//     call("/todo", "POST", item)
//       .then((response) => {
//         this.setState({items:response})
//       })
//       .catch((error) => {
//         console.error("Error adding todo:", error);
//       });
//   };

//   delete = (item) => {
//     call("/todo", "DELETE", item).then((response) =>
//       this.setState({items:response})
//     );
//   }

//   deleteCompleted = () => {
//     const completedItems = this.state.items.filter(item => item.done);
//     completedItems.forEach(item => {
//       this.delete(item);
//     });
//   }

//   deleteAll = () =>{
//     this.state.items.forEach(item=>{
//       this.delete(item);
//     });
//   }

//   update = (item) => {
//     call("/todo", "PUT", item).then((response) =>
//       this.setState({items:response})
//     );
//   }

//   calculateCompletionPercentage = () => {
//     const { items } = this.state;
//     const completedItemsCount = items.filter(item => item.done).length;
//     const totalItemsCount = items.length;
//     return totalItemsCount === 0 ? 0 : (completedItemsCount / totalItemsCount) * 100;
//   }

//   render() {
//     const completionPercentage = this.calculateCompletionPercentage();

//     const todoItems = this.state.items.length > 0 && (
//       <Paper style={{ margin: 16 }}>
//         <List>
//           {this.state.items.map((item) => (
//             <Todo item={item} key={item.id} delete={this.delete} update={this.update} />
//           ))}
//         </List>
//       </Paper>
//     );

//     const navigationBar = (
//       <AppBar position="static">
//         <Toolbar>
//           <Grid container justifyContent="space-between">
//             <Grid item>
//               <Typography variant="h6">오늘의 할일</Typography>
//             </Grid>
//             <Grid item>
//               <Button color="inherit" onClick={signout}>
//                 logout
//               </Button>
//             </Grid>
//           </Grid>
//         </Toolbar>
//       </AppBar>
//     );

//     const gauge = (
//       <ResponsiveContainer width="100%" height={70}>
//         <BarChart layout='vertical' data={[{ value: completionPercentage }]} margin={{ left: -50 }}>
//           <XAxis type="number" domain={[0, 100]} />
//           <YAxis type="category" tick={false} axisLine={false} />
//           <Tooltip />
//           <Bar dataKey="value" fill="#8884d8" barSize={10} />
//         </BarChart>
//       </ResponsiveContainer>
//     );

//     const todoListPage = (
//       <div>
//         {navigationBar}
//         <Container maxWidth="md">
//           <AddTodo add={this.add} />
//           {gauge}
//           <div className="TodoList">{todoItems}</div>
//           <Grid container spacing={0} justifyContent="flex-start">
//             <Grid item>
//               <Button variant="contained" color="secondary" onClick={this.deleteCompleted}>
//                 선택삭제
//               </Button>
//             </Grid>
//             <Grid item>
//               <Button variant='contained' color='primary' onClick={this.deleteAll}>
//                 전체삭제
//               </Button>
//             </Grid>
//           </Grid>
//         </Container>
//       </div>
//     );

//     const loadingPage = <h1>로딩중..</h1>;

//     return (
//       <div className="App">
//         {this.state.loading ? loadingPage : todoListPage}
//       </div>
//     );
//   }
// }

// export default App;

import React from 'react';
import Todo from './Todo';
import AddTodo from './AddTodo';
import { Paper, List, Container, Grid, Button, AppBar, Toolbar, Typography, FormControl, Select, MenuItem } from "@mui/material";
import './App.css';
import { call, signout } from './service/ApiService';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loading: true,
      sortByPriority: false, // 중요도로 정렬할지 여부를 나타내는 상태 추가
    };
  }

  componentDidMount() {
    call("/todo", "GET", null).then((response) =>
      this.setState({ items: response , loading: false })
    );
  }

  fetchTodos = () => {
    call("/todo", "GET", null)
      .then((response) => {
        if (response) {
          const sortedItems = this.state.sortByPriority
            ? response.sort((a, b) => {
                const priorityOrder = { HIGH: 1, MEDIUM: 2, LOW: 3 };
                return priorityOrder[a.priority] - priorityOrder[b.priority];
              })
            : response;
          this.setState({ items: sortedItems, loading: false });
        } else {
          this.setState({ items: [], loading: false });
        }
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
        this.setState({ loading: false });
      });
  };

  toggleSortByPriority = () => {
    this.setState({ sortByPriority: !this.state.sortByPriority }, () => {
      this.fetchTodos(); // 정렬 변경 후 할일 목록 다시 불러오기
    });
  };

  add = (item) => {
    call("/todo", "POST", item)
      .then((response) => {
        this.setState({ items: response });
      })
      .catch((error) => {
        console.error("Error adding todo:", error);
      });
  };

  delete = (item) => {
    call("/todo", "DELETE", item).then((response) =>
      this.setState({ items: response })
    );
  };

  deleteCompleted = () => {
    const completedItems = this.state.items.filter((item) => item.done);
    completedItems.forEach((item) => {
      this.delete(item);
    });
  };

  deleteAll = () => {
    this.state.items.forEach((item) => {
      this.delete(item);
    });
  };

  update = (item) => {
    call("/todo", "PUT", item).then((response) =>
      this.fetchTodos()
    );
  };

  calculateCompletionPercentage = () => {
    const { items } = this.state;
    const completedItemsCount = items.filter((item) => item.done).length;
    const totalItemsCount = items.length;
    return totalItemsCount === 0 ? 0 : (completedItemsCount / totalItemsCount) * 100;
  };

  render() {
    const completionPercentage = this.calculateCompletionPercentage();
    console.log("items",this.state.items);
    const todoItems = this.state.items.length > 0 && (
      <Paper style={{ margin: 16 }}>
        <List>
          {this.state.items.map((item) => (
            <Todo item={item} key={item.id} category={item.category}  delete={this.delete} update={this.update} />
          ))}
        </List>
      </Paper>
    );

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

    const gauge = (
      <ResponsiveContainer width="96%" height={70} style={{ margin: '16px' }}>
        <BarChart layout='vertical' data={[{ value: completionPercentage }]} margin={{ left: -50 }}>
          <XAxis type="number" domain={[0, 100]} />
          <YAxis type="category" tick={false} axisLine={false} />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" barSize={10} />
        </BarChart>
      </ResponsiveContainer>
    );

    const todoListPage = (
      <div>
        {navigationBar}
        <Container maxWidth="md">
          <AddTodo add={this.add} />
          {gauge}
          <div className="TodoList">{todoItems}</div>
          <Grid container spacing={0} justifyContent="space-between">
            <Grid item style={{ marginLeft: '16px' }}>
              <Button variant="contained" color="secondary" onClick={this.deleteCompleted}>
                선택삭제
              </Button>
              <Button variant='contained' color='primary' onClick={this.deleteAll}>
                전체삭제
              </Button>
            </Grid>
            <Grid item style={{ marginRight: '16px' }}>
              <FormControl>
                <Select
                  value={this.state.sortByPriority ? 'priority' : 'default'}
                  onChange={this.toggleSortByPriority}
                  displayEmpty
                >
                  <MenuItem value="default">기본순</MenuItem>
                  <MenuItem value="priority">중요도순</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Container>
      </div>
    );

    const loadingPage = <h1>로딩중..</h1>;

    return (
      <div className="App">
        {this.state.loading ? loadingPage : todoListPage}
      </div>
    );
  }
}

export default App;