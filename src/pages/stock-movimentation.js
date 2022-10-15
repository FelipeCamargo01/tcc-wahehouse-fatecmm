import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

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
  inputMovimentation: {
      border: '1px solid green'
  },
  outputMovimentation: {
      border: '1px solid red'
  }
}));

export default function StockMovimentation(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion className={ props.stockMovimentation?.type === 'Entrada' ? classes.inputMovimentation: classes.outputMovimentation }>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>
            {props.stockMovimentation['product.name']}
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
                label="Quantidade"
                autoFocus
                value={props.stockMovimentation?.quantity}
                disabled={true}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="stockType"
                id="stockType"
                label="Tipo de movimentação"
                value={props.stockMovimentation?.type}
                disabled={true}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="supplierPhone"
                label="Produto"
                value={props.stockMovimentation['product.name']}
                disabled={true}
              />
            </Grid>
            <Grid item xs={12}>
                  <TextField
                    style={{ width: "100%" }}
                    placeholder=""
                    multiline
                    rows={2}
                    rowsMax={4}
                    label="Descrição"
                    value={props.stockMovimentation?.description}
                    disabled={true}
                  />
                </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
