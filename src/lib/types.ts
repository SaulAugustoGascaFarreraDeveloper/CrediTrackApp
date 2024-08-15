import {ColumnDef} from "@tanstack/react-table"
import React from "react"

export type ColumnDefWithActions<T> =  ColumnDef<T> & {
    actions?: (row: T) => React.ReactNode
}