/** @format */

import {
  Card,
  Typography,
  Box,
  Button,
  CardActionArea,
  CardContent,
  Divider,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useState } from "react";
interface OrderTotalProps {
  subTotal?: string;
  standardShipping?: string;
  estTax?: string;
  orderTotal?: string;
  name: string;
  cartTotal: string;
  fontWeight?: "bold" | "regular";
  boxStyle: Object;
  style2: Object;
  standardShippingAmount: string;
  estTaxamt: string;
  estOrderTotal: string;
  checkOutButtonStyle: object;
  headerStyle: object;
  estStyle: object;
  backButtonStyle: object;
  shippingButtonStyle: object;
  type: string;
}

const OrderSummary = (props: OrderTotalProps) => {
  const {
    subTotal,
    standardShipping,
    cartTotal,
    estTax,
    orderTotal,
    name,
    boxStyle,
    style2,
    standardShippingAmount,
    estTaxamt,
    estOrderTotal,
    checkOutButtonStyle,
    headerStyle,
    estStyle,
    shippingButtonStyle,
    backButtonStyle,
    type,
  } = props;
  return (
    <>
      <Card sx={{ bgcolor: "#F7F7F7", width: "428px", height: "391px" }}>
        <CardActionArea>
          <CardContent>
            <Typography sx={headerStyle}>{name}</Typography>
          </CardContent>
          <Divider />
          <CardContent>
            <Box sx={boxStyle}>
              <Typography>{cartTotal}</Typography>
              <Typography> {subTotal}</Typography>
            </Box>
            <br />
            <Box sx={boxStyle}>
              <Typography>{standardShipping}</Typography>
              <Typography>{standardShippingAmount}</Typography>
            </Box>
            <br />
            <Box sx={boxStyle}>
              <Typography>
                {estTax} <InfoIcon sx={{ width: "11px", height: "11px" }} />{" "}
              </Typography>
              <Typography>{estTaxamt}</Typography>
            </Box>
            <br />
            <Divider variant="middle" />

            <br />
            <Box sx={estStyle}>
              <Typography sx={{ fontWeight: "Bold" }}>
                {estOrderTotal}
              </Typography>
              <Typography sx={{ fontWeight: "Bold" }}>{orderTotal}</Typography>
            </Box>
          </CardContent>
          <CardContent>
            <Box textAlign="center">
              {type === "orderSummary" && (
                <>
                  <Button variant="contained" sx={checkOutButtonStyle}>
                    Go to Checkout
                  </Button>
                </>
              )}
              {type === "orderShipping" && (
                <>
                  <Button variant="contained" sx={shippingButtonStyle} disabled>
                    Go to Shipping
                  </Button>
                  <Button variant="contained" sx={backButtonStyle}>
                    Go Back
                  </Button>
                </>
              )}
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};
export default OrderSummary;
