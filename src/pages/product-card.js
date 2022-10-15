import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});


export default function ProductCard(props) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          image={props.product?.productImage != null ? props.product?.productImage: 'https://www.flipstyle.store/assets/product-image-default-c27c976d2bb6d3eabd88fd9e10f0d4d6e7361026469ee151c0b6f0ad73e212b6.jpg'}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.product?.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Quantidade: {props.product?.quantity}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Preço: R$ {props.product?.price}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Código SKU: {props.product?.SKU}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}