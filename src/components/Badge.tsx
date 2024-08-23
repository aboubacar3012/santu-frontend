type BadgeProps = {
  type: "green" | "red" | "blue" | "yellow" | "gray";
  text: string;
};
const Badge = ({ type, text }: BadgeProps) => {
  const styleByType = {
    green: "bg-green-100 text-green-800",
    red: "bg-red-100 text-red-800",
    blue: "bg-blue-100 text-blue-800",
    yellow: "bg-yellow-100 text-yellow-800",
    gray: "bg-gray-100 text-black"
  }

  return (
    <p className={`text-xs font-medium px-4 py-2 rounded ${type} ${styleByType[type]}`}>
      {text}
    </p>
  );
}

export default Badge;