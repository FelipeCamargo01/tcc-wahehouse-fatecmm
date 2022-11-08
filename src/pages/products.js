import { useState, useEffect } from "react";
import Navbar from "./navbar";

import { makeStyles } from "@material-ui/core/styles";

import CurrencyInput from "react-currency-input-field";
import SelectSearch, { useSelect } from "react-select-search";
import "react-select-search/style.css";

import { toast, ToastContainer } from "react-toastify";

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
} from "@material-ui/core";

import InputMask, { ReactInputMask } from "react-input-mask";

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
    paddingLeft: "10vw",
    paddingRight: "10vw",
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
  const [productRfId, setProductRfId] = useState(null);
  const [productBatchNumber, setProductBatchNumber] = useState(null);
  const [productDescription, setProductDescription] = useState(null);
  const [selectedProductSupplier, setSelectedProductSupplier] = useState(null);
  const [productsItems, setProductItems] = useState([]);
  const [productInfos, setProductInfos] = useState([]);
  const [productSuppliers, setProductSuppliers] = useState([]);

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
    }
    fetchData();
  }, []);

  const createProduct = (event) => {
    event.preventDefault();
    UserService.createProduct({
      name: productName,
      SKU: productSKU,
      price: productPrice,
      supplierId: productSupplierId,
      description: productDescription,
      rfId: productRfId,
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
    UserService.getProducts().then((response) => {
      setProductItems(response.data);
    });
  };

  const getProductSuppliers = () => {
    UserService.getSuppliers().then((response) => {
      console.log(response.data);
      setProductSuppliers(response.data);
      let productSuppliersOptions = [];
      for (const supplier of response.data) {
        productSuppliersOptions.push({
          name: supplier.name,
          value: supplier.id,
        });
      }

      setSearchProductSuppliersOptions(productSuppliersOptions);
      console.log(searchProductSuppliersOptions);
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
                  label="RFID"
                  value={productRfId}
                  type="text"
                  fullWidth
                  size="small"
                  required
                  onChange={(e) => setProductRfId(e.target.value)}></TextField>
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
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Fornecedores"
                      variant="outlined"
                      size="small"
                      value={selectedProductSupplier}
                    />
                  )}
                  onChange={(event, option) =>
                    setProductSupplierId(option.value)
                  }
                  getOptionLabel={(option) => option.name}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  variant="outlined"
                  label="SKU"
                  value={productSKU}
                  type="number"
                  fullWidth
                  size="small"
                  required
                  onChange={(e) => setProductSKU(e.target.value)}></TextField>
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

        // <Grid container id="item-form" className={classes.formContainer}>
        //   <Grid item xs={12}>
        //     <Box className={classes.formContainer}>
        //       <h2>Criar produto</h2>
        //       <form onSubmit={createProduct}>
        //         <Grid container xs={12} spacing={3}>
        //           <Grid item xs={6}>
        //             <input
        //               name="supplierName"
        //               required
        //               id="productName"
        //               onChange={(e) => setProductName(e.target.value)}
        //               autoFocus
        //               placeholder="NOME"
        //               type="text"></input>
        //           </Grid>
        //           <Grid item xs={3}>
        //             <input
        //               name="productSKU"
        //               required
        //               id="productSKU"
        //               onChange={(e) => setProductSKU(e.target.value)}
        //               autoFocus
        //               placeholder="SKU"
        //               type="number"></input>
        //           </Grid>
        //         </Grid>
        //         <Grid container xs={12} spacing={3}>
        //           <Grid item xs={3}>
        //             <CurrencyInput
        //               prefix="R$"
        //               name="productPrice"
        //               id="productPrice"
        //               onChange={(e) => setProductName(e.target.value)}
        //               placeholder="PREÇO"
        //             />
        //           </Grid>
        //           <Grid item xs={6}>
        //             <SelectSearch
        //               search={true}
        //               value={selectedProductSupplier}
        //               getOptions={(query) => {
        //                 return new Promise((resolve, reject) => {
        //                   UserService.getSuppliers().then((response) => {
        //                     console.log("resp get suppl");
        //                     console.log(response.data);
        //                     resolve(
        //                       response.data.map(({ id, name }) => ({
        //                         value: id,
        //                         name: name,
        //                       }))
        //                     );
        //                   });
        //                 });
        //               }}
        //               options={[]}
        //               id="productSupplierId"
        //               name="search"
        //               onChange={(value) => {
        //                 console.log(value);
        //                 setSelectedProductSupplier(value);
        //               }}
        //               placeholder="FORNECEDOR"
        //             />
        //           </Grid>
        //         </Grid>
        //         <Grid container xs={12} spacing={3}>
        //           <Grid item xs={6}>
        //             <input
        //               name="productRfId"
        //               id="productRfId"
        //               onChange={(e) => setProductRfId(e.target.value)}
        //               autoFocus
        //               placeholder="RFID"
        //               type="text"></input>
        //           </Grid>
        //           <Grid item xs={6}>
        //             <input
        //               name="productBatchNumber"
        //               id="productBatchNumber"
        //               onChange={(e) => setProductBatchNumber(e.target.value)}
        //               autoFocus
        //               placeholder="LOTE"
        //               type="text"></input>
        //           </Grid>
        //         </Grid>
        //         <Grid container xs={12} spacing={3}>
        //           <Grid item xs={12}>
        //             <textarea
        //               name="productDescription"
        //               id="productDescription"
        //               onChange={(e) => setProductDescription(e.target.value)}
        //               autoFocus
        //               placeholder="DESCRIÇÃO"
        //               type="text"></textarea>
        //           </Grid>
        //         </Grid>
        //         <Box mt={3} style={{ float: "right" }}>
        //           <Button
        //             onClick={() => {
        //               // setIsModalFormOpen(false);
        //             }}
        //             variant="outlined"
        //             color="primary"
        //             type="reset">
        //             Limpar
        //           </Button>
        //           <Button
        //             style={{ marginLeft: "15px" }}
        //             color="secondary"
        //             variant="contained"
        //             type="submit">
        //             Salvar
        //           </Button>
        //         </Box>
        //       </form>
        //     </Box>
        //   </Grid>
        // </Grid>
      );
    } else {
      return (
        <Container maxWidth="md" align="center" style={{ paddingTop: "5rem" }}>
          <Typography>Você não está logado</Typography>
        </Container>
      );
    }
  };

  const renderProductData = () => {};

  return (
    <Box display="flex" flexDirection="row">
      <Navbar />
      <Container
        display="flex"
        flexDirection="column"
        maxWidth="xl"
        align="center">
        {renderProductForm()}
      </Container>
    </Box>
  );
}
