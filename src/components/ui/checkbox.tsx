'use client';

import '@/styles/_checkbox.scss';
import { FaCheck } from 'react-icons/fa6';

const Checkbox = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) => {
  return (
    <div
      onClick={onChange}
      className={checked ? 'checked-input-checkbox' : 'default-input-checkbox'}
    >
      {checked && <FaCheck color="#0796D3" />}
    </div>
  );
};

export default Checkbox;
