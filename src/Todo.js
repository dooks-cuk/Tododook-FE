import React from "react";
import { ListItem, ListItemText, InputBase, Checkbox, ListItemSecondaryAction, IconButton, Select, MenuItem, FormControl } from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { item: props.item, readOnly: true };
    this.delete = props.delete;
    this.update = props.update;
  }

  deleteEventHandler = () => {
    this.delete(this.state.item);
  }

  offReadOnlyMode = () => {
    this.setState({ readOnly: false });
  }

  enterKeyEventHandler = (e) => {
    if (e.key === "Enter") {
      this.setState({ readOnly: true });
      this.update(this.state.item);
    }
  }

  editEventHandler = (e) => {
    const thisItem = this.state.item;
    thisItem.title = e.target.value;
    this.setState({ item: thisItem });
  }

  checkboxEventHandler = () => {
    const thisItem = { ...this.state.item, done: !this.state.item.done };
    this.setState({ item: thisItem, readOnly: true }, () => {
      this.update(thisItem);
    });
  }

  priorityChangeHandler = (e) => {
    const thisItem = { ...this.state.item, priority: e.target.value };
    this.setState({ item: thisItem }, () => {
      this.update(thisItem);
    });
  }



  render() {
    const { item, readOnly } = this.state;
    return (
      <ListItem>
        <Checkbox
          checked={item.done}
          onChange={this.checkboxEventHandler}
        />
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: '50%',
            backgroundColor: item.categoryColor,
            marginRight: 10,
          }}
        />
        <ListItemText style={{ marginLeft: 10 }}>
          <InputBase
            inputProps={{ "aria-label": "naked", readOnly }}
            type="text"
            id={item.id}
            name={item.id}
            value={item.title}
            multiline={true}
            fullWidth={true}
            onClick={this.offReadOnlyMode}
            onChange={this.editEventHandler}
            onKeyDown={this.enterKeyEventHandler}
          />
        </ListItemText>
        <FormControl>
          <Select
            value={item.priority}
            onChange={this.priorityChangeHandler}
            displayEmpty
            inputProps={{ 'aria-label': 'Priority' }}
          >
            <MenuItem value="HIGH">High</MenuItem>
            <MenuItem value="MEDIUM">Medium</MenuItem>
            <MenuItem value="LOW">Low</MenuItem>
          </Select>
        </FormControl>
        <ListItemSecondaryAction>
          <IconButton aria-label="Delete" onClick={this.deleteEventHandler}>
            <DeleteOutline />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

export default Todo;
