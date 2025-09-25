import React, { useEffect } from "react";
import { getAllOrders } from "../../api/order";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "../../components/NavBar";
import {
  Box,
  CircularProgress,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Collapse,
  IconButton,
} from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";

const OrderList = () => {
  const [orders, setOrders] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [openIds, setOpenIds] = React.useState({}); // Track expanded orders

  const fetchOrders = async () => {
    getAllOrders()
      .then((res) => {
        setOrders(res.data.data);
      })
      .catch((err) => {
        console.error("Failed to fetch orders", err);
        toast.error(err ? err : "Failed to fetch orders");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleToggle = (id) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <NavBar />
      <ToastContainer position="top-right" />

      {orders.map((order) => (
        <Card key={order.id} sx={{ mb: 3 }}>
          <CardHeader
            title={`Order #${order.id}`}
            subheader={`Customer: ${order.customerName} | Date: ${new Date(
              order.orderDate
            ).toLocaleString()} | Total: $${order.totalAmount}`}
            action={
              order.orderItems.length > 0 && (
                <IconButton onClick={() => handleToggle(order.id)}>
                  {openIds[order.id] ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              )
            }
          />
          <Collapse in={openIds[order.id]} timeout="auto" unmountOnExit>
            <CardContent>
              {order.orderItems.length > 0 ? (
                <Table component={Paper}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Item ID</TableCell>
                      <TableCell>Product</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Unit Price</TableCell>
                      <TableCell>Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {order.orderItems.map((item) => (
                      <TableRow key={item.itemId}>
                        <TableCell>{item.itemId}</TableCell>
                        <TableCell>{item.productName}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>${item.unitPrice}</TableCell>
                        <TableCell>${item.quantity * item.unitPrice}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No items in this order.
                </Typography>
              )}
            </CardContent>
          </Collapse>
        </Card>
      ))}
    </Box>
  );
};

export default OrderList;
