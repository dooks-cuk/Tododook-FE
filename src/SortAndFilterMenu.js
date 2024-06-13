import React from 'react';
import { MenuItem, Select } from "@mui/material";

class SortAndFilterMenu extends React.Component {
  render() {
    return (
      <Select
        value={this.props.sortValue}
        onChange={this.props.onSortChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Sort By' }}
      >
        <MenuItem value="default">기본순</MenuItem>
        <MenuItem value="priority">중요도순</MenuItem>
      </Select>
    );
  }
}

export default SortAndFilterMenu;
