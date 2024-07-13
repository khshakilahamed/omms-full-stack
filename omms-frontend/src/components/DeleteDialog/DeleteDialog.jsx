/* eslint-disable react/prop-types */
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "../ui/dialog";

const DeleteDialog = ({
  isDialogOpen,
  setIsDialogOpen,
  handleCloseDialog,
  handleDeleteConfirm,
  title = "Confirm Deletion",
  description = "Are you sure you want to delete this item? This action cannot be undone.",
}) => {
  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}
    >
      {/* <DialogOverlay /> */}
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
        <DialogFooter>
          <DialogClose>
            <Button onClick={handleCloseDialog} type="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={handleDeleteConfirm}
            className="bg-red-500 text-white hover:bg-red-600"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
