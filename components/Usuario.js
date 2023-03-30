import { IconButton, ListItem, ListItemText } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import moment from "moment/moment"


const Usuario = ({id, nombre, email, telefono, fecha}) => {
  return (
    <ListItem
        sx={{mt: 3, boxShadow: 5}}
        style={{backgroundColor: '#2196f3', color: '#fff'}}
        secondaryAction={
            <>
                <IconButton> <EditIcon /> </IconButton>
                <IconButton> <DeleteIcon /> </IconButton>
            </>
        }
    >
        <ListItemText
            primary={nombre}
            secondary={email}
        >
        </ListItemText>
        <ListItemText
            primary={telefono}
            secondary={moment(fecha).format("MMMM dd, yyyy")}
        >
        </ListItemText>
    </ListItem>
  )
}

export default Usuario