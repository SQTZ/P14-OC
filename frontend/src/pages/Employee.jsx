import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useEmployees } from '../context/EmployeeContext';
import { EMPLOYEE_TABLE_COLUMNS } from '../constants/data';
import DataTable from '../components/DataTable';
import { Users, Home } from 'lucide-react';

// Page Employee refactorisée : transformation complète du code jQuery vers React moderne
// - Remplacement de jQuery DataTable par TanStack Table React
// - Utilisation du contexte React pour la gestion des données
// - Conservation des fonctionnalités originales uniquement

function Employee() {
  // Utilisation du contexte pour récupérer les employés (remplace localStorage jQuery)
  const { employees, loading } = useEmployees();

  // Configuration des colonnes identique à la version jQuery originale
  const tableColumns = useMemo(() => EMPLOYEE_TABLE_COLUMNS, []);

  if (loading) {
    return (
      <div className="employee-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Chargement des employés...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="employee-page">
      {/* En-tête de la page */}
      <div className="page-header">
        <div className="header-content">
          <div className="header-title">
            <h1>Current Employees</h1>
          </div>
        </div>
      </div>


      {/* Table des employés */}
      <div className="table-container">
        {employees.length === 0 ? (
          <div className="empty-state">
            <h3>Aucun employé trouvé</h3>
            <p>Aucune donnée disponible dans le tableau</p>
            <Link to="/" className="btn btn-primary">
              Créer un Employé
            </Link>
          </div>
        ) : (
          <DataTable
            data={employees}
            columns={tableColumns}
            searchable={true}
            sortable={true}
            pagination={true}
            pageSize={10}
          />
        )}
      </div>
    </div>
  );
}

export default Employee