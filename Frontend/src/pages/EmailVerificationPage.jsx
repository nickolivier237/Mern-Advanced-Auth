import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useauthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const EmailVerificationPage = () => {
    const [code, setCode] = useState(["", "", "", "", "", ""]); // Changed here
    const inputRefs = useRef([]);
    const navigate = useNavigate();


    const {error,isLoading,verifyEmail} =useauthStore()

    const handleChange = (index, value) => {
        const newCode = [...code];
        
        // handle pasted code
        if (value.length > 1) {
            const pastedCode = value.slice(0, 6).split("");
            for (let  i = 0; i < 6; i++) {
                newCode[i] = pastedCode[i] || "";
            }
            setCode(newCode);
            // focus on the last non-empty input or the first empty one
            const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
            const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1  : 5;
            inputRefs.current[focusIndex].focus();
    }else{
            newCode[index] = value;
            setCode(newCode);

            // move focus to the next input to be filled
            if (value && index < 5){
                inputRefs.current[index + 1].focus();
            }
    }
}
    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !code[index] && index > 0){
            inputRefs.current[index - 1].focus();
        }
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        const verificationCode  = code.join("");
        try {
            await verifyEmail(verificationCode);
            navigate("/");
            toast.success("email verified sucessfully")
        } catch (error) {
            console.log(error);
        }
        
    };
        // auto submit when all field are fills
    useEffect(() => {
        if(code.every(digit => digit !== '')){
        handleSubmit(new Event('submit'));
        }
    }, [code])

    return (
        <div className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl p-8'
            >
                <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
                    Verify Your Email
                </h2>
                <p className='text-center text-gray-300 mb-3'>
                    Enter the 6-digit code sent to your email address.
                </p>
                <form onSubmit={handleSubmit} className='space-y-5'>
                    {code && code.length > 0 && (
                        <div className="flex justify-between ml-4 mr-4">
                            {code.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    type='text'
                                    maxLength="6"
                                    value={digit} // Changed here
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className='w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-gray-600 rounded-lg focus:border-green-500 focus:outline-none'
                                />
                            ))}
                        </div>
                    )}
                        {error && <p  className='text-red-500 font-semibold mt-2'>{error}</p>}

                    <motion.button
                        className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        disabled={isLoading || code.some((digit) => !digit)}
                    >
                        {isLoading ? "Verifying" : "Verify Email"}
                    </motion.button>
                </form>
            </motion.div>
        </div>
    )
}

export default EmailVerificationPage;

