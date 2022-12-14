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
} from "@material-ui/core";

import UserService from "../services/user.service";

import MaterialTable, { Column } from "@material-table/core";
import InputMask from "react-input-mask";
import SaveIcon from "@material-ui/icons/Save";
import ClearIcon from "@material-ui/icons/Clear";

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
    {
      field: "cnpj",
      title: "CNPJ",
      cellStyle: { maxWidth: "5px", overflowWrap: "break-word" },
      align: "center",
    },
    {
      field: "fantasyName",
      title: "Nome Fantasia",
      cellStyle: { maxWidth: "1px", overflowWrap: "break-word" },
      align: "center",
    },
    { field: "corporateName", title: "Raz??o Social", align: "center" },
    {
      field: "email",
      title: "Email",
      cellStyle: { maxWidth: "10px", overflowWrap: "break-word" },
      align: "center",
    },
    {
      field: "phone",
      title: "Telefone",
      cellStyle: { maxWidth: "2px" },
      align: "center",
    },
    { field: "address", title: "Endere??o", align: "center" },
    { field: "cep", title: "CEP", align: "center" },
    { field: "addressNumber", title: "N??mero", align: "center" },
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

  const resetData = () => {
    setSupplierCNPJ("");
    setSupplierCorporateName(null);
    setSupplierFantasyName(null);
    setSupplierAddress(null);
    setSupplierCEP("");
    setSupplierAddressNumber(null);
    setSupplierEmail(null);
    setSupplierPhone("");
  };

  const createSupplier = (event) => {
    event.preventDefault();
    UserService.createSupplier({
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
        toast.success("Fornecedor criado com sucesso!");
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
              <Grid item xs={8} />
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
                  label="Raz??o Social"
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
                  mask={"(99)9999-9999"}
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

              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  label="Endere??o"
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
                  label="N??"
                  value={supplierAddressNumber}
                  type="number"
                  fullWidth
                  size="small"
                  required
                  onChange={(e) =>
                    setSupplierAddressNumber(e.target.value)
                  }></TextField>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={2}
              direction="row"
              justifyContent="flex-end">
              <Grid item xs={2}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disableElevation
                  fullWidth
                  startIcon={<SaveIcon />}>
                  Salvar
                </Button>
              </Grid>
              <Grid item xs={2}>
                <Button
                  type="reset"
                  variant="contained"
                  color="inherit"
                  disableElevation
                  fullWidth
                  startIcon={<ClearIcon />}
                  onClick={resetData}>
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
          <Typography>Voc?? n??o est?? logado</Typography>
        </Container>
      );
    }
  };

  const renderSuppliersData = () => {
    if (isLogged) {
      return (
        <Grid style={{ paddingLeft: "60px", paddingRight: "60px" }} container>
          <Grid item xs={12}>
            <Box className={classes.formContainer}>
              <Grid item xs={12} sm={12}>
                <div
                  style={{
                    height: "100%",
                    width: "100%",
                  }}>
                  <MaterialTable
                    title="Fornecedores"
                    columns={suppliersColumns}
                    data={suppliersData}
                    localization={{
                      pagination: {
                        labelRowsSelect: "linhas",
                        labelDisplayedRows: "{count} de {from}-{to}",
                        firstTooltip: "Primeira p??gina",
                        previousTooltip: "P??gina anterior",
                        nextTooltip: "Pr??xima p??gina",
                        lastTooltip: "??ltima p??gina",
                      },
                      toolbar: {
                        nRowsSelected: "{0} linhas(s) selecionadas",
                        searchTooltip: "Pesquisar",
                        searchPlaceholder: "Pesquisar",
                      },
                      header: {
                        actions: "A????es",
                      },
                      body: {
                        emptyDataSourceMessage: "Nenhum registro para exibir",
                        filterRow: {
                          filterTooltip: "Filtro",
                        },
                        editRow: {
                          deleteText:
                            "Tem certeza que deseja deletar este registro?",
                          cancelTooltip: "Cancelar",
                          saveTooltip: "Salvar",
                        },
                        addTooltip: "Adicionar",
                        deleteTooltip: "Deletar",
                        editTooltip: "Editar",
                      },
                    }}
                    editable={{
                      onRowDelete: (selectedRow) =>
                        new Promise((resolve, reject) => {
                          try {
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
                      columnResizable: false,
                      paging: true,
                      pageSize: 10,
                      tableLayout: "fixed",
                    }}
                  />
                </div>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      );
    }
  };

  return (
    <Box display="flex" flexDirection="row">
      <Navbar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          align: "center",
        }}>
        {renderSuppliersForm()}
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {renderSuppliersData()}
      </div>
    </Box>
  );
}
