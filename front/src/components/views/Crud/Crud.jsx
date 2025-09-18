
import './App.css';
import {useState, useEffect} from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

import Swal from 'sweetalert2';



function Crud() {
  const[nombre,setNombre] = useState("");
  const[edad,setEdad] = useState(0);
  const[pais,setPais] = useState("");
  const[cargo,setCargo] = useState("");
  const[anios,setAnios] = useState(0);
  const[editar,setEditar] = useState(false);
  const[id,setId] = useState(0);

  const [empleadosList,setEmpleados] = useState([]);

  const add = ()=>{
    Axios.post("http://localhost:4000/api/create",{
      nombre:nombre,
      edad:edad,
      pais:pais,
      cargo:cargo,
      anios:anios
    }).then(()=>{
      getEmpleados();
      
      limpiarCampos();
      Swal.fire({
        title: "Registro exitoso",
        text: "El empleado "+nombre+" fue registrado con exito",
        icon: "success",
        timer:3000
      });
    }).catch(function(error){
        Swal.fire({
        icon: "error",
        title: "Oops...",
        text: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente mas tarde":JSON.parse(JSON.stringify(error)).message
      });
     });
  }

  const update = ()=>{
    Axios.put("http://localhost:4000/api/update",{
      id:id,
      nombre:nombre,
      edad:edad,
      pais:pais,
      cargo:cargo,
      anios:anios
    }).then(()=>{
      getEmpleados();
      limpiarCampos();
      Swal.fire({
        title: "Actualizacion exitosa",
        text: "El empleado "+nombre+" fue Actualizado con exito",
        icon: "success",
        timer:1500
      });
    }).catch(function(error){
        Swal.fire({
        icon: "error",
        title: "Oops...",
        text: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente mas tarde":JSON.parse(JSON.stringify(error)).message
        
      });
      limpiarCampos();
     });
  }
  const deleteEmple = (val)=>{
    Swal.fire({
        title: "Eliminar?",
        text: "realmente desea eliminar a "+val.nombre+" ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, eliminalo!"
      }).then((result) => {
        if (result.isConfirmed) {
          Axios.delete(`http://localhost:4000/api/delete/${val.id}`).then(()=>{
            getEmpleados();
            limpiarCampos();
            Swal.fire({
            title: "Eliminado!",
            text: "El usuario "+val.nombre+" fue eliminado",
            icon: "success",
            timer:1500
          });
          }).catch(function(error){
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "No se logro eliminar el empleado!",
              footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente mas tarde":JSON.parse(JSON.stringify(error)).message
            });
          });
        }
      });


    
  }
  const limpiarCampos = () =>{
    setNombre("");
    setCargo("");
    setAnios("");
    setPais("");
    setEdad("");
    setId("");
    setEditar(false);
  }
  const editarEmpleado = (val) =>{
    setEditar(true);
    
    setNombre(val.nombre);
    setEdad(val.edad);
    setCargo(val.cargo);
    setPais(val.pais);
    setAnios(val.anios);
    setId(val.id);
  }

  const getEmpleados = ()=>{
    Axios.get("http://localhost:4000/api/empleados").then((response)=>{
      setEmpleados(response.data);
    });
  }

  useEffect(() => {
    getEmpleados();
  }, []);
 
  return (
    <div className="container">
    <div className="card text-center">
      <div className="card-header">
        GESTION DE EMPLEADOS
      </div>
      <div className="card-body">
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Nombre:</span>
          <input type="text" value={nombre}
          onChange={(event)=>{
          setNombre(event.target.value);
          }}
          className="form-control" placeholder="Ingrese su nombre" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon2">Edad:</span>
          <input type="number" value={edad}
          onChange={(event)=>{
          setEdad(event.target.value);
          }}
          className="form-control" placeholder="Ingrese su edad" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon3">Pais:</span>
          <input type="text" value={pais}
          onChange={(event)=>{
          setPais(event.target.value);
          }}
          className="form-control" placeholder="Ingrese su pais" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon4">Cargo:</span>
          <input type="text" value={cargo}
          onChange={(event)=>{
          setCargo(event.target.value);
          }}
          className="form-control" placeholder="Ingrese su cargo" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon4">Años:</span>
          <input type="number" value={anios}
          onChange={(event)=>{
          setAnios(event.target.value);
          }}
          className="form-control" placeholder="Ingrese su tiempo de experiencia" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>
      </div>
      <div className="card-footer text-body-secondary">
        {
          editar==true? 
          <div>
          <button className='btn btn-warning m-2' onClick={update}>Actualizar</button>
          <button className='btn btn-info m-2' onClick={limpiarCampos}>Cancelar</button>
          </div>
          :<button className='btn btn-success' onClick={add}>Registrar</button>
        }
        
      </div>
    </div>

    <table className="table table-striped">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Nombre</th>
      <th scope="col">Edad</th>
      <th scope="col">Pais</th>
      <th scope="col">Cargo</th>
      <th scope="col">Experiencia</th>
      <th scope="col">Acciones</th>
    </tr>
  </thead>
  <tbody>
    {
      empleadosList.map((val,key)=>{
        return <tr key={val.id}>
          <th scope="row">{val.id}</th>
          <td>{val.nombre}</td>
          <td>{val.edad}</td>
          <td>{val.pais}</td>
          <td>{val.cargo}</td>
          <td>{val.anios}</td>
          <td>
            <div className="btn-group" role="group" aria-label="Basic example">
              <button type="button"
              onClick={()=>{
                editarEmpleado(val);
              }}
              className="btn btn-info">Editar</button>
              <button type="button" onClick={()=>{
                deleteEmple(val);
              }} className="btn btn-danger">Eliminar</button>
            </div>
          </td>
        </tr>
      })
    }
    
  </tbody>
</table>
    </div>
  );
}

export default Crud;
