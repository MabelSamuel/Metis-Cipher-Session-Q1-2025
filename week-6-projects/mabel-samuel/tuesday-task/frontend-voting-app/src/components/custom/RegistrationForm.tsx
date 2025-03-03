import { TiTick } from "react-icons/ti";

const RegistrationForm = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="border border-gray-200 w-1/2 flex flex-col items-center py-8 space-y-4 rounded-lg">
        <div className="size-16 bg-blue-700 rounded-full flex justify-center items-center">
          <TiTick className="size-10 text-white" />
        </div>
        <h2 className="font-medium text-2xl">Register to vote</h2>
        <form>

        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
