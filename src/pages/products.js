import { useState, useEffect } from "react";
import Navbar from "./navbar";

import { makeStyles } from "@material-ui/core/styles";

import CurrencyInput from "react-currency-input-field";
import SelectSearch, { useSelect } from 'react-select-search';
import 'react-select-search/style.css'

import { toast, ToastContainer } from "react-toastify";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

import UserService from "../services/user.service";

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

  const [searchProductSuppliersOptions, setSearchProductSuppliersOptions] = useState([]);

  const classes = useStyles();

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
      productImage: productImage,
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
        productSuppliersOptions.push({ name: supplier.name, value: supplier.id });
      }

      setSearchProductSuppliersOptions(productSuppliersOptions);
      console.log(searchProductSuppliersOptions);
    });
  };

  const renderProductForm = () => {
    return (
      <Grid
        container
        id="item-form"
        className={classes.formContainer}
      >
        <Grid item xs={12}>
          <Box className={classes.formContainer}>
            <h2>Criar produto</h2>
            <form onSubmit={createProduct}>
              <Grid container xs={12} spacing={3}>
                <Grid item xs={6}>
                  <input
                    name="supplierName"
                    required
                    id="productName"
                    onChange={(e) =>
                      setProductName(e.target.value)
                    }
                    autoFocus
                    placeholder="NOME"
                    type="text"
                  ></input>
                </Grid>
                <Grid item xs={3}>
                  <input
                    name="productSKU"
                    required
                    id="productSKU"
                    onChange={(e) =>
                      setProductSKU(e.target.value)
                    }
                    autoFocus
                    placeholder="SKU"
                    type="number"
                  ></input>
                </Grid>
              </Grid>
              <Grid container xs={12} spacing={3}>
                <Grid item xs={3}>
                  <CurrencyInput
                    prefix="R$"
                    name="productPrice"
                    id="productPrice"
                    onChange={(e) =>
                      setProductName(e.target.value)
                    }
                    placeholder="PREÇO"
                  />
                </Grid>
                <Grid item xs={6}>
                  <SelectSearch
                    search={true}
                    value={selectedProductSupplier}
                    getOptions={(query) => {
                      return new Promise((resolve, reject) => { UserService.getSuppliers().then((response) => {
                        console.log('resp get suppl');
                        console.log(response.data);
                        resolve(response.data.map(({ id, name }) => ({
                          value: id,
                          name: name,
                        })))
                      })});
                    }}
                    options={[]}
                    id="productSupplierId"
                    name="search"
                    onChange={(value) => {
                      console.log(value);
                      setSelectedProductSupplier(value);
                      }
                    }
                    placeholder="FORNECEDOR"
                  />
                </Grid>
              </Grid>
              <Grid container xs={12} spacing={3}>
                <Grid item xs={6}>
                  <input
                    name="productRfId"
                    id="productRfId"
                    onChange={(e) =>
                      setProductRfId(e.target.value)
                    }
                    autoFocus
                    placeholder="RFID"
                    type="text"
                  ></input>
                </Grid>
                <Grid
                  item
                  xs={6}
                >
                  <input
                    name="productBatchNumber"
                    id="productBatchNumber"
                    onChange={(e) =>
                      setProductBatchNumber(
                        e.target.value
                      )
                    }
                    autoFocus
                    placeholder="LOTE"
                    type="text"
                  ></input>
                </Grid>
              </Grid>
              <Grid container xs={12} spacing={3}>
                <Grid item xs={12}>
                  <textarea
                    name="productDescription"
                    id="productDescription"
                    onChange={(e) =>
                      setProductDescription(
                        e.target.value
                      )
                    }
                    autoFocus
                    placeholder="DESCRIÇÃO"
                    type="text"
                  ></textarea>
                </Grid>
              </Grid>
              <Box mt={3} style={{ float: "right" }}>
                <Button
                  onClick={() => {
                    // setIsModalFormOpen(false);
                  }}
                  variant="outlined"
                  color="primary"
                  type="reset"
                >
                  Limpar
                </Button>
                <Button style={{ marginLeft: '15px'}} color="secondary" variant="contained" type="submit">
                  Salvar
                </Button>
              </Box>
            </form>
          </Box>
        </Grid>
      </Grid>
    );
  };

  const renderProductData = () => { };

  return (
    <>
      <Navbar />
      {renderProductForm()}
    </>
  );
}
