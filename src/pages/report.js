import {
  Typography,
  Container,
  Box,
  Grid,
  Icon,
  Button,
} from "@material-ui/core";
import MaterialTable from "@material-table/core";
import Navbar from "./navbar";
import { useState, useEffect, useReducer } from "react";

import { makeStyles } from "@material-ui/core/styles";
import LaunchIcon from "@material-ui/icons/Launch";
import * as XLSX from "xlsx/xlsx.mjs";

import UserService from "../services/user.service";

const useStyles = makeStyles({
  formContainer: {
    paddingTop: "2vh",
  },
});

export default function Report() {
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

  const [productSuppliers, setProductSuppliers] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [productsColumns, setProductsColumns] = useState([
    { title: "SKU", field: "sku", editable: false },
    { title: "Nome", field: "name" },
    { title: "Fornecedor", field: "supplier", productSuppliers },
    { title: "Quantidade", field: "quantity" },
    { title: "Preço Unitário", field: "price" },
  ]);

  const classes = useStyles();

  const getProducts = () => {
    let products = [];
    UserService.getProductInfos().then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        products.push({
          name: response.data[i].name,
          sku: response.data[i].SKU,
          price: response.data[i].price,
          supplier: response.data[i]["supplier.fantasyName"],
          quantity: response.data[i].quantity,
        });
      }
      setProductsData(products);
    });
  };

  const getProductSuppliers = () => {
    UserService.getSuppliers().then((response) => {
      setProductSuppliers(response.data);
    });
  };

  const exportExcel = () => {
    const workSheet = XLSX.utils.json_to_sheet(productsData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "product_report");

    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });

    let date = new Date().toLocaleString();
    XLSX.writeFile(workBook, "product_report_" + date + ".xlsx");
  };

  useEffect(() => {
    async function fetchData() {
      await getProductSuppliers();
      await getProducts();
    }
    fetchData();
  }, []);

  const renderReportData = () => {
    if (isLogged) {
      return (
        <Container maxWidth="lg" style={{ paddingTop: "5rem" }}>
          <Grid container>
            <Grid item xs={12}>
              <Box className={classes.formContainer}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <div style={{ height: "100vh" }}>
                      <MaterialTable
                        title="Relatório"
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
                        options={{
                          exportMenu: true,
                          filtering: true,
                          actionsColumnIndex: -1,
                          addRowPosition: "first",
                          columnResizable: true,
                          paging: true,
                          tableLayout: "auto",
                          pageSize: 10,
                        }}
                        actions={[
                          {
                            icon: () => (
                              <Button
                                color="primary"
                                variant="contained"
                                disableElevation
                                startIcon={<LaunchIcon />}>
                                Exportar
                              </Button>
                            ),
                            onClick: () => exportExcel(),
                            isFreeAction: true,
                          },
                        ]}
                      />
                    </div>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
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

  return (
    <Box display="flex" flexDirection="row">
      <Navbar />
      <Container
        maxWidth="lg"
        display="flex"
        flexDirection="column"
        align="center">
        {renderReportData()}
      </Container>
    </Box>
  );
}
