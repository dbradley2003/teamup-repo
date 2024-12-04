import * as React from 'react';
import PropTypes from 'prop-types';
import { Select as BaseSelect, selectClasses } from '@mui/base/Select';
import { Option as BaseOption, optionClasses } from '@mui/base/Option';
import { styled } from '@mui/system';
import UnfoldMoreRoundedIcon from '@mui/icons-material/UnfoldMoreRounded';
import { CssTransition } from '@mui/base/Transitions';
import { PopupContext } from '@mui/base/Unstable_Popup';
export default function SelectFilter({onFilterChange}) {

    const handleChange = (event, newValue) => {
       
     
        console.log(newValue)
        if (onFilterChange) {
            onFilterChange(Number(newValue))
        }
    }


  return (
    <>
   
    <Select defaultValue=""  onChange={handleChange}  >
    <Option value="" disabled>
          Select a Category
        </Option>
    <Option value={0}>All</Option>
      <Option value={20}>Technology</Option>
      <Option value={30}>Film & Media</Option>
     </Select>
 
     </>
  );
}

SelectFilter.propTypes = {
    onFilterChange: PropTypes.func.isRequired,
  };

const Select = React.forwardRef(function CustomSelect(props, ref) {
  const slots = {
    root: StyledButton,
    listbox: AnimatedListbox,
    popup: Popup,
    ...props.slots,
  };

  return <BaseSelect {...props} ref={ref} slots={slots} />;
});

Select.propTypes = {
  /**
   * The components used for each slot inside the Select.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    listbox: PropTypes.elementType,
    popup: PropTypes.elementType,
    root: PropTypes.elementType,
  }),
};

const Label = styled('label')(({ theme }) => ({
  fontFamily: theme.typography.body1.fontFamily, // Use theme typography
  fontSize: theme.typography.pxToRem(14), // Use rem size consistent with theme
  display: 'block',
  marginBottom: theme.spacing(0.5), // Dynamic spacing
  fontWeight: theme.typography.body1.fontWeight || 400, // Use theme-defined weight
  color: theme.palette.text.primary || theme.palette.primary.main // Match primary text color from theme
}));
const blue = {
  100: '#DAECFF',
  200: '#99CCF3',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Button = React.forwardRef(function Button(props, ref) {
  const { ownerState, ...other } = props;
  return (
    <button type="button" {...other} ref={ref}>
      {other.children}
      <UnfoldMoreRoundedIcon />
    </button>
  );
});

Button.propTypes = {
  children: PropTypes.node,
  ownerState: PropTypes.object.isRequired,
};

const StyledButton = styled('button')(
  ({ theme }) => `
    font-family: ${theme.typography.h1.fontFamily};
    font-size: 0.875rem;
    min-width: 320px;
    padding: 10px 20px;
    border-radius: 20px;
    background: ${theme.palette.background.default};
    border: 2px solid ${theme.palette.primary.main};
    color: ${theme.palette.primary.main};
    text-align: left;
    position: relative;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: ${theme.palette.primary.main};
      color: ${theme.palette.background.default};
    }

    & > svg {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      transition: transform 0.3s ease;
    }

    &.${selectClasses.open} > svg {
      transform: translateY(-50%) rotate(180deg);
    }
  `
);

const Listbox = styled('ul')(
  ({ theme }) => `
    font-family: ${theme.typography.body1.fontFamily};
    font-size: 0.9rem;
    background: ${theme.palette.background.default};
    border: 1px solid ${theme.palette.primary.main};
    border-radius: 12px;
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.1);
    overflow: auto;
    width: 340px;
    padding: 10px;
    margin: 8px 0;
    transition: opacity 300ms ease, transform 300ms ease;

    .closed & {
      opacity: 0;
      transform: scale(0.95);
    }

    .open & {
      opacity: 1;
      transform: scale(1);
    }
  `
);

const AnimatedListbox = React.forwardRef(function AnimatedListbox(props, ref) {
  const { ownerState, ...other } = props;
  const popupContext = React.useContext(PopupContext);

  if (popupContext == null) {
    throw new Error(
      'The `AnimatedListbox` component cannot be rendered outside a `Popup` component',
    );
  }

  const verticalPlacement = popupContext.placement.split('-')[0];

  return (
    <CssTransition
      className={`placement-${verticalPlacement}`}
      enterClassName="open"
      exitClassName="closed"
    >
      <Listbox {...other} ref={ref} />
    </CssTransition>
  );
});

AnimatedListbox.propTypes = {
  ownerState: PropTypes.object.isRequired,
};

const Option = styled(BaseOption)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionClasses.highlighted} {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &:focus-visible {
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
  }
  
  &.${optionClasses.highlighted}.${optionClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &:hover:not(.${optionClasses.disabled}) {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }
  `,
);

const Popup = styled('div')`
  z-index: 1;
`;