import truncate from "lodash/truncate";
import { createTheme } from "@mui/material/styles";

export function excerpt(string) {
  return truncate(string, {    
    length: 400, 
    separator: /,?\.* +/, 
  });
}

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#800020" },
    secondary: { main: "#ffd700" },
    background: { default: "#f2f2f2", paper: "#ffffff" },
    text: { primary: "#212121", secondary: "#757575" },
  },
  typography: { fontFamily: "Times New Roman" },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#ff6f00" },
    secondary: { main: "#f50057" },
    background: { default: "#121212", paper: "#1e1e1e" },
    text: { default: "#f2f2f2", paper: "#ffffff" },
  },
  typography: { fontFamily: "Times New Roman" },
});
