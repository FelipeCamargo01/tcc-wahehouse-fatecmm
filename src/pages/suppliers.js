import { useState, useEffect } from "react";
import Navbar from "./navbar";

import { makeStyles } from "@material-ui/core/styles";

import { toast, ToastContainer } from "react-toastify";

import {
  Container,
  Typography,
  TextField,
  Box,
  Button,
  Grid,
  Paper,
} from "@material-ui/core";

import UserService from "../services/user.service";

import MaterialTable, { Column } from "@material-table/core";
import InputMask, { ReactInputMask } from "react-input-mask";

//css imports
require("./css/forms.css");

const useStyles = makeStyles({
  formContainer: {
    paddingTop: "2vh",
  },
});

export default function Suppliers() {
  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(null);

  const getUserFromStorage = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
      setIsLogged(true);
    } else {
      setUser(null);
      setIsLogged(false);
    }
  };

  const [supplierName, setSupplierName] = useState(null);
  const [supplierEmail, setSupplierEmail] = useState(null);
  const [supplierPhone, setSupplierPhone] = useState(null);
  const [supplierAddress, setSupplierAddress] = useState(null);
  const [supplierCNPJ, setSupplierCNPJ] = useState(null);
  const [supplierCorporateName, setSupplierCorporateName] = useState(null);
  const [supplierFantasyName, setSupplierFantasyName] = useState(null);
  const [supplierCEP, setSupplierCEP] = useState(null);
  const [supplierAddressNumber, setSupplierAddressNumber] = useState(null);
  const [supplierItems, setSupplierItems] = useState([]);
  const [supplierInfos, setSupplierInfos] = useState([]);

  const [suppliersData, setSuppliersData] = useState([]);
  const [suppliersColumns, setSuppliersColumns] = useState([
    { field: "name", title: "Nome" },
    { field: "email", title: "Email" },
    { field: "phone", title: "Telefone" },
    { field: "address", title: "Endereço" },
    { field: "cnpj", title: "CNPJ" },
    { field: "corporateName", title: "Razão Social" },
    { field: "fantasyName", title: "Nome Fantasia" },
    { field: "cep", title: "CEP" },
    { field: "addressNumber", title: "Número" },
  ]);

  const classes = useStyles();

  useEffect(() => {
    async function fetchData() {
      await getSuppliers();
    }
    fetchData();
  }, []);

  useEffect(() => {
    getUserFromStorage();
  }, [isLogged]);

  const createSupplier = (event) => {
    event.preventDefault();
    UserService.createSupplier({
      name: supplierName,
      email: supplierEmail,
      phone: supplierPhone,
      address: supplierAddress,
      cnpj: supplierCNPJ,
      corporateName: supplierCorporateName,
      fantasyName: supplierFantasyName,
      cep: supplierCEP,
      addressNumber: supplierAddressNumber,
    }).then(
      (response) => {
        toast.success("Supplier created successfully");
        getSuppliers();
      },
      (error) => {
        toast.error(error.response.data.message);
      }
    );
  };

  const getSuppliers = () => {
    UserService.getSuppliers().then(
      (response) => {
        let suppliers = [];
        for (const supplier of response.data) {
          suppliers.push({
            id: supplier.id,
            name: supplier.name,
            email: supplier.email,
            phone: supplier.phone,
            address: supplier.address,
            cnpj: supplier.cnpj,
            corporateName: supplier.corporateName,
            fantasyName: supplier.fantasyName,
            cep: supplier.cep,
            addressNumber: supplier.addressNumber,
          });
        }
        setSuppliersData(suppliers);
      },
      (error) => {
        toast.error(error.response.data.message);
      }
    );
  };

  const deleteSupplier = (id) => {
    UserService.deleteSupplier({ id: id }).then(
      (response) => {
        toast.success("Fornecedor deletado com sucesso");
        getSuppliers();
      },
      (error) => {
        toast.error(error.response.data.message);
      }
    );
  };

  const updateSupplier = (data) => {
    UserService.updateSupplier(data).then(
      (response) => {
        toast.success("Fornecedor atualizado com sucesso");
        getSuppliers();
      },
      (error) => {
        toast.error(error.response.data.message);
      }
    );
  };

  const renderSuppliersForm = () => {
    if (isLogged) {
      return (
        <Container maxWidth="md" align="center" style={{ paddingTop: "5rem" }}>
          <Typography
            align="center"
            component="h1"
            variant="h5"
            style={{ marginBottom: "2rem" }}>
            Cadastrar Fornecedor
          </Typography>

          <form onSubmit={createSupplier}>
            <Grid
              container
              spacing={2}
              xs={12}
              alignItems="center"
              style={{ marginBottom: "2rem" }}>
              <Grid item xs={4}>
                <InputMask
                  mask={"99.999.999/9999-99"}
                  value={supplierCNPJ}
                  onChange={(e) => setSupplierCNPJ(e.target.value)}>
                  {() => (
                    <TextField
                      variant="outlined"
                      label="CNPJ"
                      fullWidth
                      size="small"
                      required></TextField>
                  )}
                </InputMask>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  variant="outlined"
                  label="Nome"
                  value={supplierName}
                  fullWidth
                  size="small"
                  required
                  onChange={(e) => setSupplierName(e.target.value)}></TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  label="Razão Social"
                  value={supplierCorporateName}
                  fullWidth
                  size="small"
                  required
                  onChange={(e) =>
                    setSupplierCorporateName(e.target.value)
                  }></TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  label="Nome Fantasia"
                  value={supplierFantasyName}
                  fullWidth
                  size="small"
                  required
                  onChange={(e) =>
                    setSupplierFantasyName(e.target.value)
                  }></TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  label="Endereço"
                  value={supplierAddress}
                  fullWidth
                  size="small"
                  required
                  onChange={(e) =>
                    setSupplierAddress(e.target.value)
                  }></TextField>
              </Grid>
              <Grid item xs={3}>
                <InputMask
                  mask={"99999-999"}
                  value={supplierCEP}
                  onChange={(e) => setSupplierCEP(e.target.value)}>
                  {() => (
                    <TextField
                      variant="outlined"
                      label="CEP"
                      fullWidth
                      size="small"
                      required></TextField>
                  )}
                </InputMask>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  variant="outlined"
                  label="Nº"
                  value={supplierAddressNumber}
                  type="number"
                  fullWidth
                  size="small"
                  required
                  onChange={(e) =>
                    setSupplierAddressNumber(e.target.value)
                  }></TextField>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  label="E-mail"
                  value={supplierEmail}
                  type="email"
                  fullWidth
                  size="small"
                  required
                  onChange={(e) =>
                    setSupplierEmail(e.target.value)
                  }></TextField>
              </Grid>
              <Grid item xs={6}>
                <InputMask
                  mask={"9999-9999"}
                  value={supplierPhone}
                  onChange={(e) => setSupplierPhone(e.target.value)}>
                  {() => (
                    <TextField
                      variant="outlined"
                      label="Telefone"
                      type="tel"
                      fullWidth
                      size="small"
                      required></TextField>
                  )}
                </InputMask>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={2}
              direction="row"
              justifyContent="flex-end">
              <Grid item>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disableElevation>
                  Salvar
                </Button>
              </Grid>
              <Grid item>
                <Button
                  type="reset"
                  variant="contained"
                  color="inherit"
                  disableElevation>
                  Limpar
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      );
    } else {
      return (
        <Container maxWidth="md" align="center" style={{ paddingTop: "5rem" }}>
          <Typography>Você não está logado</Typography>
        </Container>
      );
    }
  };

  const renderSuppliersData = () => {
    if (isLogged) {
      return (
        <Container maxWidth="md">
          <Grid container>
            <Grid item xs={12}>
              <Box className={classes.formContainer}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <div
                      style={{
                        height: "100%",
                      }}>
                      <MaterialTable
                        title="Fornecedores"
                        columns={suppliersColumns}
                        data={suppliersData}
                        // actions={[
                        //     {
                        //       icon: 'save',
                        //       tooltip: 'Save User',
                        //       onClick: (event, rowData) => alert("You saved " + rowData.name)
                        //     }
                        //   ]}
                        editable={{
                          onRowDelete: (selectedRow) =>
                            new Promise((resolve, reject) => {
                              try {
                                console.log(selectedRow);
                                deleteSupplier(selectedRow.id);
                                resolve();
                              } catch (error) {
                                console.log(error);
                                reject();
                              }
                            }),
                          onRowUpdate: (updatedRow, oldRow) =>
                            new Promise((resolve, reject) => {
                              updateSupplier(updatedRow);
                              resolve();
                            }),
                        }}
                        options={{
                          actionsColumnIndex: -1,
                          addRowPosition: "first",
                          columnResizable: true,
                          paging: true,
                          tableLayout: "auto",
                        }}
                      />
                    </div>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Container>
      );
    }
  };

  return (
    <Box display="flex" flexDirection="row">
      <Navbar />
      <Container
        display="flex"
        flexDirection="column"
        maxWidth="lg"
        align="center">
        {renderSuppliersForm()}
        {renderSuppliersData()}
      </Container>
    </Box>
  );
}
