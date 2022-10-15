import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";

import Navbar from "./navbar";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import ProductCard from "./product-card";
import Supplier from "./supplier";
import Product from "./product";
import StockMovimentation from "./stock-movimentation";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";

import UserService from "../services/user.service";

import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.min.css";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
});

export default function Home() {
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

  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(null);
  const [products, setProducts] = useState({
    image:
      "https://imagensemoldes.com.br/wp-content/uploads/2020/05/Laranja-PNG.png",
    quantity: 2,
    price: "R$1,00",
    SKU: "123",
    name: "Laranja",
  });
  const [isModalFormOpen, setIsModalFormOpen] = useState(false);
  const [screenLabel, setScreenLabel] = useState("Home");
  const [productSuppliers, setProductSuppliers] = useState([]);
  const [productStockMovimentation, setProductStockMovimentation] = useState([]);
  const classes = useStyles();

  // supplier form
  const [supplierName, setSupplierName] = useState(null);
  const [supplierAddress, setSupplierAddress] = useState(null);
  const [supplierEmail, setSupplierEmail] = useState(null);
  const [supplierPhone, setSupplierPhone] = useState(null);
  const [suppliers, setSuppliers] = useState([]);
  // product form
  const [productName, setProductName] = useState(null);
  const [productSKU, setProductSKU] = useState(null);
  const [productPrice, setProductPrice] = useState(null);
  const [productSupplierId, setProductSupplierId] = useState(null);
  const [productImage, setProductImage] = useState(null);
  const [productsItems, setProductItems] = useState([]);
  const [productInfos, setProductInfos] = useState([]);
  // movimentations form
  const [stockMovimentationProductId, setStockMovimentationProductId] = useState(null);
  const [stockMovimentationQuantity, setStockMovimentationQuantity] = useState(null);
  const [stockMovimentationType, setStockMovimentationType] = useState(null);
  const [stockMovimentationDescription, setStockMovimentationDescription] = useState(null);
  const [stockMovimentation, setStockMovimentation] = useState([]);
  useEffect(() => {
    getUserFromStorage();
    if(isLogged && screenLabel === 'Home') {
      getProductInfos();
    }
    if (isLogged && screenLabel === "Fornecedores") {
      getSuppliers();
    }
    if (isLogged && screenLabel === "Produtos") {
      getProducts();
      getProductSuppliers();
    }
    if (isLogged && screenLabel === "Movimentação") {
      getStockMovimentation();
      getProductsStockMovimentation();
    }
    // });
  }, [isLogged, screenLabel]);

  const renderElement = () => {
    switch (screenLabel) {
      case "Home":
        return (
          <Grid container spacing={3}>
            <Grid mb={4} container spacing={3}>
              <Box mt={4} mb={4} m="auto">
                <Typography
                  variant="h3"
                  style={{
                    fontFamily: "Verdana",
                    fontWeight: "bold",
                    color: "#19262E",
                  }}
                  component="h3"
                >
                  Estoque de produtos
                </Typography>
              </Box>
            </Grid>
            {productInfos.map((productInfo) => (
              <Grid mt={4} item xs={4}>
                <ProductCard
                  product={productInfo}
                ></ProductCard>
              </Grid>
            ))}
            
            {/* <Grid mt={4} item xs={4}>
              <Box mt={4}>
                <ProductCard product={products} />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box mt={4}>
                <ProductCard product={products} />
              </Box>
            </Grid>
            <Grid mt={4} item xs={4}>
              <Box mt={4}>
                <ProductCard product={products} />
              </Box>
            </Grid>
            <Grid mt={4} item xs={4}>
              <Box mt={4}>
                <ProductCard product={products} />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box mt={4}>
                <ProductCard product={products} />
              </Box>
            </Grid> */}
          </Grid>
        );
      case "Produtos":
        return (
          <Grid container spacing={3}>
            <Grid container spacing={3}>
              <Box mt={4} mb={4} m="auto">
                <Typography
                  variant="h3"
                  style={{
                    fontFamily: "Verdana",
                    fontWeight: "bold",
                    color: "#19262E",
                  }}
                  component="h3"
                >
                  Cadastro de produtos
                </Typography>
              </Box>
            </Grid>
            {productsItems.map((productItem) => (
              <Grid item xs={12}>
                <Product
                  onDelete={() => {
                    getProducts();
                  }}
                  product={productItem}
                ></Product>
              </Grid>
            ))}
          </Grid>
        );
      case "Fornecedores":
        return (
          <Grid container spacing={3}>
            <Grid container spacing={3}>
              <Box mt={4} mb={4} m="auto">
                <Typography
                  variant="h3"
                  style={{
                    fontFamily: "Verdana",
                    fontWeight: "bold",
                    color: "#19262E",
                  }}
                  component="h3"
                >
                  Cadastro de fornecedores
                </Typography>
              </Box>
            </Grid>
            {suppliers.map((supplier) => (
              <Grid item xs={12}>
                <Supplier
                  onDelete={() => {
                    getSuppliers();
                  }}
                  supplier={supplier}
                ></Supplier>
              </Grid>
            ))}
          </Grid>
        );
      case "Movimentação":
        return (
          <Grid container spacing={3}>
            <Grid container spacing={3}>
              <Box mt={4} mb={4} m="auto">
                <Typography
                  variant="h3"
                  style={{
                    fontFamily: "Verdana",
                    fontWeight: "bold",
                    color: "#19262E",
                  }}
                  component="h3"
                >
                  Cadastro de movimentação
                </Typography>
              </Box>
            </Grid>
            {stockMovimentation.map((stockMovimentationItem) => (
              <Grid item xs={12}>
                <StockMovimentation
                  stockMovimentation={stockMovimentationItem}
                ></StockMovimentation>
              </Grid>
            ))}
          </Grid>
        );
      default:
        break;
    }
  };

  const renderContent = () => {
    if (isLogged) {
      return <Box>{renderElement()}</Box>;
    } else {
      return (
        <Grid container spacing={3}>
          <Box mt={4} m="auto">
            Você não está logado! Autentifique-se
          </Box>
        </Grid>
      );
    }
  };

  const renderSupplierForm = () => {
    return (
      <div>
        <Dialog
          open={isModalFormOpen}
          onClose={() => {
            setIsModalFormOpen(false);
          }}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Cadastro de fornecedor
          </DialogTitle>
          <DialogContent>
            <form onSubmit={createSupplier}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="sname"
                    name="supplierName"
                    variant="outlined"
                    required
                    fullWidth
                    id="supplierName"
                    label="Nome do fornecedor"
                    autoFocus
                    onChange={(e) => setSupplierName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="supplierEmail"
                    label="Email do fornecedor"
                    name="supplierEmail"
                    autoComplete="email"
                    onChange={(e) => setSupplierEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="supplierPhone"
                    label="Telefone do fornecedor"
                    id="supplierPhone"
                    onChange={(e) => setSupplierPhone(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    style={{ width: "100%" }}
                    placeholder=""
                    multiline
                    rows={2}
                    rowsMax={4}
                    label="Endereço do fornecedor"
                    onChange={(e) => setSupplierAddress(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Box mt={3} style={{ float: "right" }}>
                <Button
                  onClick={() => {
                    setIsModalFormOpen(false);
                  }}
                  color="primary"
                >
                  Cancelar
                </Button>
                <Button color="primary" type="submit">
                  Confirmar
                </Button>
              </Box>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  };

  const renderProductForm = () => {
    return (
      <div>
        <Dialog
          open={isModalFormOpen}
          onClose={() => {
            setIsModalFormOpen(false);
          }}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Cadastro de produto</DialogTitle>
          <DialogContent>
            <form onSubmit={createProduct}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="sname"
                    name="supplierName"
                    variant="outlined"
                    required
                    fullWidth
                    id="productName"
                    label="Nome do produto"
                    autoFocus
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="productSKU"
                    label="SKU do produto"
                    name="productSKU"
                    onChange={(e) => setProductSKU(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="productImageLink"
                    label="Link da imagem do produto"
                    name="productImageLink"
                    onChange={(e) => setProductImage(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    keyboardType="numeric"
                    variant="outlined"
                    required
                    fullWidth
                    name="productPrice"
                    label="Preço do produto"
                    id="productPrice"
                    onChange={(e) => setProductPrice(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel>Fornecedor</InputLabel>
                  <Select
                    labelId="demo-mutiple-name-label"
                    id="demo-mutiple-name"
                    value={productSupplierId}
                    required
                    onChange={(event) => {
                      setProductSupplierId(event.target.value);
                    }}
                    style={{ width: "100%" }}
                    input={<Input />}
                  >
                    {productSuppliers.map((productSupplier) => (
                      <MenuItem
                        key={productSupplier.id}
                        value={productSupplier.id}
                      >
                        {productSupplier.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid>
              <Box mt={3} style={{ float: "right" }}>
                <Button
                  onClick={() => {
                    setIsModalFormOpen(false);
                  }}
                  color="primary"
                >
                  Cancelar
                </Button>
                <Button color="primary" type="submit">
                  Confirmar
                </Button>
              </Box>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  };

  const renderStockMovimentationForm = () => {
    return (
      <div>
        <Dialog
          open={isModalFormOpen}
          onClose={() => {
            setIsModalFormOpen(false);
          }}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Cadastro de movimentações</DialogTitle>
          <DialogContent>
            <form onSubmit={createStockMovimentation}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="sname"
                    name="supplierName"
                    variant="outlined"
                    required
                    fullWidth
                    id="stockQuantity"
                    label="Quantidade"
                    autoFocus
                    type="number"
                    onChange={(e) => setStockMovimentationQuantity(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel>Tipo</InputLabel>
                  <Select
                    labelId="demo-mutiple-name-label"
                    id="demo-mutiple-name"
                    value={stockMovimentationType}
                    required
                    onChange={(event) => {
                      setStockMovimentationType(event.target.value);
                    }}
                    style={{ width: "100%" }}
                    input={<Input />}
                  >
                      <MenuItem
                        value="Entrada"
                      >
                        Entrada
                      </MenuItem>
                      <MenuItem
                        value="Saída"
                      >
                        Saída
                      </MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel>Produto</InputLabel>
                  <Select
                    labelId="demo-mutiple-name-label"
                    id="demo-mutiple-name"
                    value={stockMovimentationProductId}
                    required
                    onChange={(event) => {
                      setStockMovimentationProductId(event.target.value);
                    }}
                    style={{ width: "100%" }}
                    input={<Input />}
                  >
                    {productStockMovimentation.map((product) => (
                      <MenuItem
                        key={product.id}
                        value={product.id}
                      >
                        {product.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    style={{ width: "100%" }}
                    placeholder=""
                    multiline
                    rows={2}
                    rowsMax={4}
                    label="Descrição"
                    onChange={(e) => setStockMovimentationDescription(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Box mt={3} style={{ float: "right" }}>
                <Button
                  onClick={() => {
                    setIsModalFormOpen(false);
                  }}
                  color="primary"
                >
                  Cancelar
                </Button>
                <Button color="primary" type="submit">
                  Confirmar
                </Button>
              </Box>
            </form>
          </DialogContent>
          {/* <DialogActions>
            </DialogActions> */}
        </Dialog>
      </div>
    );
  };

  const constRenderFormModal = () => {
    switch (screenLabel) {
      case "Home":
        return;
      case "Produtos":
        return renderProductForm();
      case "Fornecedores":
        return renderSupplierForm();
      case "Movimentação":
        return renderStockMovimentationForm();
      default:
        break;
    }
  };

  const renderAddElement = () => {
    if (screenLabel === "Home") {
      return;
    } else {
      return (
        <div
          style={{
            position: "fixed",
            right: "0",
            bottom: "0",
            marginRight: "50px",
            marginBottom: "50px",
          }}
        >
          <Fab
            color="primary"
            onClick={() => setIsModalFormOpen(true)}
            aria-label="add"
          >
            <AddIcon />
          </Fab>
        </div>
      );
    }
  };

  const createSupplier = (event) => {
    event.preventDefault();
    UserService.createSupplier({
      email: supplierEmail,
      address: supplierAddress,
      name: supplierName,
      phone: supplierPhone,
    })
      .then((response) => {
        toast.success(response.data);
        setIsModalFormOpen(false);
        getSuppliers();
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

  const createProduct = (event) => {
    event.preventDefault();
    UserService.createProduct({
      name: productName,
      SKU: productSKU,
      price: productPrice,
      supplierId: productSupplierId,
      productImage: productImage
    })
      .then((response) => {
        toast.success(response.data);
        setIsModalFormOpen(false);
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

  const createStockMovimentation = (event) => {
    event.preventDefault();
    UserService.createStockHistory({
      productId: stockMovimentationProductId,
      description: stockMovimentationDescription,
      type: stockMovimentationType,
      quantity: stockMovimentationQuantity,
    })
      .then((response) => {
        toast.success(response.data);
        setIsModalFormOpen(false);
        getStockMovimentation();
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

  const getSuppliers = () => {
    setSuppliers([]);
    UserService.getSuppliers().then((response) => {
      setSuppliers(response.data);
    });
  };

  const getProducts = () => {
    setProductItems([]);
    UserService.getProducts().then((response) => {
      setProductItems(response.data);
    });
  };

  const getProductInfos = () => {
    setProductInfos([]);
    UserService.getProductInfos().then((response) => {
      if(response.data == null) {
        setProductInfos([]);
      }
      else if(response.data.length <= 0) {
        setProductInfos([]);
      }
      else {
        setProductInfos(response.data);
      }
    });
  };

  const getStockMovimentation = () => {
    setStockMovimentation([]);
    UserService.getStockHistory().then((response) => {
      console.log(response.data);
      setStockMovimentation(response.data);
    });
  };

  const getProductsStockMovimentation = () => {
    setProductStockMovimentation([]);
    UserService.getProducts().then((response) => {
      setProductStockMovimentation(response.data);
    });
  };

  const getProductSuppliers = () => {
    setSuppliers([]);
    UserService.getSuppliers().then((response) => {
      setProductSuppliers(response.data);
    });
  };

  return (
    <div className={classes.root}>
      <Navbar
        isLogged={isLogged}
        user={user}
        onLogin={() => {
          setIsLogged(true);
          getUserFromStorage();
        }}
        onLogout={() => {
          setIsLogged(false);
        }}
        onChangeScreen={(screen) => {
          setScreenLabel(screen);
        }}
      />
      <Container maxWidth="lg">{renderContent()}</Container>
      {renderAddElement()}
      {constRenderFormModal()}
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
    </div>
  );
}
