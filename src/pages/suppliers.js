import { useState, useEffect } from "react";
import Navbar from "./navbar";
import { DataGrid, GridColumns, GridRowsProp } from '@mui/x-data-grid';

import { makeStyles } from "@material-ui/core/styles";

import { toast, ToastContainer } from "react-toastify";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

import UserService from "../services/user.service";

//css imports
require('./css/forms.css');

const useStyles = makeStyles({
    root: {
        width: "100%",
        height: "100%",
        backgroundColor: "white",
    },
    formContainer: {
        paddingLeft: "7vw",
        paddingRight: "7vw",
        paddingTop: "2vh",
    }
});

export default function Suppliers(props) {
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
        { field: 'name', headerName: 'Nome', editable: true, flex: 1 },
        { field: 'email', headerName: 'Email', editable: true, flex: 1 },
        { field: 'phone', headerName: 'Telefone', editable: true, flex: 1 },
        { field: 'address', headerName: 'Endereço', editable: true, flex: 1 },
        { field: 'cnpj', headerName: 'CNPJ', editable: true, flex: 1 },
        { field: 'corporateName', headerName: 'Razão Social', editable: true, flex: 1 },
        { field: 'fantasyName', headerName: 'Nome Fantasia', editable: true, flex: 1 },
        { field: 'cep', headerName: 'CEP', editable: true, flex: 1 },
        { field: 'addressNumber', headerName: 'Número', editable: true, flex: 1 },
        { field: 'items', headerName: 'Itens', editable: true, flex: 1 },
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
            addressNumber: supplierAddressNumber
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
                        items: null
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
        UserService.deleteSupplier(id).then(
            (response) => {
                toast.success("Supplier deleted successfully");
                getSuppliers();
            },
            (error) => {
                toast.error(error.response.data.message);
            }
        );
    };

    const updateSupplier = (id) => {
        UserService.updateSupplier(id).then(
            (response) => {
                toast.success("Supplier updated successfully");
                getSuppliers();
            },
            (error) => {
                toast.error(error.response.data.message);
            }
        );
    };

    const renderSuppliersForm = () => {
        return (
            <>
                <Grid id='item-form' className={classes.formContainer} container>
                    <Grid item xs={12}>
                        <Box className={classes.formContainer}>
                            <h2>Criar fornecedor</h2>
                            <form onSubmit={createSupplier}>
                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        <input
                                            type="text"
                                            placeholder="NOME"
                                            onChange={(e) => setSupplierName(e.target.value)}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <input
                                            type="email"
                                            placeholder="E-MAIL"
                                            onChange={(e) => setSupplierEmail(e.target.value)}
                                            required
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={3}>
                                    <Grid item xs={5}>
                                        <input
                                            type="text"
                                            placeholder="TELEFONE"
                                            onChange={(e) => setSupplierPhone(e.target.value)}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={7}>
                                        <input
                                            type="text"
                                            placeholder="ENDEREÇO"
                                            onChange={(e) => setSupplierAddress(e.target.value)}
                                            required
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        <input type="text" placeholder="CNPJ" onChange={(e) => setSupplierCNPJ(e.target.value)} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <input type="text" placeholder="NOME FANTASIA" onChange={(e) => setSupplierFantasyName(e.target.value)} />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        <input type="text" placeholder="RAZÃO SOCIAL" onChange={(e) => setSupplierCorporateName(e.target.value)} />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <input type="text" placeholder="CEP" onChange={(e) => setSupplierCEP(e.target.value)} />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <input type="number" placeholder="NÚMERO" onChange={(e) => setSupplierAddressNumber(e.target.value)} />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
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
                                    </Grid>
                                </Grid>
                            </form>
                        </Box>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Box className={classes.formContainer}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={12}>
                                    <div style={{ height: 300, width: '100%' }}>
                                        <DataGrid editMode="row" columns={suppliersColumns} rows={suppliersData} experimentalFeatures={{ newEditingApi: true }} />
                                    </div>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </>)
    }

    return (
        <div className={classes.root}>
            <Navbar />
            <ToastContainer />
            {renderSuppliersForm()}
        </div>
    );
}