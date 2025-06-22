'use client';
import {useState} from 'react';
import Head from 'next/head';
import Modal from '../../common/modal';
import {useContextAPI} from '@/app/context/contextAPI';
import {X} from 'lucide-react';
export default function LoginPage() {
  const {isLogin, setIsLogin} = useContextAPI();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {isLogin && (
        <Modal>
          <div className="fixed inset-0 flex items-center justify-center m-auto p-3 mt-15">
            <Head>
              <title>Chemnitz Culture Places | Login</title>
              <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="w-full max-w-md mx-aut rounded-xl shadow-xl p-6">
              <div className="w-full flex items-center justify-center">
                <div className="w-full bg-black max-w-lg">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                   <div className='flex justify-end'>
                        <button
                        className="text-gray-500 hover:bg-gray-200 cursor-pointer
                         rounded-sm p-1 hover:text-gray-200 transition"
                        onClick={() => setIsLogin(false)}
                        aria-label="Close Modal"
                      >
                        <X className="w-5 h-5 text-black" />
                      </button>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-1">
                        Welcome To TripMatrix
                      </h2>
                      <p className="text-gray-600 mb-6">
                        Please enter your login credentials to access your
                        account.
                      </p>
                
                    <div className="mb-6">
                      <label
                        htmlFor="email"
                        className="block text-gray-700 text-sm font-medium mb-2"
                      >
                        Email Address
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                          placeholder="muhammad.rehman@gmail.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="password"
                        className="block text-gray-700 text-sm font-medium mb-2"
                      >
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          id="password"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition pr-12"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                              />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <input
                          id="remember-me"
                          name="remember-me"
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <label
                          htmlFor="remember-me"
                          className="ml-2 block text-sm text-gray-700"
                        >
                          Remember Me
                        </label>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-green-600 cursor-pointer hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
                    >
                      Login
                    </button>

                    <div className="mt-6">
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-white text-gray-500">
                            Or continue with
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="mt-6 text-center text-sm text-gray-600">
                      By clicking Login, you are agreeing to the TripMatrix{' '}
                      <a
                        href="#"
                        className="font-medium text-blue-600 hover:text-blue-500"
                      >
                        Terms of Use
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
