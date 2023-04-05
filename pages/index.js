import CrearUsuario from '@/components/CrearUsuario'
import ListaUsuarios from '@/components/ListaUsuarios'
import styles from '@/styles/Home.module.css'
import { ContextUsuario } from '../components/ContextUsuario'
import { useState } from 'react';

export default function Home() {

  const [usuario, setUsuario] = useState({
    nombre: "",
    email: "",
    telefono: "",
  });

  return (
    <ContextUsuario.Provider value={{usuario, setUsuario}}>
      <CrearUsuario/>
      <ListaUsuarios />
    </ContextUsuario.Provider>
  )
}
