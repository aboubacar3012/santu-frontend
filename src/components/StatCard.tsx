import { GiMoneyStack } from "react-icons/gi";

type StatCardProps = {
  title: string;
  value: number | string;
  unit: string;
}

const StatCard = ({ title, value, unit }: StatCardProps) => {
  return (
    <div className="flex flex-col justify-between p-4 pb-4 bg-white rounded-md shadow-md h-40">
      <div className="flex justify-between">
        <p className="text-lg font-semibold">
          {title}
        </p>
        <GiMoneyStack className="w-8 h-8" />
      </div>

      <div className="">
        <p className="text-3xl font-normal whitespace-nowrap">
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