import {
    AppBar,
    InputAdornment,
    Toolbar,
    Typography,
    Autocomplete,
    TextField
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";

type Props = {
    groups: any[];
    selectedGroup: any;
    handleGroupChange: (event: React.SyntheticEvent, value: any | Array<any>, reason: string) => void;
}; 

export const Topbar = ({groups, selectedGroup, handleGroupChange}: Props) => {
    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Agenda
          </Typography>
          <Autocomplete
            disablePortal
            options={groups}
            getOptionLabel={(option) => option.label}
            sx={{ width: 300 }}
            noOptionsText="Aucun groupe correspondant"
            onChange={handleGroupChange}
            value={selectedGroup || null}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            renderInput={(params) => 
              <StyledTextField 
                {...params}
                placeholder="Groupe..."
                size="small"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon
                        style={{ color: "white", marginLeft: "8px" }}
                      />
                    </InputAdornment>
                  )
                }}
              />
            }
          />
        </Toolbar>
      </AppBar>
    );
};

const StyledTextField = styled(TextField)(({ theme }) => ({
    color: "#fff",
    background: "rgba(255, 255, 255, 0.15)",
    borderRadius: "4px",
    width: "100%",
    "& input": {
      color: "#fff !important"
    },
    "& fieldset": {
      borderWidth: "0px",
      "& fieldset:hover, & fieldset:focus, & fieldset:active": {
        borderWidth: "0px"
      },
      "& .MuiInputBase-input": {
        padding: theme.spacing(2, 1, 1, 2),
        transition: theme.transitions.create("width"),
        color: "#fff",
        width: "100%",
        [theme.breakpoints.up("sm")]: {
          width: "12ch",
          "&:focus": {
            width: "20ch"
          }
        }
      }
    }
}));