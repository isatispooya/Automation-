import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useGetShareholders } from "../hooks";
import { ShareholdersTypes } from "../types";
import { CustomDataGridToolbar, localeText } from "../../../utils";
import { tableStyles } from "../../../ui";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import ModalLayout from "../../../layouts/ModalLayout";
import { EditShareholdForm } from ".";
import useDelShareholders from "../hooks/useDelShareholders";

const ShareholdTable: React.FC = () => {
  const { data: shareholders } = useGetShareholders();
  const [selectedRow, setSelectedRow] = useState<ShareholdersTypes | null>(
    null
  );
  const { mutate: deleteShareholder } = useDelShareholders();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "company", headerName: "شرکت", width: 100 },
    { field: "name", headerName: "نام", width: 100 },
    { field: "created_at", headerName: "تاریخ ایجاد", width: 100 },
    { field: "number_of_shares", headerName: "تعداد سهام", width: 100 },
    { field: "updated_at", headerName: "تاریخ بروزرسانی", width: 100 },
  ];
  const handleEdit = () => {
    if (!selectedRow) {
      toast.error("لطفا یک شرکت را انتخاب کنید");
      return;
    }
    setIsEditOpen(true);
  };

  const handleDelete = () => {
    if (!selectedRow) {
      toast.error("لطفا یک شرکت را انتخاب کنید");
      return;
    }
    deleteShareholder(selectedRow.id);
    setIsDeleteOpen(true);
  };

  const shareholdersData = shareholders?.results || [];

  return (
    <>
      <Toaster />
      <div className="w-full bg-gray-100 shadow-md rounded-2xl relative overflow-hidden">
        <DataGrid
          columns={columns}
          rows={shareholdersData}
          localeText={localeText}
          onRowClick={(params) => setSelectedRow(params.row)}
          onRowSelectionModelChange={(newSelectionModel) => {
            if (newSelectionModel.length > 0) {
              const selectedId = newSelectionModel[0];
              const selectedRow = shareholdersData.find(
                (row: ShareholdersTypes) => row.id === selectedId
              );
              if (selectedRow) {
                setSelectedRow(selectedRow);
              }
            } else {
              setSelectedRow(null);
            }
          }}
          sx={tableStyles}
          checkboxSelection
          rowSelectionModel={selectedRow ? [selectedRow.id] : []}
          disableMultipleRowSelection
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10, page: 0 },
            },
          }}
          pageSizeOptions={[10]}
          disableColumnMenu
          filterMode="client"
          slots={{
            toolbar: (props) => (
              <CustomDataGridToolbar
                {...props}
                data={shareholdersData}
                fileName="گزارش-پرداخت"
                showExcelExport={true}
                actions={{
                  edit: {
                    label: "ویرایش",
                    show: true,
                    onClick: handleEdit,
                    icon: <FaEdit />,
                  },
                  delete: {
                    label: "حذف",
                    show: true,
                    onClick: handleDelete,
                    icon: <FaTrash />,
                  },
                }}
              />
            ),
          }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
        />
      </div>
      <ModalLayout open={isEditOpen} onClose={() => setIsEditOpen(false)}>
        <EditShareholdForm
          data={selectedRow}
          onClose={() => setIsEditOpen(false)}
        />
      </ModalLayout>
    </>
  );
};

export default ShareholdTable;