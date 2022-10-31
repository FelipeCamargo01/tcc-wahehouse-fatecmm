import { useState, useEffect } from "react";
import Navbar from "./navbar";

import { makeStyles } from "@material-ui/core/styles";

import CurrencyInput from 'react-currency-input-field';
import SelectSearch from 'react-select-search';

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
        paddingLeft: "10vw",
        paddingRight: "10vw",
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
                setSupplierItems(response.data);
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
        return (<Grid id='item-form' className={classes.formContainer} container>
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
            <Grid item xs={12} sm={6}>
                <Box className={classes.formContainer}>
                    <h2>Suppliers</h2>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12}>
                            <table className={classes.table}>
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>E-mail</th>
                                        <th>Telefone</th>
                                        <th>Endereço</th>
                                        <th>CNPJ</th>
                                        <th>Razão social</th>
                                        <th>Nome fantasia</th>
                                        <th>CEP</th>
                                        <th>Número</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {supplierItems.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.phone}</td>
                                            <td>{item.address}</td>
                                            <td>{item.cnpj}</td>
                                            <td>{item.corporateName}</td>
                                            <td>{item.fantasyName}</td>
                                            <td>{item.cep}</td>
                                            <td>{item.addressNumber}</td>
                                            <td>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    className={classes.button}
                                                    onClick={() => updateSupplier(item.id)}
                                                >
                                                    Atualizar
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    className={classes.button}
                                                    onClick={() => deleteSupplier(item.id)}
                                                >
                                                    Editar
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </Grid>);
    }

    return (
        <div className={classes.root}>
            <Navbar />
            <ToastContainer />
            {renderSuppliersForm()}
        </div>
    );
}