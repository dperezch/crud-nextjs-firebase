import { IconButton, ListItem, ListItemText } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment/moment";
import { useContext } from "react";
import { ContextUsuario } from "@/components/ContextUsuario";
import { db } from "@/firebase";
import { deleteDoc, doc } from "firebase/firestore";

const Usuario = ({ id, nombre, email, telefono, fecha }) => {
  //Provider
  const { usuario, setUsuario } = useContext(ContextUsuario);

  //Borrar usuario
  const borrarUsuario = async(id, e) =>{
    e.stopPropagation()
    const documento = doc(db, "usuarios", id);
    await deleteDoc(documento)
    alert(`El usuario con el ID: ${documento.id} se ha borrado correctamente`)
  }

  return (
    <ListItem
      sx={{ mt: 3, boxShadow: 5 }}
      style={{ backgroundColor: "#2196f3", color: "#fff" }}
      secondaryAction={
        <>
          <IconButton
            onClick={() => setUsuario({ id, nombre, email, telefono, fecha })}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={e => borrarUsuario( id, e )}
          >
            <DeleteIcon />
          </IconButton>
        </>
      }
    >
      <ListItemText primary={nombre} secondary={email}></ListItemText>
      <ListItemText
        primary={telefono}
        secondary={moment(fecha).format("MMMM dd, yyyy")}
      ></ListItemText>
    </ListItem>
  );
};

export default Usuario;
