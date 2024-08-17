"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, DollarSign, DollarSignIcon, Edit, MoreHorizontal, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Client, Loan } from "@prisma/client"
import { ColumnDefWithActions } from "@/lib/types"
import { useRouter } from "next/navigation"
import { DrawerLoan } from "../loan/add-loan-drawer"
import { onDeleteLoan } from "@/actions/loans"


const handleDelteLoan = async (id: string) => {

  await onDeleteLoan(id)

}

const CellActions = ({ row } : {row:any}) => {
  const router = useRouter();


  const handleRouteAddPaymentClick = (e: any) => {

    e.preventDefault()

    router.push(`/payment/${row.original.id}`)
  }

  const handleEditLoanClick = (e: any) => {
    e.preventDefault()

    router.push(`/editLoan/${row.original.id}`)
  } 

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
        <DropdownMenuSeparator className="border border-slate-700" />
        <DropdownMenuItem
          onClick={handleEditLoanClick}
          className="flex flex-row gap-2 hover:cursor-pointer"
        >
          <Edit /> <span>Editar</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(e) => {e.preventDefault(),handleDelteLoan(row.original.id)}} 
          className="flex flex-row gap-2 hover:cursor-pointer"
        >
          <Trash color="red" /> <span className="text-red-500">Eliminar</span>
        </DropdownMenuItem>
        {/* <DropdownMenuSeparator className="border border-slate-700" />
        <DropdownMenuItem
          className="flex flex-row gap-2 hover:cursor-pointer font-medium"
          onClick={handleRouteAddPaymentClick}
        >
          <DollarSignIcon /> Agregar Pago
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const columns: ColumnDefWithActions<Loan>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "client",
    //header: "Cliente",
    header: ({column}) => {
        return(
          <Button
            variant={"ghost"}
            onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
          >
            Cliente
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
    },
    cell: ({ row }) => {

      //const client = row.original.clientId
      const client = row.getValue("client") as { name: string; lastName: string };
      // const clientdValue = row.getValue(`${row.original.clientId}`) as string;
      // const splitValue = clientdValue.split('-')[0];
      
      
      return(
      
      <div className="capitalize">{`${client.name}`}</div>
    )},
    filterFn: (row,columnId,filterValue) => {
      const client = row.getValue(columnId) as {name: string; lasName: string}

      return(
        client.name.toLowerCase().includes(filterValue.toLowerCase())
      )
    }
  },
  {
    accessorKey: "startDate",
    header: "Fecha Inicio",
    cell: ({ row }) => (
      <div className="capitalize">{new Date(row.getValue("startDate")).toLocaleDateString()}</div>
    ),
  },
  {
    accessorKey: "endDate",
    header: "Fecha Final",
    cell: ({ row }) => (
      <div className="capitalize">{new Date(row.getValue("endDate")).toLocaleDateString()}</div>
    ),
  },
  {
    accessorKey: "totalAmount",
    header: () => <div className="text-start">Préstamo</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalAmount"))

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)

      return <div className="text-start font-medium">{formatted}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: CellActions
  }
]

export function DataTableLoans({data} : {data: Loan[]}) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState:{
      pagination:{
        pageSize: 5
      }
    }
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrar nombre..."
          value={(table.getColumn("client")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("client")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columnas <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No hay resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  )
}
