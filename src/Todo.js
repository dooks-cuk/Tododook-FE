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

  checkboxEventHandler = (e) => {
    const thisItem = this.state.item;
    thisItem.done = !thisItem.done;
    this.setState({ item: thisItem, readOnly: true });
    this.update(this.state.item);
  }

  priorityChangeHandler = (e) => {
    const thisItem = this.state.item;
    thisItem.priority = e.target.value;
    this.setState({ item: thisItem });
    this.update(this.state.item);
  }

// priorityChangeHandler = (e) => {
//     const newPriority = e.target.value;
//     const updatedItem = { ...this.state.item, priority: newPriority };
//     this.setState({ item: updatedItem }, () => {
//       this.update(updatedItem); // 백엔드로 변경된 중요도를 전달
//     });
//   }

  render() {
    const item = this.state.item;
    return (
      <ListItem>
        <Checkbox
          checked={item.done}
          onChange={this.checkboxEventHandler}
        />
        <ListItemText>
          <InputBase
            inputProps={{ "aria-label": "naked", readOnly: this.state.readOnly }}
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
            <MenuItem value="high">High</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="low">Low</MenuItem>
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
