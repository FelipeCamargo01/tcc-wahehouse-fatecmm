import { useState, useEffect } from "react";
import Navbar from "./navbar";

import { makeStyles } from "@material-ui/core/styles";

import { toast, ToastContainer } from "react-toastify";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { Container, Typography, TextField } from "@material-ui/core";

import UserService from "../services/user.service";

import MaterialTable, { Column } from "@material-table/core";
//css imports
require("./css/forms.css");

const useStyles = makeStyles({
  formContainer: {
    paddingLeft: "7vw",
    paddingRight: "7vw",
    paddingTop: "2vh",
  },
});

export default function Suppliers() {
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
        toast.success("Forneceor deletado com sucesso");
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
    return (
      <Container maxWidth="md" style={{ paddingTop: "5rem" }}>
        <Typography
          marginBottom={"3rem"}
          textAlign="center"
          component="h1"
          variant="h5">
          Cadastrar Fornecedor
        </Typography>

        <form onSubmit={createSupplier}>
          <Grid
            container
            spacing={2}
            xs={12}
            marginBottom={"2rem"}
            alignItems="center">
            <Grid item xs={4}>
              <TextField
                variant="outlined"
                label="CNPJ"
                fullWidth
                size="small"
                required
                onChange={(e) => setSupplierCNPJ(e.target.value)}></TextField>
            </Grid>
            <Grid item xs={8}>
              <TextField
                variant="outlined"
                label="Nome"
                fullWidth
                size="small"
                required
                onChange={(e) => setSupplierName(e.target.value)}></TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                label="Razão Social"
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
                fullWidth
                size="small"
                required
                onChange={(e) =>
                  setSupplierAddress(e.target.value)
                }></TextField>
            </Grid>
            <Grid item xs={3}>
              <TextField
                variant="outlined"
                label="CEP"
                type="number"
                fullWidth
                size="small"
                required
                onChange={(e) => setSupplierCEP(e.target.value)}></TextField>
            </Grid>

            <Grid item xs={3}>
              <TextField
                variant="outlined"
                label="Nº"
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
                type="email"
                fullWidth
                size="small"
                required
                onChange={(e) =>
                  setSupplierAddress(e.target.value)
                }></TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                label="Telefone"
                type="tel"
                fullWidth
                size="small"
                required
                onChange={(e) => setSupplierPhone(e.target.value)}></TextField>
            </Grid>
          </Grid>
          <Grid container spacing={2} direction="row" justifyContent="flex-end">
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
  };

  const renderSuppliersData = () => {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Box className={classes.formContainer}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <div style={{ height: 700, width: "100%" }}>
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
                    }}
                  />
                </div>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    );
  };

  return (
    <Box style={{ display: "flex", flexDirection: "row" }}>
      <Navbar />
      <Box style={{ display: "flex", flexDirection: "column" }}>
        {renderSuppliersForm()}
        {renderSuppliersData()}
      </Box>
    </Box>

    //   {/* <Grid id="item-form" className={classes.formContainer} container>
    //       <Grid item xs={12}>
    //         <Box className={classes.formContainer}>
    //           <h2>Criar fornecedor</h2>
    //           <form onSubmit={createSupplier}>
    //             <Grid container spacing={3}>
    //               <Grid item xs={6}>
    //                 <input
    //                   type="text"
    //                   placeholder="NOME"
    //                   onChange={(e) => setSupplierName(e.target.value)}
    //                   required
    //                 />
    //               </Grid>
    //               <Grid item xs={6}>
    //                 <input
    //                   type="email"
    //                   placeholder="E-MAIL"
    //                   onChange={(e) => setSupplierEmail(e.target.value)}
    //                   required
    //                 />
    //               </Grid>
    //             </Grid>
    //             <Grid container spacing={3}>
    //               <Grid item xs={5}>
    //                 <input
    //                   type="text"
    //                   placeholder="TELEFONE"
    //                   onChange={(e) => setSupplierPhone(e.target.value)}
    //                   required
    //                 />
    //               </Grid>
    //               <Grid item xs={7}>
    //                 <input
    //                   type="text"
    //                   placeholder="ENDEREÇO"
    //                   onChange={(e) => setSupplierAddress(e.target.value)}
    //                   required
    //                 />
    //               </Grid>
    //             </Grid>
    //             <Grid container spacing={3}>
    //               <Grid item xs={6}>
    //                 <input
    //                   type="text"
    //                   placeholder="CNPJ"
    //                   onChange={(e) => setSupplierCNPJ(e.target.value)}
    //                 />
    //               </Grid>
    //               <Grid item xs={6}>
    //                 <input
    //                   type="text"
    //                   placeholder="NOME FANTASIA"
    //                   onChange={(e) => setSupplierFantasyName(e.target.value)}
    //                 />
    //               </Grid>
    //             </Grid>
    //             <Grid container spacing={3}>
    //               <Grid item xs={6}>
    //                 <input
    //                   type="text"
    //                   placeholder="RAZÃO SOCIAL"
    //                   onChange={(e) => setSupplierCorporateName(e.target.value)}
    //                 />
    //               </Grid>
    //               <Grid item xs={3}>
    //                 <input
    //                   type="text"
    //                   placeholder="CEP"
    //                   onChange={(e) => setSupplierCEP(e.target.value)}
    //                 />
    //               </Grid>
    //               <Grid item xs={3}>
    //                 <input
    //                   type="number"
    //                   placeholder="NÚMERO"
    //                   onChange={(e) => setSupplierAddressNumber(e.target.value)}
    //                 />
    //               </Grid>
    //             </Grid>
    //             <Grid container spacing={3}>
    //               <Grid item xs={12}>
    //                 <Box mt={3} style={{ float: "right" }}>
    //                   <Button
    //                     onClick={() => {
    //                       // setIsModalFormOpen(false);
    //                     }}
    //                     variant="outlined"
    //                     color="primary"
    //                     type="reset">
    //                     Limpar
    //                   </Button>
    //                   <Button
    //                     style={{ marginLeft: "15px" }}
    //                     color="secondary"
    //                     variant="contained"
    //                     type="submit">
    //                     Salvar
    //                   </Button>
    //                 </Box>
    //               </Grid>
    //             </Grid>
    //           </form>
    //         </Box>
    //       </Grid>
    //     </Grid> */}
  );
}
