import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import { getAllStock, createStock, updateStockQuantity, deleteStock } from "../../api/stock";
import { useSelector } from "react-redux";

const StockDashboard = () => {
  const [stockList, setStockList] = useState([]);
  const [loading, setLoading] = useState(true);
    const [editingStock, setEditingStock] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [quantity, setQuantity] = useState(0);

  const { role } = useSelector((state) => state.auth);
  const currentUser = localStorage.getItem("username") || "system";

  const fetchStock = async () => {
    try {
      const res = await getAllStock();
      setStockList(res.data.data);
    } catch (err) {
      console.error("Failed to fetch stock", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStock();
  }, []);

  const handleOpenDialog = (stock = null) => {
    setQuantity(stock ? stock.quantity : 0);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setQuantity(0);
  };

  const handleSave = async () => {
    try {
      await updateStockQuantity(editingStock.stock_id, quantity);
      await fetchStock();
      handleCloseDialog();
    } catch (err) {
      console.error("Failed to save stock", err);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", background: "#f5f5f5" }}>
      <NavBar />
      <Box sx={{ px: 4, py: 6 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Stock Dashboard
        </Typography>

        <Grid container spacing={3}>
          {stockList.map((stock) => (
            <Grid item xs={12} sm={6} md={4} key={stock.stock_id}>
              <Paper sx={{ p: 3, borderRadius: 3 }}>
                <Typography variant="h6" fontWeight="bold">
                  Item ID: {stock.item_id}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Location: {stock.warehouse_location}
                </Typography>
                <Typography variant="subtitle1" sx={{ mt: 1 }}>
                  Quantity: {stock.quantity}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                >
                  Created: {stock.created_date ? new Date(stock.created_date).toLocaleString() : "—"}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                  sx={{ mb: 1 }}
                >
                  Updated: {stock.updated_date ? new Date(stock.updated_date).toLocaleString() : "—"}
                </Typography>

                {role === "Admin" && (
                  <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => {
                        setEditingStock(stock);
                        handleOpenDialog(stock)
                      }}
                    >
                      Edit Quantity
                    </Button>

                  </Box>
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>"Edit Quantity"</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StockDashboard;
