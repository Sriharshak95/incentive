// src/DynamicForm.js
import React, { useState } from 'react';

const DynamicForm:React.FC<{schema:any; onSubmit:any}> = ({ schema, onSubmit }) => {
  const [formData, setFormData] = useState<any>({});
  const [formErrors, setFormErrors] = useState<any>({});

  const handleChange = (e:any) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleValidation = () => {
    let errors:any = {};
    let formIsValid = true;

    schema.forEach((section:any) => {
      if (section.fields) {
        section.fields.forEach((field:any) => {
          if (field.required && !formData[field.name]) {
            formIsValid = false;
            errors[field.name] = 'This field is required';
          }
        });
      }
    });

    setFormErrors(errors);
    return formIsValid;
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    if (handleValidation()) {
      onSubmit(formData);
    }
  };

  const renderField = (field:any) => {
    switch (field.type) {
      case 'select':
        return (
          <select
            name={field.name}
            onChange={handleChange}
            required={field.required}
          >
            <option value="">Select...</option>
            {field.options.map((option:any, index:any) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case 'radio':
        return field.options.map((option:any, index:any) => (
          <input
            key={index}
            type="radio"
            name={field.name}
            value={option.value}
            onChange={handleChange}
            required={field.required}
            checked={formData[field.name] === option.value}
          />
        ));
      case 'checkbox':
        return (
          <input
            type="checkbox"
            name={field.name}
            onChange={handleChange}
            required={field.required}
            checked={formData[field.name]}
            className='w-full'
          />
        );
      case 'textarea':
        return (
          <textarea
            rows={3}
            name={field.name}
            placeholder={field.placeholder}
            onChange={handleChange}
            required={field.required}
            value={formData[field.name] || ''}
            className='w-full'
          />
        );
      default:
        // Handle other HTML5 input types like date, email, etc.
        return (
          <input
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            onChange={handleChange}
            required={field.required}
            value={formData[field.name] || ''}
            className='w-full'
          />
        );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {schema.map((section:any, sectionIndex:any) => (
        <div key={sectionIndex}>
          <h3>{section.sectionTitle}</h3>
          <div className='row-auto'>
            {section.fields &&
              section.fields.map((field:any, fieldIndex:any) => (
                <div key={fieldIndex} className='auto-cols-auto'>
                  <div className="mb-3 w-full">
                    {renderField(field)}
                    {formErrors[field.name] && (
                      <div className="text-danger">
                        {formErrors[field.name]}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
        </div>
      ))}
      <button type="submit">
        Submit
      </button>
    </form>
  );
};

export default DynamicForm;