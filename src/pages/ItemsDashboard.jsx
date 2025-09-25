import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
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
import { getItems, createItem, updateItem, deleteItem } from "../api/items";
import { useSelector } from "react-redux";

const ItemsDashboard = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    itemName: "",
    itemDescription: "",
    itemCategory: "",
  });

  const { role } = useSelector((state) => state.auth);
  const currentUser = localStorage.getItem("username") || "system";

  const fetchItems = async () => {
    try {
      const res = await getItems();
      setItems(res.data);
    } catch (err) {
      console.error("Failed to fetch items", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleOpenDialog = (item = null) => {
    setEditingItem(item);
    setFormData(
      item
        ? {
            itemName: item.itemName,
            itemDescription: item.itemDescription,
            itemCategory: item.itemCategory,
          }
        : { itemName: "", itemDescription: "", itemCategory: "" }
    );
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingItem(null);
    setFormData({ itemName: "", itemDescription: "", itemCategory: "" });
  };

  const handleSave = async () => {
    try {
      if (editingItem) {
        await updateItem({
          itemId: editingItem.itemId,
          itemName: formData.itemName,
          itemDescription: formData.itemDescription,
          itemCategory: formData.itemCategory,
          updatedBy: currentUser,
        });
      } else {
        await createItem({
          itemName: formData.itemName,
          itemDescription: formData.itemDescription,
          itemCategory: formData.itemCategory,
          createdBy: currentUser,
        });
      }
      await fetchItems();
      handleCloseDialog();
    } catch (err) {
      console.error("Failed to save item", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
      await fetchItems();
    } catch (err) {
      console.error("Failed to delete item", err);
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
          Items Dashboard
        </Typography>

        {role === "Admin" && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenDialog()}
            sx={{ mb: 3 }}
          >
            + Create Item
          </Button>
        )}

        <Grid container spacing={3}>
          {items.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.itemId}>
              <Paper sx={{ p: 3, borderRadius: 3 }}>
                <Typography variant="h6" fontWeight="bold">
                  {item.itemName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.itemDescription}
                </Typography>
                <Typography variant="subtitle1" sx={{ mt: 1 }}>
                  Category: {item.itemCategory}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                >
                  By: {item.createdBy}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                  sx={{ mb: 1 }}
                >
                  Created:{" "}
                  {item.createdDate
                    ? new Date(item.createdDate).toLocaleString()
                    : "—"}
                </Typography>

                {role === "Admin" && (
                  <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleOpenDialog(item)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(item.itemId)}
                    >
                      Delete
                    </Button>
                  </Box>
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {editingItem ? "Edit Item" : "Create Item"}
        </DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <TextField
            label="Name"
            value={formData.itemName}
            onChange={(e) =>
              setFormData({ ...formData, itemName: e.target.value })
            }
            fullWidth
          />
          <TextField
            label="Description"
            value={formData.itemDescription}
            onChange={(e) =>
              setFormData({ ...formData, itemDescription: e.target.value })
            }
            fullWidth
          />
          <TextField
            label="Category"
            value={formData.itemCategory}
            onChange={(e) =>
              setFormData({ ...formData, itemCategory: e.target.value })
            }
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

export default ItemsDashboard;
