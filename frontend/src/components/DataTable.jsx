import { useState, useMemo } from 'react';
import { 
  useReactTable, 
  getCoreRowModel, 
  getSortedRowModel, 
  getFilteredRowModel, 
  getPaginationRowModel,
  flexRender 
} from '@tanstack/react-table';
import { ChevronUp, ChevronDown, Search, ChevronLeft, ChevronRight } from 'lucide-react';

// Composant Table moderne remplaçant jQuery DataTable
// Utilise TanStack Table avec fonctionnalités avancées

const DataTable = ({ 
  data = [], 
  columns = [], 
  searchable = true,
  sortable = true,
  pagination = true,
  pageSize = 10,
  loading = false 
}) => {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [currentPageSize, setCurrentPageSize] = useState(pageSize);

  // Configuration des colonnes avec tri et recherche
  const tableColumns = useMemo(() => {
    return columns.map(col => ({
      id: col.key,
      accessorKey: col.accessorKey || col.key,
      header: col.header,
      enableSorting: sortable,
      cell: ({ getValue }) => {
        const value = getValue();
        return value || '-';
      }
    }));
  }, [columns, sortable]);

  // Configuration de la table
  const table = useReactTable({
    data,
    columns: tableColumns,
    state: {
      sorting,
      globalFilter,
      pagination: {
        pageIndex: 0,
        pageSize: currentPageSize,
      }
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: 'includesString',
  });

  if (loading) {
    return (
      <div className="table-loading">
        <div className="loading-spinner"></div>
        <p>Chargement des données...</p>
      </div>
    );
  }

  return (
    <div className="data-table-container">
      {/* Barre de recherche (amélioration vs jQuery DataTable) */}
      {searchable && (
        <div className="table-search">
          <div className="search-input-wrapper">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Rechercher dans le tableau..."
              value={globalFilter ?? ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      )}

      {/* Informations sur les données */}
      <div className="table-info">
        <span>
          Affichage de {table.getRowModel().rows.length} sur {data.length} entrées
          {globalFilter && ` (filtré de ${data.length} entrées au total)`}
        </span>
        
        {/* Sélecteur de nombre d'entrées par page */}
        {pagination && (
          <div className="page-size-selector">
            <label>
              Afficher 
              <select 
                value={currentPageSize}
                onChange={(e) => {
                  setCurrentPageSize(Number(e.target.value));
                  table.setPageSize(Number(e.target.value));
                }}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              entrées
            </label>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th 
                    key={header.id}
                    className={header.column.getCanSort() ? 'sortable' : ''}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="header-content">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanSort() && (
                        <span className="sort-icon">
                          {header.column.getIsSorted() === 'asc' && <ChevronUp size={16} />}
                          {header.column.getIsSorted() === 'desc' && <ChevronDown size={16} />}
                          {!header.column.getIsSorted() && (
                            <span className="sort-placeholder">
                              <ChevronUp size={16} className="sort-up" />
                              <ChevronDown size={16} className="sort-down" />
                            </span>
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="no-data">
                  {globalFilter ? 'Aucun résultat trouvé' : 'Aucune donnée disponible'}
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && table.getPageCount() > 1 && (
        <div className="table-pagination">
          <div className="pagination-info">
            Page {table.getState().pagination.pageIndex + 1} sur {table.getPageCount()}
          </div>
          
          <div className="pagination-controls">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="pagination-btn"
            >
              <ChevronLeft size={16} />
              Précédent
            </button>
            
            <div className="pagination-numbers">
              {Array.from({ length: Math.min(5, table.getPageCount()) }, (_, i) => {
                const pageIndex = Math.max(0, table.getState().pagination.pageIndex - 2) + i;
                if (pageIndex >= table.getPageCount()) return null;
                
                return (
                  <button
                    key={pageIndex}
                    onClick={() => table.setPageIndex(pageIndex)}
                    className={`pagination-number ${
                      pageIndex === table.getState().pagination.pageIndex ? 'active' : ''
                    }`}
                  >
                    {pageIndex + 1}
                  </button>
                );
              })}
            </div>
            
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="pagination-btn"
            >
              Suivant
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
