import { db } from "@/firebase";
import { Button, TextField } from "@mui/material";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";

const CrearUsuario = () => {
  const [usuario, setUsuario] = useState({
    nombre: "",
    email: "",
    telefono: "",
  });

  const areaEntrada = useRef();

  useEffect(() => {
    const validarClickAfuera = e => {
        if (!areaEntrada.current.contains(e.target)) {
            console.log("Area de entrada afuera");
            setUsuario({nombre: '', email: '', telefono: ''})
        } else {
            console.log("Area de entrada adentro");
        }   
    }
    document.addEventListener('mousedown', validarClickAfuera)
  
    return () => {
        document.removeEventListener('mousedown', validarClickAfuera)
    }
  }, [])
  

  const onSubmit = async () => {
    //crear usuario
    const coleccion = collection(db, "usuarios")
    const documento = await addDoc(coleccion, {...usuario, fecha: serverTimestamp()})
    setUsuario({nombre:'', email: '', telefono: ''})
    alert(`Se ha creado correctamente el usuario con el ID: ${documento.id}`)
  }

  return (
    <div ref={areaEntrada}>
      <TextField
        fullWidth
        label="nombre"
        margin="normal"
        value={usuario.nombre}
        onChange={(e) => setUsuario({ ...usuario, nombre: e.target.value })}
      ></TextField>
      <TextField
        fullWidth
        label="email"
        margin="normal"
        value={usuario.email}
        onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
      ></TextField>
      <TextField
        fullWidth
        label="telefono"
        margin="normal"
        value={usuario.telefono}
        onChange={(e) => setUsuario({ ...usuario, telefono: e.target.value })}
      ></TextField>

      <Button 
      fullWidth 
      variant="contained" 
      color="secondary" 
      mx={{ mt: 3 }}
      onClick={onSubmit}
      >
        Crear usuario
      </Button>
    </div>
  );
};

export default CrearUsuario;
