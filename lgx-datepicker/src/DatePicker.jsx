import React from 'react';

/**
 * Simple DatePicker component using native HTML5 date input
 * @param {Object} props - Component properties
 * @param {string} props.value - Current date value (format: MM/DD/YYYY)
 * @param {Function} props.onChange - Callback when date changes
 * @param {string} props.label - Label text for the input
 * @param {string} props.error - Error message to display
 * @param {boolean} props.required - Whether the field is required
 * @param {Date|string} props.minDate - Minimum selectable date
 * @param {Date|string} props.maxDate - Maximum selectable date
 * @param {boolean} props.disabled - Whether the input is disabled
 * @param {string} props.name - Name attribute for the input
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.className - Additional CSS classes
 */
const DatePicker = ({ 
  value, 
  onChange, 
  placeholder,
  label,
  error,
  required = false,
  minDate,
  maxDate,
  disabled = false,
  name,
  className = ''
}) => {
  // Convert dates to native input format (YYYY-MM-DD)
  const formatDateForInput = (date) => {
    if (!date) return '';
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toISOString().split('T')[0];
  };

  const handleChange = (e) => {
    const inputDate = e.target.value; // Format: YYYY-MM-DD
    if (onChange) {
      // Convert to MM/DD/YYYY format for compatibility
      if (inputDate) {
        const [year, month, day] = inputDate.split('-');
        onChange(`${month}/${day}/${year}`);
      } else {
        onChange('');
      }
    }
  };

  return (
    <div className={`date-picker ${className}`}>
      {label && (
        <label className="datepicker-label">
          {label}
          {required && <span className="required"> *</span>}
        </label>
      )}
      <input
        type="date"
        name={name}
        value={formatDateForInput(value)}
        onChange={handleChange}
        min={minDate ? formatDateForInput(minDate) : undefined}
        max={maxDate ? formatDateForInput(maxDate) : undefined}
        disabled={disabled}
        required={required}
        className={`datepicker-input ${error ? 'error' : ''}`}
        placeholder={placeholder}
      />
      {error && <span className="error-text">{error}</span>}
    </div>
  );
};

export default DatePicker;

