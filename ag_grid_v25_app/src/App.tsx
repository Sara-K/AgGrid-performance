import Gridv25 from './Gridv25';
// import Gridv25Server from './Gridv25Server';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

// Register the required feature module with AG Grid
ModuleRegistry.register(ClientSideRowModelModule);

const App = () => {

  return (
    <div className="App">
      <h1>AG Grid v25</h1>
      <Gridv25 />
      {/* <Gridv25Server /> */}
    </div>
  );
};

export default App;
