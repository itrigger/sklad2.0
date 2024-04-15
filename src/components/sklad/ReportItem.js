import React, { useState } from "react";
import { Checkbox, InputAdornment, TableCell, TableRow } from "@mui/material";
import Input from "@mui/material/Input";

const ReportItem = ({name, quantity, measures, handleIsCheckedReport, checked}) => {

  const [val, setVal] = useState(quantity)

  const handleIsChecked = (e, id) => {
    handleIsCheckedReport(e, id)
  }

  const handleChange = (e) => {
    setVal(e)
  }

  return (
    <>
    <TableRow className={!checked && "hidden"}>
      <TableCell className="hidden">
        <Checkbox
          className="p-0"
          checked={checked}
          onChange={(e) => handleIsChecked(e.target.checked, name)}
        />
      </TableCell>
      <TableCell>
        <div className="like-checkbox"></div>
      </TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>
        <Input
          id="standard-adornment-weight"
          style={{width: "120px"}}
          value={val}
          onChange={(e) => handleChange(e.target.value)}
          endAdornment={<InputAdornment position="end">{measures}</InputAdornment>}
          aria-describedby="standard-weight-helper-text"
          inputProps={{
            "aria-label": "Кол-во"
          }}
        />
        </TableCell>
      <TableCell></TableCell>
    </TableRow>
    </>
  );
};

export default ReportItem;