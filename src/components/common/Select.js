import ReactSelect from 'react-select';

export function Select({ className, color, ...restProps }) {
  return (
    <ReactSelect
      className={className}
      styles={getSelectStyles(color)}
      isClearable
      {...restProps}
    />
  );
}

const getSelectStyles = (color) => {
  const accent = color || 'var(--color-accent)';

  return {
    control: (base, state) => ({
      ...base,
      height: 40,
      paddingInline: 12,
      borderRadius: 8,
      borderColor: accent,
      backgroundColor: state.isFocused ? '#334466' : '#263750',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      '&:hover': {
        backgroundColor: '#334466'
      }
    }),

    valueContainer: (base) => ({
      ...base,
      padding: 0,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }),

    singleValue: (base) => ({
      ...base,
      color: '#f5f5f5',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }),

    placeholder: (base) => ({
      ...base,
      color: '#b3b3b3'
    }),

    indicatorSeparator: () => ({
      display: 'none'
    }),

    indicatorsContainer: (base) => ({
      ...base,
      color: 'red'
    }),

    dropdownIndicator: (base, state) => {
      if (state.selectProps.value) {
        return {
          display: 'none'
        };
      }

      return {
        ...base,
        padding: '0 4px',
        transition: 'transform 0.2s ease, color 0.2s ease',
        transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'none',
        ':hover': {
          color: accent
        },
        svg: {
          stroke: '#b2b2b2'
        }
      };
    },

    clearIndicator: (base) => ({
      ...base,
      padding: '0 4px',
      color: '#f5f5f5',
      cursor: 'pointer',
      ':hover': {
        color: accent
      }
    }),

    menu: (base) => ({
      ...base,
      marginTop: 5,
      backgroundColor: '#263750',
      borderRadius: 8,
      border: `1px solid ${accent}`,
      overflow: 'hidden'
    }),

    menuList: (base) => ({
      ...base,
      paddingBlock: 0,
      maxHeight: 35 * 5
    }),

    option: (base, state) => ({
      ...base,
      height: 35,
      display: 'flex',
      alignItems: 'center',
      padding: '0 7px',
      cursor: 'pointer',
      fontWeight: state.isSelected ? 700 : 400,
      color: state.isSelected ? '#ffffff' : '#f5f5f5',
      backgroundColor: state.isSelected
        ? accent
        : state.isFocused
        ? '#2ecc71'
        : 'transparent',
      ':active': {
        backgroundColor: state.isSelected ? accent : '#2ecc71'
      }
    })
  };
};
