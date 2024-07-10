import React from 'react';
import { ToothState } from '../../../types/dtos/Patient/NewPatient.type';

interface ToothProps {
  number: number;
  handleClick: (toothNumber: number, position: 'center' | 'top' | 'bottom' | 'left' | 'right') => void;
  state: ToothState;
}

const Tooth: React.FC<ToothProps> = ({ number, handleClick, state }) => {
  const getStateStyle = (position: keyof ToothState) => {
    switch (state[position]) {
      case 'Prestaciones Existentes':
        return 'bg-red-500';
      case 'Prestaciones Requeridas':
        return 'bg-blue-500';
      case 'Diente ausente o a extraer':
        return 'relative after:content-["X"] after:absolute after:inset-0 after:flex after:items-center after:justify-center';
      case 'Prótesis fija/removible':
        return 'relative after:content-["⬛"] after:absolute after:inset-0 after:flex after:items-center after:justify-center';
      case 'Corona':
        return 'relative after:content-["⚪"] after:absolute after:inset-0 after:flex after:items-center after:justify-center';
      default:
        return 'bg-white';
    }
  };

  return (
    <div className="relative border border-black w-12 h-12">
      <div
        onClick={() => handleClick(number, 'top')}
        className={`absolute top-0 left-1/4 right-1/4 h-1/5 cursor-pointer ${getStateStyle('top')}`}
      ></div>
      <div
        onClick={() => handleClick(number, 'bottom')}
        className={`absolute bottom-0 left-1/4 right-1/4 h-1/5 cursor-pointer ${getStateStyle('bottom')}`}
      ></div>
      <div
        onClick={() => handleClick(number, 'left')}
        className={`absolute top-1/4 bottom-1/4 left-0 w-1/5 cursor-pointer ${getStateStyle('left')}`}
      ></div>
      <div
        onClick={() => handleClick(number, 'right')}
        className={`absolute top-1/4 bottom-1/4 right-0 w-1/5 cursor-pointer ${getStateStyle('right')}`}
      ></div>
      <div
        onClick={() => handleClick(number, 'center')}
        className={`absolute top-1/4 bottom-1/4 left-1/4 right-1/4 cursor-pointer ${getStateStyle('center')}`}
      ></div>
      <div className="absolute top-0 left-0 w-full text-center text-xs">{number}</div>
    </div>
  );
};

export default Tooth;
