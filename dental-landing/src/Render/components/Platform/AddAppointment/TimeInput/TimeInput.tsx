import { useState } from 'react';

interface TimeInputProps {
  onTimeChange: (time: string) => void;
}

export const TimeInput: React.FC<TimeInputProps> = ({ onTimeChange }) => {
  const [time, setTime] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = event.target.value;
    setTime(newTime);
    onTimeChange(newTime);
  };

  return (
    <input
      type="time"
      value={time}
      onChange={handleChange}
      className="w-full lg:w-[30%] border border-[#424242] rounded-[15px] bg-lightgray p-4 text-[25px]"
    />
  );
};

