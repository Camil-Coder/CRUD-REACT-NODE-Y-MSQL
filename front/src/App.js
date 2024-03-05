import './App.css';
import { useState } from 'react';
import Axios from "axios";



function App() {

  const [codigo, setCodigo] = useState('');
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaCompra, setFechaCompra] = useState('');
  const [valorCompra, setValorCompra] = useState(0);
  const [proveedor, setProveedor] = useState('');
  const [id, setId] = useState(0);
  const [editar, setEditar] = useState(false);


  const [listaproductos, setListaProductos] = useState([]);
  //inicializamos una lista vacia

  function formatearFecha(fecha) {
    const date = new Date(fecha);
    const anio = date.getFullYear();
    const mes = (date.getMonth() + 1).toString().padStart(2, "0");
    const dia = date.getDate().toString().padStart(2, '0');
    return `${anio}-${mes}-${dia}`
  };
  const editarProducto = (val) => {
    setEditar(true);
    setCodigo(val.codigo)
    setNombre(val.nombre);
    setDescripcion(val.descripcion);
    setFechaCompra(formatearFecha(val.fecha_compra));
    setValorCompra(val.valor_compra);
    setProveedor(val.proveedor);
    setId(val.id);
  };

  const agregarProducto = (event) => {
    event.preventDefault();
    //metodo  de la solicutud
    Axios.post("http://localhost:3001/productos/crear", {
      codigo: codigo,
      nombre: nombre,
      descripcion: descripcion,
      fecha_compra: fechaCompra,
      valor_compra: valorCompra,
      proveedor: proveedor
    }).then(() => {
      alert('producto agregado');
      leerProductos();
    }).catch((error) => {
      console.log("error al agregar el producto");
      alert('Nose agrego el producto');
    })
  };

  const leerProductos = () => {
    Axios.get("http://localhost:3001/productos/leer").then((response) => {
      setListaProductos(response.data);
      //de esta manera vienen todos los datos que traemos desde la API
    })
  };

  const actualizarProducto = (event) => {
    event.preventDefault();
    //metodo  de la solicutud
    Axios.put("http://localhost:3001/productos/actu", {
      id: id,
      codigo: codigo,
      nombre: nombre,
      descripcion: descripcion,
      fecha_compra: fechaCompra,
      valor_compra: valorCompra,
      proveedor: proveedor
    }).then(() => {
      alert('producto actualizado');
      leerProductos();
    }).catch((error) => {
      console.log("error al actualizar el producto");
      alert('Nose actualizo el producto');
    })
  };

  const eliminarProducto = (id) => {
    Axios.delete(`http://localhost:3001/productos/eliminar/${id}`).then(() => {
      alert("producto eliminado")
    })
  };
  return (
    <div className="App">
      <form onSubmit={agregarProducto}>

        <label>Codigo:
          <input onChange={(event) => { setCodigo(event.target.value) }} type='text' value={codigo} ></input>
        </label>

        <label>Nombre:
          <input onChange={(event) => { setNombre(event.target.value) }} type='text' value={nombre} ></input>
        </label>

        <label>Descripcion:
          <input onChange={(event) => { setDescripcion(event.target.value) }} type='text' value={descripcion} ></input>
        </label>

        <label>Fecha de Compra:
          <input onChange={(event) => { setFechaCompra(event.target.value) }} type='date' value={fechaCompra} ></input>
        </label>

        <label>Valor Compra:
          <input onChange={(event) => { setValorCompra(event.target.value) }} type='number' value={valorCompra} ></input>
        </label>

        <label>Proveedor:
          <input onChange={(event) => { setProveedor(event.target.value) }} type='text' value={proveedor} ></input>
        </label>

        {
          editar ?
            <button type='submit' onClick={actualizarProducto} >Actualizar</button>
            :
            <button type='submit'>Agregar</button>
        }

      </form>
      <div className="tabla">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>codigo</th>
              <th>nombre</th>
              <th>descripcion</th>
              <th>fecha compra</th>
              <th>valor compra</th>
              <th>proveedor</th>
              <th>gestion</th>
            </tr>
          </thead>
          <tbody>
            {
              listaproductos.map((valor, key) => {
                return (
                  <tr key={key}>
                    <td>{valor.id}</td>
                    <td>{valor.codigo}</td>
                    <td>{valor.nombre}</td>
                    <td>{valor.descripcion}</td>
                    <td>{new Date(valor.fecha_compra).toLocaleDateString('es')}</td>
                    <td>{valor.valor_compra}</td>
                    <td>{valor.proveedor}</td>
                    <td>
                      <button onClick={() => { editarProducto(valor); }} ><i className='bx bx-edit-alt'></i></button>
                      <button onClick={() => { eliminarProducto(valor.id) }}><i className='bx bx-trash'></i></button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        <button onClick={leerProductos}>Lista</button>
      </div>
    </div>
  );
}

export default App;
