interface ButtonProps {
  content: string;
  loading: boolean;
  eventName?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: "primary" | "neutral";
  classes?: string; 
}
const Button = ({ content, loading, eventName, variant="primary", classes }: ButtonProps) => {
  return (
    <button
      className={`${variant === "neutral" ? " bg-white text-blue-700 hover:bg-blue-100 " : "text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" } ${ classes } focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center w-36 cursor-pointer disabled:bg-blue-400 disabled:cursor-not-allowed `}
      disabled={loading}
      onClick={eventName}
    >
      { loading ? "Loading.." : content }
    </button>
  );
};

export default Button;
