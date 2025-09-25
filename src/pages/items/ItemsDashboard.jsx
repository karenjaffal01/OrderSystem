import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import { getItems, createItem, updateItem, deleteItem } from "../../api/items";
import { useSelector } from "react-redux";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const ItemsDashboard = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const { role } = useSelector((state) => state.auth);
  const currentUser = localStorage.getItem("username") || "system";

  const itemSchema = Yup.object().shape({
    itemName: Yup.string()
      .required("Item name is required")
      .min(3, "Item name must be at least 3 characters"),
    itemDescription: Yup.string()
      .required("Description is required")
      .max(200, "Description cannot exceed 200 characters"),
    itemCategory: Yup.string().required("Category is required"),
  });

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(itemSchema),
    defaultValues: {
      itemName: "",
      itemDescription: "",
      itemCategory: "",
    },
  });

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
    reset(
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
    reset({ itemName: "", itemDescription: "", itemCategory: "" });
  };

  const handleSave = async (data) => {
    try {
      if (editingItem) {
        await updateItem({
          itemId: editingItem.itemId,
          ...data,
          updatedBy: currentUser,
        });
        toast.success("Item updated successfully!");
      } else {
        await createItem({
          ...data,
          createdBy: currentUser,
        });
        toast.success("Item created successfully!");
      }
      await fetchItems();
      handleCloseDialog();
    } catch (err) {
      console.error("Failed to save item", err);
      toast.error("Failed to save item");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
      toast.success("Item deleted successfully!");
      await fetchItems();
    } catch (err) {
      console.error("Failed to delete item", err);
      toast.error("Failed to delete item");
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
      <ToastContainer position="top-right" />
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
                      onClick={() => {
                        setItemToDelete(item);
                        setConfirmDeleteOpen(true);
                      }}
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

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editingItem ? "Edit Item" : "Create Item"}</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <Controller
            name="itemName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Name"
                fullWidth
                error={!!errors.itemName}
                helperText={errors.itemName?.message}
              />
            )}
          />
          <Controller
            name="itemDescription"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Description"
                fullWidth
                error={!!errors.itemDescription}
                helperText={errors.itemDescription?.message}
              />
            )}
          />
          <Controller
            name="itemCategory"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Category"
                fullWidth
                error={!!errors.itemCategory}
                helperText={errors.itemCategory?.message}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit(handleSave)}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={confirmDeleteOpen}
        onClose={() => {
          setConfirmDeleteOpen(false);
          setItemToDelete(null);
        }}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{itemToDelete?.itemName}"?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setConfirmDeleteOpen(false);
              setItemToDelete(null);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={async () => {
              if (itemToDelete) {
                await handleDelete(itemToDelete.itemId);
                setConfirmDeleteOpen(false);
                setItemToDelete(null);
              }
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
};

export default ItemsDashboard;
