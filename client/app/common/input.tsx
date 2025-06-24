// import React from 'react';
// import { Eye, EyeOff } from 'lucide-react';

// interface FormInputProps {
//   name: string;
//   label: string;
//   type?: string;
//   placeholder?: string;
//   value: string;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
//   icon?: React.ReactNode;
//   required?: boolean;
//   disabled?: boolean | undefined
// }

// const FormInput: React.FC<FormInputProps> = ({
//   name,
//   label,
//   type = 'text',
//   placeholder,
//   value,
//   onChange,
//   onBlur,
//   icon,
//   required = false,
//   disabled = false,
// }) => {
//   const [showPassword, setShowPassword] = React.useState(false);

//   const getInputType = () => {
//     if (type !== 'password') return type;
//     return showPassword ? 'text' : 'password';
//   };

//   return (
//     <div className="mb-4">
//       <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
//         {label}
//         {required && <span className="text-red-500">*</span>}
//       </label>
//       <div className="relative">
//         <input
//           id={name}
//           name={name}
//           type={getInputType()}
//           placeholder={placeholder}
//           value={value}
//           onChange={onChange}
//           onBlur={onBlur}
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//           required={required}
//           disabled={disabled}
//         />
//         {type === 'password' && (
//           <button
//             type="button"
//             className="absolute right-3 top-1/2 transform -translate-y-1/2"
//             onClick={() => setShowPassword(!showPassword)}
//           >
//             {showPassword ? (
//               <EyeOff className="w-5 h-5 text-gray-500" />
//             ) : (
//               <Eye className="w-5 h-5 text-gray-500" />
//             )}
//           </button>
//         )}
//         {icon && (
//           <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
//             {icon}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
// export default FormInput;

import React from "react";
import { Eye, EyeOff } from "lucide-react";
interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: string;
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ type, label, error, icon, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const getInputType = () => {
      if (type !== "password") return type;
      return showPassword ? "text" : "password";
    };

    return (
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <div className="relative">
          <input
            type={getInputType()}
            ref={ref}
            name={props?.name}
            {...props}
            className={`mt-1 block w-full rounded-md border ${
              error ? "border-red-500" : "border-gray-300"
            } shadow-sm p-2 pr-10 focus:outline-none`}
          />
          {type === "password" && (
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5 text-gray-500" />
              ) : (
                <Eye className="w-5 h-5 text-gray-500" />
              )}
            </button>
          )}
          {icon && <div className="absolute right-2 top-2.5">{icon}</div>}
        </div>
        {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
export default FormInput;
