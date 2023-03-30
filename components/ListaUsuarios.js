import { db } from "@/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import Usuario from "./Usuario";

const ListaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const coleccion = collection(db, "usuarios");

    const consulta = query(coleccion, orderBy("fecha", "desc"));

    const unsubscribe = onSnapshot(consulta, (consultaSnapshot) => {
      setUsuarios(
        consultaSnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          fecha: doc.data().fecha?.toDate().getTime(),
        }))
      );
    });

    return unsubscribe;
  }, []);

  return (
    <div>
      {usuarios.map((usuario) => (
        <Usuario
          key={usuario.id}
          id={usuario.id}
          nombre={usuario.nombre}
          email={usuario.email}
          telefono={usuario.telefono}
          fecha={usuario.fecha}
        />
      ))}
    </div>
  );
};

export default ListaUsuarios;
