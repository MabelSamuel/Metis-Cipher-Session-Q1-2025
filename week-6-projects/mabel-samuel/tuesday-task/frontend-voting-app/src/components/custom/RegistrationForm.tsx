import { TiTick } from "react-icons/ti";
import Input from "../ui/Input"
import SelectTag from "../ui/SelectTag";

const RegistrationForm = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="border border-gray-200 w-1/2 flex flex-col items-center py-8 space-y-4 rounded-lg px-8">
        <div className="size-16 bg-blue-700 rounded-full flex justify-center items-center">
          <TiTick className="size-10 text-white" />
        </div>
        <h2 className="font-medium text-2xl">Register to vote</h2>
        <form className="w-full space-y-4">
            <Input type="text" placeholder="Enter your name*" id="name" />
            <Input type="number" placeholder="Enter your age*" id="age"/>
            <Input type="number" placeholder="Enter your National Identification Number*" id="nin"/>
            <SelectTag />
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
