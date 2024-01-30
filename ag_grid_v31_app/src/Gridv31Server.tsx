import React, { useCallback, useMemo, useState } from 'react';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-quartz.css';
import { ColDef, GridReadyEvent, IServerSideDatasource, ModuleRegistry } from '@ag-grid-community/core';
import { ServerSideRowModelModule } from '@ag-grid-enterprise/server-side-row-model';
import axios from 'axios';

// Register the required feature module with the grid
ModuleRegistry.registerModules([ServerSideRowModelModule]);

const createServerSideDatasource: (server: any) => IServerSideDatasource = (server: any) => {
    return {
        getRows: async (params) => {
            console.log('[Datasource] - rows requested by grid: ', params.request);
            const response = await server.getData(params.request);
            // Simulating real server call with a 500ms delay
            setTimeout(() => {
                if (response.success) {
                    params.success({ rowData: response.rows });
                } else {
                    params.fail();
                }
            }, 500);
        },
    };
};

function createFakeServer() {
    return {
        getData: async () => {
            try {
                const response = await axios.get('https://randomuser.me/api/?inc=gender,name,nat,location,phone,email&results=3000');
                return {
                    success: true,
                    rows: response.data.results,
                };
            } catch (error) {
                console.error("Error fetching random user data:", error);
                return { success: false };
            }
        },
    };
}

const Gridv31Server: React.FC = () => {
    const gridStyle = useMemo(() => ({ height: '870px', width: '1400px' }), []);

    const [columnDefs] = useState<ColDef[]>([
        { field: 'name.title', headerName: 'Title', sortable: false },
        { field: 'name.first', headerName: 'First Name', sortable: false },
        { field: 'name.last', headerName: 'Last Name', sortable: false },
        { field: 'gender', sortable: false },
        { field: 'email', sortable: false },
        { field: 'phone', sortable: false },
        { field: 'nat', headerName: 'Nationality', sortable: false },
    ]);

    const defaultColDef = useMemo<ColDef>(() => {
        return {
            sortable: true,
            resizable: true,
        };
    }, []);

    const onGridReady = useCallback((params: GridReadyEvent) => {
        const fakeServer = createFakeServer();
        const datasource = createServerSideDatasource(fakeServer);
        params.api.setServerSideDatasource(datasource);
    }, []);

    return (
        <div style={gridStyle} className="ag-theme-quartz">
            <AgGridReact
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                rowModelType={'serverSide'}
                onGridReady={onGridReady}
            />
        </div>
    );
};

export default Gridv31Server;