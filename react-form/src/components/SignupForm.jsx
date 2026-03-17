import { useState } from "react";

export default function SignupForm() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  // Validation Functions
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password) => {
    return {
      length: password.length >= 8,
      upper: /[A-Z]/.test(password),
      lower: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[@$!%*?&]/.test(password),
    };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
    setSuccess("");

    let newErrors = { ...errors };

    if (name === "email") {
      newErrors.email = validateEmail(value)
        ? ""
        : "Invalid email format";
    }

    if (name === "password") {
      const rules = validatePassword(value);
      if (Object.values(rules).every(Boolean)) {
        newErrors.password = "";
      } else {
        newErrors.password =
          "Password must be 8+ chars, include upper, lower, number & special char";
      }
    }

    if (name === "confirmPassword") {
      newErrors.confirmPassword =
        value === form.password ? "" : "Passwords do not match";
    }

    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!errors.email && !errors.password && !errors.confirmPassword) {
      setSuccess("Signup successful!");
      setForm({ email: "", password: "", confirmPassword: "" });
      setErrors({});
    } else {
      setSuccess("");
    }
  };

  return (
    <div className="form-container">
      <h2>Smart Signup Form</h2>

      <form onSubmit={handleSubmit}>
        {/* Email */}
        <div className="input-group">
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        {/* Password */}
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter password"
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        {/* Confirm Password */}
        <div className="input-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
          />
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword}</p>
          )}
        </div>

        <button type="submit">Sign Up</button>

        {success && <p className="success">{success}</p>}
      </form>
    </div>
  );
}