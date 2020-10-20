import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { data1 } from '../data' ;

import {
  AllModules,
  Module,
  RowGroupingModule,
  ColumnsToolPanelModule,
  FiltersToolPanelModule,
  ModuleRegistry as CoreModuleRegistry
} from '@ag-grid-enterprise/all-modules';
// import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
CoreModuleRegistry.registerModules(AllModules);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private gridApi;
  private gridColumnApi;
  private columnDefs;
  private defaultColDef;
  private autoGroupColumnDef;
  private rowData: any = [];
  public sideBar;
  public modules: Module[] = AllModules;
  private rowModelType: string;

  constructor(private http: HttpClient) {
    // THIS WORKS ONLY
    this.sideBar = 'columns';

    // THIS DOES NOT WORKS
    // this.sideBar = 'filters';

    // THIS DOES NOT WORKS
    // this.sideBar = true;

    this.columnDefs = [
      {
        field: 'agentid',
      },
      {
        headerName: 'Agent',
        valueGetter: 'data.Member.name',
        enablePivot: true,
        enableRowGroup: true,
        filter: true,
      },
      {
        headerName: 'Year',
        valueGetter: 'data.TimeSlot.year',
        enablePivot: true,
      },
      {
        headerName: 'Hour',
        valueGetter: 'data.TimeSlot.hour',
        enablePivot: true,
      },
      {
        headerName: 'Minute',
        valueGetter: 'data.TimeSlot.minute',
        enablePivot: true,
      },
      {
        headerName: 'Day',
        valueGetter: 'data.TimeSlot.day',
        enablePivot: true,
      },
      {
        headerName: 'Day',
        valueGetter: 'data.TimeSlot.day',
        enablePivot: true,
      },
      {
        headerName: 'Week',
        valueGetter: 'data.TimeSlot.week',
        enablePivot: true,
      },
      {
        headerName: 'Month',
        valueGetter: 'data.TimeSlot.monthdisplay',
        enablePivot: true,
      },
      {
        headerName: 'Quarter',
        valueGetter: 'data.TimeSlot.quarterdisplay',
        enablePivot: true,
      },
      {
        headerName: 'Half Year',
        valueGetter: 'data.TimeSlot.halfyear',
        enablePivot: true,
      },
      {
        field: 'totalidleduration',
        enablePivot: true,
      }, {
        field: 'totalawayduration',
        enablePivot: true,
      }, {
        field: 'totalonlineduration',
        enablePivot: true,
      }, {
        field: 'totaldnc',
        enablePivot: true,
      }, {
        field: 'totalcallbackshandled',
        enablePivot: true,
      }, {
        field: 'totalcontacts',
        enablePivot: true,
      }, {
        field: 'totaltransfersmade',
        enablePivot: true,
      }, {
        field: 'totalwarmtransfers',
        aggFunc: 'sum',
      }, {
        field: 'totalblindtransfers',
        aggFunc: 'sum',
      }, {
        field: 'totalexternaltransfers',
        aggFunc: 'sum',
      }, {
        field: 'totaltransfersrejected',
        aggFunc: 'sum',
      }, {
        field: 'totalholdduration',
        aggFunc: 'sum',
      }, {
        field: 'totalconnects',
        aggFunc: 'sum',
      }, {
        field: 'totalcallagain',
        aggFunc: 'sum',
      }, {
        field: 'totalcallsdisposedbyagent',
        aggFunc: 'sum',
      }, {
        field: 'total_outgoing_email',
        aggFunc: 'sum',
      }, {
        field: 'total_incoming_email',
        aggFunc: 'sum',
      }, {
        field: 'total_email_handled',
        aggFunc: 'sum',
      }, {
        field: 'total_email_handle_time',
        aggFunc: 'sum',
      }, {
        field: 'total_chat',
        aggFunc: 'sum',
      }, {
        field: 'total_missed_calls',
        aggFunc: 'sum',
      }

    ];


    this.defaultColDef = {
      flex: 1,
      minWidth: 150,
      sortable: true,
      resizable: true,
    };


    this.autoGroupColumnDef = { minWidth: 250 };
    this.rowModelType = 'serverSide';

  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    // this.rowData = data1;
    this.http
      .get(
        'http://localhost:3000/summary'
      )
      .subscribe((data) => {
        var fakeServer = createFakeServer(data);
        var datasource = createServerSideDatasource(fakeServer);
        params.api.setServerSideDatasource(datasource);
      });
  }
}

function createServerSideDatasource(server) {
  return {
    getRows: function (params) {
      console.log('[Datasource] - rows requested by grid: ', params.request);
      var response = server.getData(params.request);
      setTimeout(function () {
        if (response.success) {
          params.successCallback(response.rows, response.lastRow);
        } else {
          params.failCallback();
        }
      }, 500);
    },
  };
}
function createFakeServer(allData) {
  return {
    getData: function (request) {
      var requestedRows = allData.slice(request.startRow, request.endRow);
      var lastRow = getLastRowIndex(request, requestedRows);
      return {
        success: true,
        rows: requestedRows,
        lastRow: lastRow,
      };
    },
  };
}
function getLastRowIndex(request, results) {
  if (!results) return undefined;
  var currentLastRow = request.startRow + results.length;
  return currentLastRow < request.endRow ? currentLastRow : undefined;
}

