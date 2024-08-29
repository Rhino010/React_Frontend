import { useState } from "react";
import Button from "./Button";
import Modal from "./Modal";
import { server_calls } from "../api/server";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useGetData } from "../custom-hooks/FetchData";
import ContactForm from "./ContactForm";


interface Contact {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  address: string;
}


const showIdColumn = false;

const columns: GridColDef[] = [
  ...(showIdColumn ? [{ field: "id", headerName: "ID", width: 90 }] : []),
  { field: "name", headerName: "Contact Name", flex: 1 },
  { field: "email", headerName: "Email", flex: 1 },
  { field: "phone_number", headerName: "Phone Number", flex: 1 },
  { field: "address", headerName: "Address", flex: 2 },
];

function DataTable() {
  const [open, setOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const { contactData, getData } = useGetData();
  const [selectionModel, setSelectionModel] = useState<string[]>([]);

  const handleOpen = () => {
    if (selectionModel.length > 0) {
      const contact = contactData.find(
        (contact) => contact.id === selectionModel[0]
      );
      setSelectedContact(contact || null);
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteData = () => {
    if (selectionModel.length > 0) {
      server_calls
        .delete(selectionModel[0])
        .then(() => {
          getData();
          console.log(`Deleted item with ID: ${selectionModel[0]}`);
        })
        .catch((error) => console.error("Delete failed:", error));
    } else {
      console.warn("No item selected for deletion");
    }
  };

  const updateData = () => {
    handleOpen();
    console.log(`Selection model: ${selectionModel}`);
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        {selectedContact && (
          <ContactForm id={selectedContact.id} data={selectedContact} />
        )}
      </Modal>

      <div className="flex flex-row">
        <Button
          onClick={() => handleOpen()}
          className="p-2 m-3 bg-slate-300 hover:bg-slate-800 hover:text-white border rounded-sm"
        >
          Create New Contact
        </Button>

        <Button
          onClick={updateData}
          className="p-2 m-3 bg-slate-300 hover:bg-slate-800 hover:text-white border rounded-sm"
        >
          Update
        </Button>
        <Button
          onClick={deleteData}
          className="p-2 m-3 bg-slate-300 hover:bg-slate-800 hover:text-white border rounded-sm"
        >
          Delete
        </Button>
      </div>

      <div
        className={open ? "hidden" : "container mx-10 my-5 flex flex-col"}
        style={{ height: 400, width: "100%" }}
      >
        <h2 className="p-3 bg-slate-300 my-2 rounded">Contacts</h2>
        <DataGrid
          rows={contactData}
          columns={columns}
          checkboxSelection
          pagination
          pageSizeOptions={[5, 10, 20]}
          onRowSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel as string[]);
          }}
        />
      </div>
    </>
  );
}

export default DataTable;
