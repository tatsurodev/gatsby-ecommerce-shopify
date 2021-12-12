import React from 'react';
import { FaCheck } from 'react-icons/fa';
import { CheckboxWrapper } from './styles';

export function Checkbox() {
  return (
    <CheckboxWrapper>
      <div>
        <FaCheck color="white" />
      </div>
    </CheckboxWrapper>
  );
}
