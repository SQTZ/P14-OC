# Simple React DatePicker

A lightweight, zero-dependency React DatePicker component using native HTML5 date input.

## Features

✅ **Zero dependencies** - Uses native HTML5 `<input type="date">`  
✅ **Lightweight** - Only ~2KB  
✅ **Modern browsers** - Works on all modern browsers  
✅ **Mobile-friendly** - Native date picker on mobile devices  
✅ **Accessible** - Built-in accessibility support  
✅ **Easy to use** - Simple API, drop-in replacement for jQuery datepicker  

## Installation

```bash
npm install simple-react-datepicker
```

or

```bash
yarn add simple-react-datepicker
```

## Usage

### Basic Example

```jsx
import React, { useState } from 'react';
import DatePicker from 'simple-react-datepicker';

function App() {
  const [date, setDate] = useState('');

  return (
    <DatePicker
      value={date}
      onChange={setDate}
      label="Select a date"
    />
  );
}
```

### With Validation

```jsx
import React, { useState } from 'react';
import DatePicker from 'simple-react-datepicker';

function App() {
  const [birthDate, setBirthDate] = useState('');
  const [error, setError] = useState('');

  const handleChange = (date) => {
    setBirthDate(date);
    if (!date) {
      setError('Date of birth is required');
    } else {
      setError('');
    }
  };

  return (
    <DatePicker
      value={birthDate}
      onChange={handleChange}
      label="Date of Birth"
      required
      error={error}
      maxDate={new Date()} // Can't select future dates
      placeholder="Select your birth date"
    />
  );
}
```

### In a Form

```jsx
import React, { useState } from 'react';
import DatePicker from 'simple-react-datepicker';

function EmployeeForm() {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <DatePicker
        name="startDate"
        value={formData.startDate}
        onChange={(date) => setFormData(prev => ({ ...prev, startDate: date }))}
        label="Start Date"
        required
      />
      
      <DatePicker
        name="endDate"
        value={formData.endDate}
        onChange={(date) => setFormData(prev => ({ ...prev, endDate: date }))}
        label="End Date"
        required
        minDate={formData.startDate ? new Date(formData.startDate) : undefined}
      />
      
      <button type="submit">Submit</button>
    </form>
  );
}
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `''` | Current date value (format: MM/DD/YYYY) |
| `onChange` | `function` | - | Callback function called when date changes |
| `label` | `string` | - | Label text displayed above the input |
| `name` | `string` | - | Name attribute for the input field |
| `placeholder` | `string` | - | Placeholder text for the input |
| `required` | `boolean` | `false` | Whether the field is required |
| `disabled` | `boolean` | `false` | Whether the input is disabled |
| `error` | `string` | - | Error message to display below the input |
| `minDate` | `Date\|string` | - | Minimum selectable date |
| `maxDate` | `Date\|string` | - | Maximum selectable date |
| `className` | `string` | `''` | Additional CSS classes for the container |

### Date Format

- **Input**: Accepts dates in `MM/DD/YYYY` format or as Date objects
- **Output**: Returns dates in `MM/DD/YYYY` format via `onChange` callback
- **Native**: Internally uses `YYYY-MM-DD` format for the HTML5 input

## Styling

The component uses simple, semantic class names that you can style:

```css
/* Container */
.date-picker {
  margin-bottom: 1rem;
}

/* Label */
.datepicker-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

/* Required asterisk */
.required {
  color: red;
}

/* Input field */
.datepicker-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

/* Error state */
.datepicker-input.error {
  border-color: #dc3545;
}

/* Error message */
.error-text {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
}
```

## Browser Support

Works on all modern browsers that support `<input type="date">`:

- ✅ Chrome/Edge (20+)
- ✅ Firefox (57+)
- ✅ Safari (14.1+)
- ✅ iOS Safari (5+)
- ✅ Chrome Android
- ✅ Firefox Android

## Migration from jQuery DatePicker

This component is designed as a drop-in replacement for jQuery datepicker:

**Before (jQuery):**
```javascript
$('#date-birth').datetimepicker({
  timepicker: false,
  format: 'm/d/Y'
});
```

**After (React):**
```jsx
<DatePicker
  value={birthDate}
  onChange={setBirthDate}
  label="Date of Birth"
/>
```

## Why use this instead of other datepickers?

1. **No dependencies** - Other datepickers require additional libraries
2. **Native experience** - Uses the browser's built-in date picker
3. **Better mobile support** - Native mobile keyboards and pickers
4. **Accessibility** - Built-in ARIA support from browsers
5. **Smaller bundle** - Adds minimal weight to your app
6. **Modern** - No jQuery or legacy code

## License

MIT License - feel free to use in personal and commercial projects.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you have any issues or questions, please [open an issue](https://github.com/yourusername/simple-react-datepicker/issues).

