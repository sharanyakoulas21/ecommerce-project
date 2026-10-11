
import { useState, useEffect } from "react";
import "./Login.css";

export default function Login({ onBack, onLogin }) {
  const [isLoginMode, setIsLoginMode] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [message, setMessage] = useState("");

  // OTP timer
  useEffect(() => {
    if (otpTimer <= 0) return;

    const timer = setInterval(() => {
      setOtpTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [otpTimer]);

  // Send OTP
  function handleSendOtp() {
    setMessage("");

    if (!phone.trim() || phone.length !== 10) {
      setMessage("Please enter a valid 10-digit phone number.");
      return;
    }

    setOtpSent(true);
    setOtpTimer(30);
    setMessage("OTP sent successfully to your phone number.");
  }

  function handleLogin(event) {
    event.preventDefault();
    setMessage("");

    // ================================
    // REGISTRATION VALIDATION
    // ================================

    if (!isLoginMode && !name.trim()) {
      setMessage("Please enter your full name.");
      return;
    }

    if (!email.trim()) {
      setMessage("Please enter your email address.");
      return;
    }

    if (!isLoginMode) {
      if (!phone.trim() || phone.length !== 10) {
        setMessage("Please enter a valid 10-digit phone number.");
        return;
      }

      if (!otpSent) {
        setMessage("Please click Send OTP first.");
        return;
      }

      if (!otp.trim() || otp.length !== 6) {
        setMessage("Please enter a valid 6-digit OTP.");
        return;
      }
    }

    if (!password.trim() || password.length < 6) {
      setMessage("Password must contain at least 6 characters.");
      return;
    }

    // Confirm password only during registration
    if (!isLoginMode && password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    // Terms only during registration
    if (!isLoginMode && !termsAccepted) {
      setMessage("Please accept the Terms & Conditions.");
      return;
    }

    // =========================================
    // REGISTRATION
    // =========================================

    if (!isLoginMode) {
      const user = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        password: password,
      };

      // Save registered user in browser
      localStorage.setItem("shopzoneUser", JSON.stringify(user));

      setMessage("Registration successful!");

      if (onLogin) {
        onLogin({
          name: user.name,
          email: user.email,
          phone: user.phone,
        });
      }

      return;
    }

    // =========================================
    // LOGIN
    // =========================================

    const savedUser = localStorage.getItem("shopzoneUser");

    if (!savedUser) {
      setMessage("No account found. Please create an account first.");
      return;
    }

    const user = JSON.parse(savedUser);

    const enteredEmail = email.trim().toLowerCase();

    // Check email
    if (enteredEmail !== user.email) {
      setMessage("Email address does not match the registered account.");
      return;
    }

    // Check password
    if (password !== user.password) {
      setMessage("Incorrect password. Please try again.");
      return;
    }

    // Login successful
    setMessage("Login successful!");

    if (onLogin) {
      onLogin({
        name: user.name,
        email: user.email,
        phone: user.phone,
      });
    }
  }

  function handleForgotPassword() {
    alert("Password reset option");
  }

  function switchMode() {
    setIsLoginMode(!isLoginMode);
    setMessage("");
    setOtpSent(false);
    setOtpTimer(0);

    // Clear form when switching
    setName("");
    setEmail("");
    setPhone("");
    setOtp("");
    setPassword("");
    setConfirmPassword("");
    setTermsAccepted(false);
  }

  return (
    <div className="login-page">
      <div className="login-overlay"></div>

      <div className="login-card">

        <button className="back-button" onClick={onBack}>
          ← Back
        </button>

        <div className="login-header">
          <div className="logo-circle">🛍️</div>

          <h1>
            {isLoginMode
              ? "Welcome Back"
              : "Create Your Account"}
          </h1>

          <p>
            {isLoginMode
              ? "Login to your E-Commerce account"
              : "Join our E-Commerce community"}
          </p>
        </div>

        <form onSubmit={handleLogin}>

          {/* FULL NAME - REGISTRATION ONLY */}
          {!isLoginMode && (
            <>
              <label>Full Name</label>

              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </>
          )}

          {/* EMAIL */}
          <label>Email Address</label>

          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* PHONE + OTP - REGISTRATION ONLY */}
          {!isLoginMode && (
            <>
              <label>Phone Number</label>

              <div className="otp-row">
                <input
                  type="tel"
                  placeholder="Enter 10-digit phone number"
                  value={phone}
                  maxLength="10"
                  onChange={(e) =>
                    setPhone(e.target.value.replace(/\D/g, ""))
                  }
                />

                <button
                  type="button"
                  className="send-otp-button"
                  onClick={handleSendOtp}
                  disabled={otpTimer > 0}
                >
                  {otpTimer > 0
  ? "Resend in " + otpTimer + "s"
  : otpSent
  ? "Resend OTP"
  : "Send OTP"}
                </button>
              </div>

              <label>OTP</label>

              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                maxLength="6"
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, ""))
                }
              />

              {otpSent && (
                <p className="otp-info">
                  OTP sent successfully. Please enter the OTP.
                </p>
              )}
            </>
          )}

          {/* PASSWORD */}
          <label>Password</label>

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder={
                isLoginMode
                  ? "Enter your password"
                  : "Create a password"
              }
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              className="show-password"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {/* CONFIRM PASSWORD - REGISTRATION ONLY */}
          {!isLoginMode && (
            <>
              <label>Confirm Password</label>

              <div className="password-wrapper">
                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                />

                <button
                  type="button"
                  className="show-password"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                >
                  {showConfirmPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </>
          )}

          {/* FORGOT PASSWORD - LOGIN ONLY */}
          {isLoginMode && (
            <div className="forgot-password">
              <button
                type="button"
                onClick={handleForgotPassword}
              >
                Forgot Password?
              </button>
            </div>
          )}

          {/* TERMS - REGISTRATION ONLY */}
          {!isLoginMode && (
            <div className="terms-checkbox">
              <input
                type="checkbox"
                id="terms"
                checked={termsAccepted}
                onChange={(e) =>
                  setTermsAccepted(e.target.checked)
                }
              />

              <label htmlFor="terms">
                I agree to the Terms & Conditions
              </label>
            </div>
          )}

          {/* MESSAGE */}
          {message && (
            <p className="login-message">
              {message}
            </p>
          )}

          {/* SUBMIT */}
          <button
            type="submit"
            className="login-submit"
          >
            {isLoginMode
              ? "Login"
              : "Create Account"}
          </button>

          {/* SWITCH LOGIN / CREATE ACCOUNT */}
          <p className="account-switch">
            {isLoginMode
              ? "Don't have an account?"
              : "Already have an account?"}

            <button
              type="button"
              onClick={switchMode}
            >
              {isLoginMode
                ? "Create Account"
                : "Login"}
            </button>
          </p>

        </form>

        <p className="login-footer">
          Secure &nbsp; • &nbsp; Professional &nbsp; • &nbsp;
          Easy Shopping
        </p>

      </div>
    </div>
  );
}


