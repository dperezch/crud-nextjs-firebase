import { db } from "@/firebase";
import { ContextUsuario } from "@/components/ContextUsuario";
import { Button, TextField, Tooltip } from "@mui/material";
import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useContext, useEffect, useRef } from "react";

const CrearUsuario = () => {
  /* const [usuario, setUsuario] = useState({
    nombre: "",
    email: "",
    telefono: "",
  }); */

  //Provider
  const { usuario, setUsuario } = useContext(ContextUsuario);

  const areaEntrada = useRef();

  useEffect(() => {
    const validarClickAfuera = (e) => {
      if (!areaEntrada.current.contains(e.target)) {
        console.log("Area de entrada afuera");
        setUsuario({ nombre: "", email: "", telefono: "" });
      } else {
        console.log("Area de entrada adentro");
      }
    };
    document.addEventListener("mousedown", validarClickAfuera);

    return () => {
      document.removeEventListener("mousedown", validarClickAfuera);
    };
  }, []);

  const onSubmit = async () => {
    if (usuario?.hasOwnProperty("fecha")) {
      //si tiene la propiedad
      //Actualizar
      const documento = doc(db, "usuarios", usuario.id);
      const usuarioActualizado = { ...usuario, fecha: serverTimestamp() };
      updateDoc(documento, usuarioActualizado);
      setUsuario({ nombre: "", email: "", telefono: "" });
      alert(
        `El Usuario con el ID: ${documento.id} se ha actualizado correctamente`
      );
    } else {
      //crear usuario
      const coleccion = collection(db, "usuarios");
      const documento = await addDoc(coleccion, {
        ...usuario,
        fecha: serverTimestamp(),
      });
      setUsuario({ nombre: "", email: "", telefono: "" });
      alert(`Se ha creado correctamente el usuario con el ID: ${documento.id}`);
    }
  };

  const validateEmail = (email) => {
     if( String(email).match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )){
      return false
    } else {
      return true
    }
  };

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
        error={usuario.email.match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ) || usuario.email === '' ? false : true}
        helperText={usuario.email.match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )? "Formato correcto" : "formato incorrecto"}
        fullWidth
        label="email"
        margin="normal"
        value={usuario.email}
        autoComplete="email"   //...usuario, email: e.target.value
        onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}  
      ></TextField>
      <TextField
        fullWidth
        label="telefono"
        margin="normal"
        type="number"
        value={usuario.telefono}
        onChange={(e) => setUsuario({ ...usuario, telefono: e.target.value })}
      ></TextField>

      <Tooltip
        title={
          usuario.nombre === "" ||
          usuario.email === "" ||
          usuario.telefono === ""
            ? "completa todos los campos"
            : ""
        }
      >
        <span>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            mx={{ mt: 3 }}
            onClick={onSubmit}
            disabled={
              usuario.nombre === "" ||
              usuario.email === "" ||
              usuario.telefono === "" || !usuario.email.match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              )
                ? true
                : false
            }
          >
            {usuario.hasOwnProperty("fecha")
              ? "Actualizar Usuario"
              : "Crear Usuario"}
          </Button>
        </span>
      </Tooltip>
    </div>
  );
};

export default CrearUsuario;
