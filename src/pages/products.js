import { useState, useEffect } from "react";
import Navbar from "./navbar";

import { makeStyles } from "@material-ui/core/styles";

import "react-select-search/style.css";

import { toast, ToastContainer } from "react-toastify";

import MaterialTable from "@material-table/core";

import UserService from "../services/user.service";

import { Autocomplete } from "@material-ui/lab";

import {
  Container,
  TextField,
  Box,
  Button,
  Grid,
  Typography,
  InputAdornment,
  Paper,
} from "@material-ui/core";

import SaveIcon from "@material-ui/icons/Save";
import ClearIcon from "@material-ui/icons/Clear";

//css imports
require("./css/forms.css");
require("./css/products.css");

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  formContainer: {
    paddingTop: "2vh",
  },
});

export default function Product(props) {
  // product form
  const [productName, setProductName] = useState(null);
  const [productSKU, setProductSKU] = useState(null);
  const [productPrice, setProductPrice] = useState(null);
  const [productSupplierId, setProductSupplierId] = useState(null);
  const [productImage, setProductImage] = useState(null);
  const [productBatchNumber, setProductBatchNumber] = useState(null);
  const [productDescription, setProductDescription] = useState(null);
  const [selectedProductSupplier, setSelectedProductSupplier] = useState(null);
  const [productsItems, setProductItems] = useState([]);
  const [productInfos, setProductInfos] = useState([]);
  const [productSuppliers, setProductSuppliers] = useState([]);

  const [productsData, setProductsData] = useState([]);
  const [productsColumns, setSuppliersColumns] = useState([
    { title: "SKU", field: "sku", editable: false },
    { title: "Nome", field: "name" },
    { title: "Fornecedor", field: "supplier", productSuppliers },
    { title: "Preço Unitário (R$)", field: "price" },
    { title: "Lote", field: "batchNumber" },
    { title: "Descrição", field: "description" },
  ]);

  const [searchProductSuppliersOptions, setSearchProductSuppliersOptions] =
    useState([]);

  const classes = useStyles();

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

  useEffect(() => {
    getUserFromStorage();
  }, [isLogged]);

  useEffect(() => {
    async function fetchData() {
      await getProductSuppliers();
      await getProducts();
    }
    fetchData();
  }, []);

  const resetData = () => {
    setProductSKU(null);
    setProductBatchNumber(null);
    setProductName(null);
    setSelectedProductSupplier(null);
    setProductPrice(null);
    setProductDescription("");
  };

  const createProduct = (event) => {
    event.preventDefault();
    UserService.createProduct({
      name: productName,
      SKU: productSKU,
      price: productPrice,
      supplierId: selectedProductSupplier,
      description: productDescription,
      batchNumber: productBatchNumber,
    })
      .then((response) => {
        toast.success(response.data);
        //   setIsModalFormOpen(false);
        getProducts();
      })
      .catch((error) => {
        if (error.data) {
          if (error.data.data) {
            toast.error(error.data.data.message);
          }
        } else {
          toast.error(error);
        }
      });
  };

  const getProducts = () => {
    setProductItems([]);
    let products = [];
    UserService.getProducts().then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        products.push({
          id: response.data[i].id,
          name: response.data[i].name,
          sku: response.data[i].SKU,
          price: response.data[i].price,
          supplier: response.data[i]["supplier.name"],
          batchNumber: response.data[i].batchNumber,
          description: response.data[i].description,
        });
      }
      setProductsData(products);
    });
  };

  const getProductSuppliers = () => {
    UserService.getSuppliers().then((response) => {
      setProductSuppliers(response.data);
      let productSuppliersOptions = [];
      for (const supplier of response.data) {
        productSuppliersOptions.push({
          name: supplier.name,
          value: supplier.id,
        });
      }

      setSearchProductSuppliersOptions(productSuppliersOptions);
    });
  };

  const deleteProduct = (sku) => {
    UserService.deleteProduct({ sku: sku }).then((response) => {
      toast.success(response.data);
      getProducts();
    });
  };

  const updateProduct = (data) => {
    UserService.updateProduct(data).then((response) => {
      toast.success(response.data);
      getProducts();
    });
  };

  const renderProductForm = () => {
    if (isLogged) {
      return (
        <Container maxWidth="md" align="center" style={{ paddingTop: "5rem" }}>
          <Typography
            marginBottom={"3rem"}
            align="center"
            component="h1"
            variant="h5"
            style={{ marginBottom: "2rem" }}>
            Cadastrar Produto
          </Typography>
          <form onSubmit={createProduct}>
            <Grid
              container
              spacing={2}
              xs={12}
              marginBottom={"2rem"}
              alignItems="center"
              style={{ marginBottom: "2rem" }}>
              <Grid item xs={3}>
                <TextField
                  variant="outlined"
                  label="SKU"
                  value={productSKU}
                  type="text"
                  fullWidth
                  size="small"
                  required
                  onChange={(e) => setProductSKU(e.target.value)}></TextField>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  variant="outlined"
                  label="Lote"
                  value={productBatchNumber}
                  type="number"
                  fullWidth
                  size="small"
                  required
                  onChange={(e) =>
                    setProductBatchNumber(e.target.value)
                  }></TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  label="Nome"
                  value={productName}
                  fullWidth
                  size="small"
                  required
                  onChange={(e) => setProductName(e.target.value)}></TextField>
              </Grid>

              <Grid item xs={6}>
                <Autocomplete
                  disablePortal
                  options={searchProductSuppliersOptions}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Fornecedores"
                      value={selectedProductSupplier}
                      variant="outlined"
                      size="small"
                    />
                  )}
                  onChange={(event, option) =>
                    setSelectedProductSupplier(option.value)
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  variant="outlined"
                  label="Preço"
                  type="number"
                  fullWidth
                  size="small"
                  required
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">R$</InputAdornment>
                    ),
                  }}></TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  label="Descrição"
                  value={productDescription}
                  fullWidth
                  multiline
                  rows={5}
                  onChange={(e) =>
                    setProductDescription(e.target.value)
                  }></TextField>
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
                  disableElevation
                  startIcon={<SaveIcon />}>
                  Salvar
                </Button>
              </Grid>
              <Grid item>
                <Button
                  type="reset"
                  variant="contained"
                  color="inherit"
                  disableElevation
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
          <Typography>Você não está logado</Typography>
        </Container>
      );
    }
  };

  const renderProductData = () => {
    if (isLogged) {
      return (
        <Grid style={{ paddingLeft: "60px", paddingRight: "60px" }} container>
          <Grid container>
            <Grid item xs={12}>
              <Box className={classes.formContainer}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <div style={{ height: "700", width: "100%" }}>
                      <MaterialTable
                        height="700"
                        title="Produtos"
                        columns={productsColumns}
                        data={productsData}
                        localization={{
                          pagination: {
                            labelRowsSelect: "linhas",
                            labelDisplayedRows: "{count} de {from}-{to}",
                            firstTooltip: "Primeira página",
                            previousTooltip: "Página anterior",
                            nextTooltip: "Próxima página",
                            lastTooltip: "Última página",
                          },
                          toolbar: {
                            nRowsSelected: "{0} linhas(s) selecionadas",
                            searchTooltip: "Pesquisar",
                            searchPlaceholder: "Pesquisar",
                          },
                          header: {
                            actions: "Ações",
                          },
                          body: {
                            emptyDataSourceMessage:
                              "Nenhum registro para exibir",
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
                                deleteProduct(selectedRow.sku);
                                resolve();
                              } catch (error) {
                                reject();
                              }
                            }),
                          onRowUpdate: (updatedRow, oldRow) =>
                            new Promise((resolve, reject) => {
                              updateProduct(updatedRow);
                              resolve();
                            }),
                        }}
                        options={{
                          actionsColumnIndex: -1,
                          addRowPosition: "first",
                          columnResizable: true,
                          paging: true,
                          tableLayout: "auto",
                          pageSize: 10,
                        }}
                      />
                    </div>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
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
        {renderProductForm()}
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
        {renderProductData()}
      </div>
    </Box>
  );
}
