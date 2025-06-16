import { Link } from "react-router-dom";
import { DataGrid, GridColDef, GridFilterModel, GridRenderCellParams, GridRowsProp, GridToolbar } from "@mui/x-data-grid";
import { Typography, IconButton, Box } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { Results } from "../../../types/CastMembers"

type Props = {
  data: Results | undefined;
  perPage: number;
  isFetching: boolean;
  rowsPerPage?: number[];

  handleOnPageChange: (page: number) => void;
  handleFilterChange: (filterModel: GridFilterModel) => void;
  handleOnPageSizeChange: (perPage: number) => void;
  handleDelete: (id: string) => void;
}

export function CastMembersTable({
  data,
  perPage,
  isFetching,
  rowsPerPage,
  handleOnPageChange,
  handleFilterChange,
  handleOnPageSizeChange,
  handleDelete
}: Props) {
  const componentProps = {
    toolbar: {
      showQuickFilter: true,
      quickFilterProps: { debounceMs: 500 },
    },
  }
  
  const columns: GridColDef[] = [
    { 
      field: 'name',
      headerName: 'Name', 
      flex: 1,
      renderCell: renderNameCell
    },
    { 
      field: 'type', 
      headerName: 'Type', 
      flex: 1,
      renderCell: renderTypeCell
    },
    {
      field: 'id',
      headerName: 'Actions',
      flex: 1,
      renderCell: renderActionsCell
    }
  ];

  function renderNameCell(rowData: GridRenderCellParams) {
    return (
      <Link 
        style={{textDecoration: 'none'}}
        to={`/cast-members/edit/${rowData.id}`}
      >
        <Typography color="primary">
          {rowData.value}
        </Typography>
      </Link>
    )
  }

  function renderTypeCell(row: GridRenderCellParams) {
    return (
      <Typography color="primary">
        {row.value === 1 ? "Director" : "Actor"}
      </Typography>
    )
  }

  function mapDataToGridRows(data: Results) {
    const {data: castMembers} = data;
    return castMembers.map((castMember) => ({
      id: castMember.id,
      name: castMember.name,
      type: castMember.type,
      createdAt: new Date(castMember.created_at).toLocaleDateString("pt-BR"),
    }));
  }

  function renderActionsCell(params: GridRenderCellParams) {
    return (
      <IconButton
        color="secondary"
        onClick={() => handleDelete(params.value)}
        aria-label="delete"
      >
        <DeleteIcon />
      </IconButton>
    )
  }

  const rows: GridRowsProp = data ? mapDataToGridRows(data) : [];
  const rowCount = data ? data.meta.total : 0;

  return (
    <Box sx={{ display: "flex", height: 600 }}>
      <DataGrid 
        rows={rows} 
        pagination={true}
        columns={columns} 
        pageSize={perPage}
        filterMode="server"
        rowCount={rowCount}
        loading={isFetching}
        paginationMode="server"
        checkboxSelection={false}
        disableColumnFilter={true}
        disableColumnSelector={true}
        disableDensitySelector={true}
        disableSelectionOnClick={true}
        rowsPerPageOptions={rowsPerPage}
        components={{ Toolbar: GridToolbar }}
        componentsProps={componentProps}
        onPageChange={handleOnPageChange}
        onFilterModelChange={handleFilterChange}
        onPageSizeChange={handleOnPageSizeChange}
      />
    </Box>
  )
}
