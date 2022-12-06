import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface ModalState {
  isOpen: boolean;
  handleClose: () => void;
  list: string[];
}

export const Modal: React.FC<ModalState> = ({
  isOpen = false,
  handleClose,
  list
}) => {
  // const [open, setOpen] = React.useState(isOpen);
  //const [maxWidth, setMaxWidth] = React.useState<DialogProps["maxWidth"]>("sm");
  const [selectedGroup, setSelectedGroup] = React.useState<string[]>([]);
  // useEffect(() => {
  //   console.log("La popup est : ", isOpen);
  //   setOpen(isOpen);
  // }, [isOpen]);

  // useEffect(() => {
  //   console.log("La popup est : ", open);
  // }, [open]);

  /**const handleMaxWidthChange = (event: SelectChangeEvent<typeof maxWidth>) => {
    setMaxWidth(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value
    );
  };**/
  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open max-width dialog
      </Button>*/}
      <Dialog
        fullWidth={true}
        maxWidth="sm"
        open={isOpen}
        onClose={handleClose}
      >
        <DialogTitle>Groupe</DialogTitle>
        
        <DialogContent>
          <DialogContentText>
            Selectionez votre groupe parmis la liste.
          </DialogContentText>
        
          <Box
            noValidate
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              m: "auto",
              width: "fit-content",
            }}
          >
            <FormControl sx={{ mt: 2, minWidth: 120 }}>
              <Autocomplete
                id="combo-box-demo"
                options={list}
                sx={{ width: 300 }}
                noOptionsText="Aucun groupe correspondant"
                renderInput={(params) => <TextField {...params}  label="Groupe" />}
              />
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Fermer</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};