import React from "react";
import {Container} from "@material-ui/core";
import { DataGrid } from '@mui/x-data-grid';
import {useSelector } from "react-redux";

const Table = (props) => {
    const shipments = useSelector(state => state.shipments.shipments)
    return (
        <Container fixed>
        <div style={{ height: 800, width: '100%', marginTop: '8%'}}>
          <DataGrid
            rows={shipments}
            columns={props.columns}
            components={{ColumnResizeIcon: () => null}}
          />
        </div>
        </Container>
    )
}

export default Table;