import { createContext, useContext, useState, useEffect } from 'react';

// Contexte React pour remplacer la gestion localStorage directe de jQuery
// Centralise la logique de gestion des employés avec des hooks modernes

const EmployeeContext = createContext();

export const useEmployees = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployees must be used within an EmployeeProvider');
  }
  return context;
};

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  // Chargement initial des employés depuis localStorage (remplace jQuery)
  useEffect(() => {
    try {
      const storedEmployees = localStorage.getItem('employees');
      if (storedEmployees) {
        setEmployees(JSON.parse(storedEmployees));
      }
    } catch (error) {
      console.error('Erreur lors du chargement des employés:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Sauvegarde automatique dans localStorage à chaque modification
  useEffect(() => {
    if (!loading) {
      try {
        localStorage.setItem('employees', JSON.stringify(employees));
      } catch (error) {
        console.error('Erreur lors de la sauvegarde des employés:', error);
      }
    }
  }, [employees, loading]);

  // Ajouter un employé (remplace la fonction saveEmployee() jQuery)
  const addEmployee = (newEmployee) => {
    const employeeWithId = {
      ...newEmployee,
      id: Date.now().toString(), // Ajout d'un ID unique
      createdAt: new Date().toISOString()
    };
    
    setEmployees(prevEmployees => [...prevEmployees, employeeWithId]);
    return employeeWithId;
  };

  const value = {
    employees,
    loading,
    addEmployee
  };

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  );
};
