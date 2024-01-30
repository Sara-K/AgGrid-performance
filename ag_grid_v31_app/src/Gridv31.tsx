import { useState } from 'react';
import { AgGridReact } from '@ag-grid-community/react'; // React Grid Logic
import rowData from './populatedData.json';

import { ColDef } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";

const Gridv31 = () => {

    // Row Data Interface
    interface IRow {
        athlete: string;
        age: number;
        country: string;
        year: number;
        date: string;
        sport: string;
        gold: number;
        silver: number;
        bronze: number;
        total: number;
    }

    const [colDefs, setColDefs] = useState<ColDef<IRow>[]>([
        { field: 'athlete', sortable: false },
        { field: 'age', sortable: false },
        { field: 'country', sortable: false },
        { field: 'year', sortable: false },
        { field: 'date', sortable: false },
        { field: 'sport', sortable: false },
        { field: 'gold', sortable: false },
        { field: 'silver', sortable: false },
        { field: 'bronze', sortable: false },
        { field: 'total', sortable: false },
    ]);

    return (
        <div className="ag-theme-quartz" style={{ height: 870, width: 1875 }}>
            <AgGridReact
                modules={[
                    ClientSideRowModelModule,
                ]}
                rowData={rowData}
                columnDefs={colDefs}
                onGridReady={() => console.log('Grid Ready at:', performance.now())}
                onFirstDataRendered={() => console.log('First Data Rendered at:', performance.now())}
            />
        </div>
    );
};

export default Gridv31;
