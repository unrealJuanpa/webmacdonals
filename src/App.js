import logo from './logo.svg';
import './App.css';

import React from 'react';
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"

import { Table, Button, Container, Modal, ModalHeader, ModalBody, FormGroup, ModalFooter } from "reactstrap";

const data = [
  {
    id: 1,
    Nombre: "Joel",
    Apellido: "Gramajo",
    DPI: "202008025",
    Sucursal: "Walmart",
    ProductoConsumido: "Big Mac Doble"
  }
]

class App extends React.Component {
  state = {
    data: data,
    form: {
      id: "",
      Nombre: "",
      Apellido: "",
      DPI: "",
      Sucursal: "",
      ProductoConsumido: ""
    },

    modalInsertar: false,
    modalActualizar: false,
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({
      modalInsertar: false,
    });
  };

  insertar = () => {
    var valorNuevo = { ...this.state.form };
    valorNuevo.id = this.state.data[this.state.data.length - 1].id + 1;
    var lista = this.state.data;
    lista.push(valorNuevo);
    this.setState({ modalInsertar: false, data: lista });
  };

  eliminar = (dato) => {
    var opcion = window.confirm(
      "Esta seguro de borrar el ítem " + dato.id + "?"
    );

    if (opcion === true) {
      var contador = 0;
      var arreglo = this.state.data;

      arreglo.map((reg) => {
        if (dato.id === reg.id) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: arreglo });
    }
  };

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({
      modalActualizar: false,
    });
  };

  editar = (dato) => {
    var contador = 0;
    var arreglo = this.state.data;
    arreglo.map((registro) => {
      if (dato.id === registro.id) {
        arreglo[contador].Nombre = dato.Nombre;
        arreglo[contador].Apellido = dato.Apellido;
        arreglo[contador].DPI = dato.DPI;
        arreglo[contador].Sucursal = dato.Sucursal;
        arreglo[contador].ProductoConsumido = dato.ProductoConsumido;
      }
      contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false });
  };

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    return (
      <>
        <Container>
          <br></br>
          <Button color="success" onClick={() => this.mostrarModalInsertar()}>
            Insertar Ítem
          </Button>
          <br></br>
          <br></br>
          <Table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>DPI</th>
                <th>Sucursal</th>
                <th>Producto Consumido</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.Nombre}</td>
                  <td>{dato.Apellido}</td>
                  <td>{dato.DPI}</td>
                  <td>{dato.Sucursal}</td>
                  <td>{dato.ProductoConsumido}</td>

                  <td>
                    <Button
                      color="warning"
                      onClick={() => this.mostrarModalActualizar(dato)}
                    >
                      Editar
                    </Button>
                    {"  "}
                    <Button color="danger" onClick={() => this.eliminar(dato)}>
                      Borrar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <div>
              <h3>Insertar Ítem</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Id:</label>

              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.data[this.state.data.length - 1].id + 1}
              />
            </FormGroup>

            <FormGroup>
              <label>Nombre:</label>
              <input
                className="form-control"
                name="Nombre"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>Apellido:</label>
              <input
                className="form-control"
                name="Apellido"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>DPI:</label>
              <input
                className="form-control"
                name="DPI"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>Sucursal:</label>
              <input
                className="form-control"
                name="Sucursal"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>Producto Consumido:</label>
              <input
                className="form-control"
                name="ProductoConsumido"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={() => this.insertar()}>
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
            <div>
              <h3>Editar Ítem</h3>
            </div>
          </ModalHeader>

          <ModalBody>
          <FormGroup>
              <label>Id:</label>

              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />
            </FormGroup>

            <FormGroup>
              <label>Nombre:</label>
              <input
                className="form-control"
                name="Nombre"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.Nombre}
              />
            </FormGroup>

            <FormGroup>
              <label>Apellido:</label>
              <input
                className="form-control"
                name="Apellido"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.Apellido}
              />
            </FormGroup>

            <FormGroup>
              <label>DPI:</label>
              <input
                className="form-control"
                name="DPI"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.DPI}
              />
            </FormGroup>

            <FormGroup>
              <label>Sucursal:</label>
              <input
                className="form-control"
                name="Sucursal"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.Sucursal}
              />
            </FormGroup>

            <FormGroup>
              <label>Producto Consumido:</label>
              <input
                className="form-control"
                name="ProductoConsumido"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.ProductoConsumido}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Editar
            </Button>
            <Button color="danger" onClick={() => this.cerrarModalActualizar()}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default App;
