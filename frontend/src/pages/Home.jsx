import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEmployees } from '../context/EmployeeContext';
import { STATES, DEPARTMENTS } from '../constants/data';
import DatePicker from 'lgx-datepicker'; // Import depuis npm
import Select from '../components/Select';
import Modal from '../components/Modal';

// Page Home refactorisée : transformation complète du code jQuery vers React moderne
// - Remplacement de la manipulation DOM jQuery par des hooks React
// - Utilisation de composants réutilisables au lieu de plugins jQuery
// - Gestion d'état moderne avec useState et Context API
// - Validation de formulaire intégrée

function Home() {
  // État du formulaire (remplace les getElementById jQuery)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    startDate: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    department: ''
  });

  // État pour la validation et l'UI
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Utilisation du contexte pour la gestion des employés (remplace localStorage direct)
  const { addEmployee } = useEmployees();

  // Mise à jour des champs du formulaire
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Effacer l'erreur du champ modifié
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Validation du formulaire (amélioration vs version jQuery)
  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Le prénom est requis';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Le nom est requis';
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'La date de naissance est requise';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'La date de début est requise';
    }

    if (!formData.street.trim()) {
      newErrors.street = 'La rue est requise';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'La ville est requise';
    }

    if (!formData.state) {
      newErrors.state = 'L\'état est requis';
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'Le code postal est requis';
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      newErrors.zipCode = 'Format de code postal invalide';
    }

    if (!formData.department) {
      newErrors.department = 'Le département est requis';
    }

    return newErrors;
  };

  // Sauvegarde de l'employé (remplace la fonction saveEmployee jQuery)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Ajout via le contexte React (remplace manipulation localStorage jQuery)
      await addEmployee(formData);
      
      // Réinitialisation du formulaire
      setFormData({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        startDate: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        department: ''
      });
      
      // Affichage du modal de confirmation (remplace $('#confirmation').modal())
      setIsModalOpen(true);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="home-page">
      <div className="page-header">
        <h2>Create Employee</h2>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit} className="employee-form">
          {/* Section informations personnelles */}
          <div className="form-section">
            
            <div className="form-row">
              <div className="form-field">
                <label>
                  First Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className={errors.firstName ? 'error' : ''}
                  placeholder="Enter first name"
                />
                {errors.firstName && <span className="error-text">{errors.firstName}</span>}
              </div>

              <div className="form-field">
                <label>
                  Last Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className={errors.lastName ? 'error' : ''}
                  placeholder="Enter last name"
                />
                {errors.lastName && <span className="error-text">{errors.lastName}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <DatePicker
                  value={formData.dateOfBirth}
                  onChange={(date) => handleInputChange('dateOfBirth', date)}
                  label="Date of Birth"
                  required
                  error={errors.dateOfBirth}
                  maxDate={new Date()}
                  placeholder="Select date of birth"
                />
              </div>

              <div className="form-field">
                <DatePicker
                  value={formData.startDate}
                  onChange={(date) => handleInputChange('startDate', date)}
                  label="Start Date"
                  required
                  error={errors.startDate}
                  placeholder="Select start date"
                />
              </div>
            </div>
          </div>

          {/* Section adresse */}
          <div className="form-section">
            <fieldset className="address">
              <legend>Address</legend>
            
            <div className="form-field">
              <label>
                Street <span className="required">*</span>
              </label>
              <input
                type="text"
                value={formData.street}
                onChange={(e) => handleInputChange('street', e.target.value)}
                className={errors.street ? 'error' : ''}
                placeholder="Enter street address"
              />
              {errors.street && <span className="error-text">{errors.street}</span>}
            </div>

            <div className="form-row">
              <div className="form-field">
                <label>
                  City <span className="required">*</span>
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className={errors.city ? 'error' : ''}
                  placeholder="Enter city"
                />
                {errors.city && <span className="error-text">{errors.city}</span>}
              </div>

              <div className="form-field">
                <Select
                  options={STATES}
                  value={formData.state}
                  onChange={(value) => handleInputChange('state', value)}
                  label="State"
                  required
                  error={errors.state}
                  searchable
                  placeholder="Select a state"
                />
              </div>
            </div>

            <div className="form-field">
              <label>
                Zip Code <span className="required">*</span>
              </label>
              <input
                type="text"
                value={formData.zipCode}
                onChange={(e) => handleInputChange('zipCode', e.target.value)}
                className={errors.zipCode ? 'error' : ''}
                placeholder="12345 or 12345-6789"
                pattern="^\d{5}(-\d{4})?$"
              />
              {errors.zipCode && <span className="error-text">{errors.zipCode}</span>}
            </div>
            </fieldset>
          </div>

          {/* Section département */}
          <div className="form-section">
            <div className="form-field">
              <Select
                options={DEPARTMENTS}
                value={formData.department}
                onChange={(value) => handleInputChange('department', value)}
                label="Department"
                required
                error={errors.department}
                placeholder="Select a department"
              />
            </div>
          </div>

          {/* Bouton de soumission */}
          <div className="form-actions">
            <button 
              type="submit" 
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>

      {/* Modal de confirmation (remplace jQuery modal) */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        size="small"
      >
        <div className="success-message">
          <p>Employee Created!</p>
        </div>
      </Modal>
    </div>
  );
}

export default Home