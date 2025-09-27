import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

// Composant Select moderne React remplaçant jQuery selectmenu
// Avec recherche intégrée et meilleure accessibilité
const Select = ({ 
  options = [], 
  value, 
  onChange, 
  placeholder = 'Sélectionner...', 
  searchable = false,
  label,
  error,
  required = false,
  disabled = false,
  name
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const selectRef = useRef(null);
  const searchInputRef = useRef(null);

  // Filtrage des options avec recherche (amélioration vs jQuery)
  const filteredOptions = options.filter(option => {
    if (!searchTerm) return true;
    const searchValue = typeof option === 'object' ? option.name || option.label : option;
    return searchValue.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Fermeture au clic extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus sur la recherche à l'ouverture
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable]);

  const handleSelect = (option) => {
    const selectedValue = typeof option === 'object' ? option.abbreviation || option.value : option;
    onChange(selectedValue);
    setIsOpen(false);
    setSearchTerm('');
  };

  const toggleOpen = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  // Gestion du clavier
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      setSearchTerm('');
    }
  };

  // Affichage de la valeur sélectionnée
  const displayValue = () => {
    if (!value) return placeholder;
    
    const selectedOption = options.find(option => {
      const optionValue = typeof option === 'object' ? option.abbreviation || option.value : option;
      return optionValue === value;
    });
    
    if (selectedOption) {
      return typeof selectedOption === 'object' ? selectedOption.name || selectedOption.label : selectedOption;
    }
    
    return value;
  };

  return (
    <div className="select-container" ref={selectRef}>
      {label && (
        <label className="select-label">
          {label}
          {required && <span className="required-asterisk">*</span>}
        </label>
      )}
      
      <div className={`select-wrapper ${error ? 'error' : ''} ${disabled ? 'disabled' : ''}`}>
        <div 
          className="select-trigger"
          onClick={toggleOpen}
          onKeyDown={handleKeyDown}
          tabIndex={disabled ? -1 : 0}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <span className="select-value">{displayValue()}</span>
          <ChevronDown 
            size={20} 
            className={`select-arrow ${isOpen ? 'open' : ''}`}
          />
        </div>

        {isOpen && (
          <div className="select-dropdown">
            {searchable && (
              <div className="select-search">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="select-search-input"
                />
              </div>
            )}
            
            <ul className="select-options" role="listbox">
              {filteredOptions.length === 0 ? (
                <li className="select-option no-results">Aucun résultat</li>
              ) : (
                filteredOptions.map((option, index) => {
                  const optionValue = typeof option === 'object' ? option.abbreviation || option.value : option;
                  const optionLabel = typeof option === 'object' ? option.name || option.label : option;
                  const isSelected = optionValue === value;
                  
                  return (
                    <li
                      key={index}
                      className={`select-option ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleSelect(option)}
                      role="option"
                      aria-selected={isSelected}
                    >
                      {optionLabel}
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        )}
      </div>

      {error && <span className="select-error">{error}</span>}
      
      {/* Input caché pour les formulaires */}
      <input
        type="hidden"
        name={name}
        value={value || ''}
      />
    </div>
  );
};

export default Select;
