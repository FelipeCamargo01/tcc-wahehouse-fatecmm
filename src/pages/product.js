import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import DeleteIcon from "@material-ui/icons/Delete";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import UserService from "../services/user.service";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default function Product(props) {
  const classes = useStyles();
  const [isConfirmationDeleteModalOpen, setIsConfirmationDeleteModalOpen] =
    useState(false);

  const onDeleteProduct = () => {
    console.log(props.supplier);
    UserService.deleteProduct({ productId: props.product.id })
      .then((response) => {
        toast.success(response.data);
        props.onDelete();
        setIsConfirmationDeleteModalOpen(false);
      })
      .catch((error) => {
        toast.error(error.data?.data);
      });
  };

  const confirmationDeleteModal = () => {
    return (
      <div>
        <Dialog
          open={isConfirmationDeleteModalOpen}
          onClose={() => {
            setIsConfirmationDeleteModalOpen(false);
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Apagar produto?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Deseja apagar este produto ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setIsConfirmationDeleteModalOpen(false);
              }}
              color="primary"
            >
              Cancelar
            </Button>
            <Button onClick={onDeleteProduct} color="primary" autoFocus>
              Deletar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>
            {props.product?.name}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                autoComplete="sname"
                name="productName"
                variant="outlined"
                required
                fullWidth
                id="productName"
                label="Nome do produto"
                autoFocus
                value={props.product?.name}
                disabled={true}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="sname"
                name="supplierProduct"
                variant="outlined"
                required
                fullWidth
                id="supplierProduct"
                label="Fornecedor"
                autoFocus
                value={props.product['supplier.name']}
                disabled={true}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="supplierEmail"
                label="SKU do produto"
                name="supplierEmail"
                value={props.product?.SKU}
                disabled={true}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="supplierPhone"
                label="Link da imagem do produto"
                id="supplierPhone"
                value={props.product?.productImage}
                disabled={true}
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
                value={props.product?.price}
                disabled={true}
              />
            </Grid>
            <Grid item xs={12}>
              <Box style={{ float: "right" }}>
                <DeleteIcon
                  onClick={() => {
                    setIsConfirmationDeleteModalOpen(true);
                  }}
                  style={{ color: "red", cursor: "pointer" }}
                />
              </Box>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      {confirmationDeleteModal()}
    </div>
  );
}
