import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const LoginCustomer = () => {
    const [credentials, setCredentials] = useState({
        usernameOrEmail: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Kiểm tra nếu username/email và password không rỗng
        if (!credentials.usernameOrEmail || !credentials.password) {
            toast.error('Vui lòng nhập đầy đủ thông tin đăng nhập.', {
                position: 'top-right'
            });
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:3000/api/auth/login",
                credentials
            );
            localStorage.setItem("token", response.data.token);
            // Hiển thị thông báo đăng nhập thành công
            toast.success('Đăng nhập thành công!', {
                position: 'top-right'
            });
            
            // Điều hướng người dùng đến trang chính
            navigate("/");

        } catch (error) {
            console.error("Login error:", error);
            // Hiển thị thông báo đăng nhập thất bại
            toast.error('Đăng nhập thất bại. Vui lòng thử lại.', {
                position: 'top-right'
            });
        }
    };

    return (
        <div className="backgroundImg">
            <ToastContainer />
            <div className="w-1/4 m-auto bg-fourth rounded-2xl">
                <h1 className="text-primary py-3 font-bold text-center text-40">
                Đăng Nhập
                </h1>

                <div className="p-3 my-2">
                    <div className="bg-secondary mx-2 rounded-t-xl p-2">
                        <label
                        htmlFor="usernameOrEmail"
                        className="block text-xl text-primary font-bold mb-2"
                        >
                        Username hoặc email
                        </label>
                        <input
                        type="text"
                        placeholder="Username hoặc email"
                        name="usernameOrEmail"
                        value={credentials.usernameOrEmail}
                        onChange={handleChange}
                        className="bg-fourth text-base text-primary p-2 rounded-2xl w-full border border-gray-500"
                        />
                    </div>
                <div className="bg-secondary mx-2 rounded-b-xl p-2">
                    <label
                    htmlFor="usernameOrEmail"
                    className="block text-xl text-primary font-bold mb-2"
                    >
                    Mật khẩu
                    </label>
                    <div className="relative">
                    <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Mật khẩu"
                        value={credentials.password}
                        onChange={handleChange}
                        className="bg-fourth text-base text-primary p-2 rounded-2xl w-full border border-gray-500"
                    />
                    <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                        onClick={handlePasswordVisibility}
                        className="absolute right-3 top-3 cursor-pointer"
                    />
                    </div>
                    <div className="flex justify-between my-3">
                    <div>
                        <input type="checkbox" className="mr-2" />
                        <label className="text-primary">Ghi nhớ mật khẩu</label>
                    </div>
                    <a href="/forgot-password" className="text-primary">
                        Quên mật khẩu?
                    </a>
                    </div>
                </div>
                </div>
                <div className="flex items-center flex-col mx-5 mb-5">
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="bg-primary hover:opacity-90 text-white font-bold py-2 px-4 m-3 rounded-xl w-full"
                    >
                        Đăng nhập
                    </button>
                    <p className="text-primary text-xl m-2">Hoặc</p>
                    <button 
                        className="bg-third hover:opacity-90 text-white font-bold py-2 px-4 m-3 rounded-xl w-full"
                    >Đăng ký với google</button>
                    <p className="text-primary">Bạn chưa có tài khoản? <Link className="text-third" to="/register/step1">Đăng ký</Link></p>
                </div>
            </div>
        </div>
    );
};

export default LoginCustomer;
