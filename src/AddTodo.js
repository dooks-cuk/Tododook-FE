// import React from 'react';
// import { TextField, Paper, Button, Grid} from "@mui/material";

// class AddTodo extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { title: '' };
//   }

//   onInputChange = (e) => {
//     this.setState({ title: e.target.value });
//   }

//   onButtonClick = () => {
//     this.props.add({ title: this.state.title, priority: 'medium' });
//     this.setState({ title: '' });
//   }

//   enterKeyEventHandler =(e)=>{
//     if(e.key=='Enter')this.onButtonClick();
//   }

//   render() {
//     return (
//     <Paper style={{margin:16,padding:16}}>
//                 <Grid container>
//                     <Grid xs={11} md={11} item style={{paddingRight:16}}>
//                         <TextField
//                         placeholder="Add Todo here"
//                         fullWidth
//                         onChange={this.onInputChange}
//                         value={this.state.title}
//                         onKeyDown={this.enterKeyEventHandler}
//                         />
//                     </Grid>
//                     <Grid xs={1} md={1} item>
//                         <Button
//                         fullWidth
//                         color="secondary"
//                         variant="outlined"
//                         onClick={this.onButtonClick}
//                         >
//                             +
//                         </Button>
//                     </Grid>
//                 </Grid>
//             </Paper>
//     );
//   }
// }

// export default AddTodo;


import React from 'react';
import { TextField, Paper, Button, Grid, FormControl, Select, MenuItem } from "@mui/material";

class AddTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: '', priority: 'MEDIUM' ,category: 'PERSONAL' };
  }

  onInputChange = (e) => {
    this.setState({ title: e.target.value });
  }

  onCategoryChange = (e) => {
    this.setState({ category: e.target.value });
  }

  onButtonClick = () => {
    this.props.add({ title: this.state.title, priority: 'MEDIUM', category: this.state.category });
    console.log("카테고리!",this.state.category);
    this.setState({ title: '', category: 'PERSONAL' });
  }

  enterKeyEventHandler =(e)=>{
    if(e.key==='Enter') this.onButtonClick();
  }

  render() {
    return (
      <Paper style={{ margin: 16, padding: 16 }}>
        <Grid container spacing={2}>
          <Grid item xs={7}>
            <TextField
              placeholder="Add Todo here"
              fullWidth
              onChange={this.onInputChange}
              value={this.state.title}
              onKeyDown={this.enterKeyEventHandler}
            />
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <Select
                value={this.state.category}
                onChange={this.onCategoryChange}
              >
                <MenuItem value="PERSONAL">개인일상</MenuItem>
                <MenuItem value="WORK">업무</MenuItem>
                <MenuItem value="STUDY">학습</MenuItem>
                <MenuItem value="HOBBY">취미</MenuItem>
                <MenuItem value="FINANCE">금융</MenuItem>
                <MenuItem value="OTHER">기타</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <Button
              fullWidth
              color="secondary"
              variant="outlined"
              onClick={this.onButtonClick}
            >
              +
            </Button>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default AddTodo;
