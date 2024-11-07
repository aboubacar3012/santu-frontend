import { ReactNode } from "react";
import { GiMoneyStack } from "react-icons/gi";

type StatCardProps = {
  title: string;
  value: number | string;
  unit: string;
  icon: ReactNode;
}

const StatCard = ({ title, value, unit, icon}: StatCardProps) => {
  return (
    <div className="flex flex-col justify-between p-4 pb-4 bg-white rounded-md shadow-md h-40">
      <div className="flex justify-between">
        <p className="text-lg font-semibold">
          {title}
        </p>
        {icon}
      </div>

      <div className="">
        <p className="text-2xl font-normal whitespace-nowrap pb-2">
          {value}
        </p>
        <p className="text-md">
          {unit}
        </p>
      </div>
    </div>
  );
}

export default StatCard;