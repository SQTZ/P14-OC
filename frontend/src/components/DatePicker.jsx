import { useState, forwardRef } from 'react';
import ReactDatePicker from 'react-datepicker';
import { Calendar } from 'lucide-react';
import 'react-datepicker/dist/react-datepicker.css';

// Composant DatePicker moderne remplaçant jQuery datetimepicker
// Utilise react-datepicker avec interface personnalisée

// Composant input personnalisé pour le DatePicker
const CustomInput = forwardRef(({ value, onClick, placeholder, error, label, required }, ref) => (
  <div className="datepicker-container">
    {label && (
      <label className="datepicker-label">
        {label}
        {required && <span className="required-asterisk">*</span>}
      </label>
    )}
    <div className={`datepicker-wrapper ${error ? 'error' : ''}`}>
      <input
        ref={ref}
        value={value}
        onClick={onClick}
        placeholder={placeholder}
        readOnly
        className="datepicker-input"
      />
      <Calendar size={20} className="datepicker-icon" />
    </div>
    {error && <span className="datepicker-error">{error}</span>}
  </div>
));

CustomInput.displayName = 'CustomInput';

const DatePicker = ({ 
  value, 
  onChange, 
  placeholder = 'Sélectionner une date',
  label,
  error,
  required = false,
  minDate,
  maxDate,
  disabled = false,
  name,
  dateFormat = 'MM/dd/yyyy' // Format américain comme dans jQuery
}) => {
  const [selectedDate, setSelectedDate] = useState(value ? new Date(value) : null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (onChange) {
      // Format de sortie compatible avec l'ancien système jQuery
      const formattedDate = date ? date.toLocaleDateString('en-US') : '';
      onChange(formattedDate);
    }
  };

  return (
    <div className="date-picker">
      <ReactDatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat={dateFormat}
        placeholderText={placeholder}
        minDate={minDate}
        maxDate={maxDate}
        disabled={disabled}
        customInput={
          <CustomInput 
            error={error}
            label={label}
            required={required}
            placeholder={placeholder}
          />
        }
        popperClassName="datepicker-popper"
        calendarClassName="datepicker-calendar"
        showPopperArrow={false}
        // Configuration avancée (améliorations vs jQuery)
        showYearDropdown
        showMonthDropdown
        dropdownMode="select"
        yearDropdownItemNumber={100}
        scrollableYearDropdown
      />
      
      {/* Input caché pour les formulaires */}
      <input
        type="hidden"
        name={name}
        value={selectedDate ? selectedDate.toLocaleDateString('en-US') : ''}
      />
    </div>
  );
};

export default DatePicker;
