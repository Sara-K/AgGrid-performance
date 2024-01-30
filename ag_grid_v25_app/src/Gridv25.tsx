import { useState } from 'react';
import { AgGridReact } from '@ag-grid-community/react';
import rowData from './populatedData.json';

import { ColDef } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';

const Gridv25 = () => {

    const [colDefs, setColDefs] = useState<ColDef[]>([
        { field: 'athlete' },
        { field: 'age' },
        { field: 'country' },
        { field: 'year' },
        { field: 'date' },
        { field: 'sport' },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
        { field: 'total' },
    ]);

    return (
        <div className="ag-theme-alpine" style={{ height: '870px', width: '1875px' }}>
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

export default Gridv25;
