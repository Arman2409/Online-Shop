import { createTheme } from "@mui/material";
import { indigo, cyan, blue, deepOrange, teal, brown} from "@mui/material/colors";

const mainTheme = createTheme({
    palette:{
        primary:{
            main:indigo[100],
            dark:blue[600]
        },
        secondary:{
            main:cyan[200]
        },
        text:{
            main:deepOrange[300],
            dark:indigo[400]
        },
        action:{
            main:brown[100]
        },
        info:{
           main:teal[300]
        }
    }
})

export default mainTheme