import bcryptjs from "bcryptjs";  
import User from "../model/user";  
import { registerSchema } from "../schemas/auth";  

export const signup = async (req, res) => {
    const { username, password, confirmPassword, email, age } = req.body; 
    
    // Kiểm tra dữ liệu với Joi schema
    const { error } = registerSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const message = error.details.map((message) => message.message);
        return res.status(400).json({
            message,
        });
    }

    // Kiểm tra email đã tồn tại chưa
    const existUser = await User.findOne({ email });
    if (existUser) {
        return res.status(400).json({
            message: ["Email đã tồn tại"],
        });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Tạo người dùng mới
    const user = await User.create({
        username,
        email,
        password: hashedPassword,  // Lưu mật khẩu đã mã hóa
        age,
    });

    // Trả về thông tin người dùng (không gửi mật khẩu)
    user.password = undefined;
    return res.status(201).json({
        user,
    });
};
