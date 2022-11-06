import { useState, useEffect } from "react";
import Navbar from "./navbar";

import { makeStyles } from "@material-ui/core/styles";

import CurrencyInput from "react-currency-input-field";
import SelectSearch from 'react-select-search';
import 'react-select-search/style.css'

import { toast } from "react-toastify";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

import MaterialTable from "@material-table/core";

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

  const [productsData, setProductsData] = useState([]);
  const [productsColumns, setSuppliersColumns] = useState([
    { title: "Nome", field: "name" },
    { title: "SKU", field: "sku", editable: false },
    { title: "Preço", field: "price" },
    { title: "Fornecedor", field: "supplier", productSuppliers },
    { title: "RFID", field: "rfId" },
    { title: "Lote", field: "batchNumber" },
    { title: "Descrição", field: "description" },
  ]);

  const [searchProductSuppliersOptions, setSearchProductSuppliersOptions] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    async function fetchData() {
      await getProductSuppliers();
      await getProducts();
    }
    fetchData();
  }, []);

  const createProduct = (event) => {
    event.preventDefault();
    UserService.createProduct({
      name: productName,
      SKU: productSKU,
      price: productPrice,
      supplierId: selectedProductSupplier,
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
    let products = [];
    UserService.getProducts().then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        products.push({
          id: response.data[i].id,
          name: response.data[i].name,
          sku: response.data[i].SKU,
          price: response.data[i].price,
          supplier: response.data[i]['supplier.name'],
          rfId: response.data[i].rfId,
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
        productSuppliersOptions.push({ name: supplier.name, value: supplier.id });
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
  }

  const renderProductForm = () => {
    return (
      <>
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
                      inputType="number"
                      prefix="R$"
                      name="productPrice"
                      id="productPrice"
                      onChange={(e) =>
                        setProductPrice(Number(e.target.value.replace(/\D/g, '')))
                      }
                      placeholder="PREÇO"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <SelectSearch
                      search={true}
                      value={selectedProductSupplier}
                      getOptions={(query) => {
                        return new Promise((resolve, reject) => {
                          UserService.getSuppliers().then((response) => {
                            resolve(response.data.map(({ id, name }) => ({
                              value: id,
                              name: name,
                            })))
                          })
                        });
                      }}
                      options={[]}
                      id="productSupplierId"
                      name="search"
                      onChange={(value) => {
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
                  <Button style={{ marginLeft: '15px' }} color="secondary" variant="contained" type="submit">
                    Salvar
                  </Button>
                </Box>
              </form>
            </Box>
          </Grid>
        </Grid>
      </>
    );
  };

  const renderProductData = () => {
    return <>
      <Grid container>
        <Grid item xs={12}>
          <Box className={classes.formContainer}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <div style={{ height: 700, width: '100%' }}>
                  <MaterialTable title="Produtos" columns={productsColumns} data={productsData}
                    localization={{
                      pagination: {
                        labelRowsSelect: 'linhas',
                        labelDisplayedRows: '{count} de {from}-{to}',
                        firstTooltip: 'Primeira página',
                        previousTooltip: 'Página anterior',
                        nextTooltip: 'Próxima página',
                        lastTooltip: 'Última página'
                      },
                      toolbar: {
                        nRowsSelected: '{0} linhas(s) selecionadas',
                        searchTooltip: 'Pesquisar',
                        searchPlaceholder: 'Pesquisar'
                      },
                      header: {
                        actions: 'Ações'
                      },
                      body: {
                        emptyDataSourceMessage: 'Nenhum registro para exibir',
                        filterRow: {
                          filterTooltip: 'Filtro'
                        },
                        editRow: {
                          deleteText: 'Tem certeza que deseja deletar este registro?',
                          cancelTooltip: 'Cancelar',
                          saveTooltip: 'Salvar'
                        },
                        addTooltip: 'Adicionar',
                        deleteTooltip: 'Deletar',
                        editTooltip: 'Editar'

                      }
                    }}
                    editable={{
                      onRowDelete: selectedRow => new Promise((resolve, reject) => {
                        try {
                          console.log(selectedRow);
                          deleteProduct(selectedRow.sku); resolve()
                        }
                        catch (error) {
                          reject();
                        }
                      }),
                      onRowUpdate: (updatedRow, oldRow) => new Promise((resolve, reject) => { updateProduct(updatedRow); resolve() }),
                    }}
                    options={{
                      actionsColumnIndex: -1, addRowPosition: "first"
                    }}
                  />
                </div>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  };

  return (
    <>
      <Navbar />
      {renderProductForm()}
      {renderProductData()}
    </>
  );
}
