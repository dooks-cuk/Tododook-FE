import React from 'react';
import { TextField, Paper, Button, Grid} from "@mui/material";

class AddTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: '' };
  }

  onInputChange = (e) => {
    this.setState({ title: e.target.value });
  }

  onButtonClick = () => {
    this.props.add({ title: this.state.title, priority: 'medium' });
    this.setState({ title: '' });
  }

  enterKeyEventHandler =(e)=>{
    if(e.key=='Enter')this.onButtonClick();
  }

  render() {
    return (
    <Paper style={{margin:16,padding:16}}>
                <Grid container>
                    <Grid xs={11} md={11} item style={{paddingRight:16}}>
                        <TextField
                        placeholder="Add Todo here"
                        fullWidth
                        onChange={this.onInputChange}
                        value={this.state.title}
                        onKeyDown={this.enterKeyEventHandler}
                        />
                    </Grid>
                    <Grid xs={1} md={1} item>
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
