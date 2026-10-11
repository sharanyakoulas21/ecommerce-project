import { useState } from "react";
import {
  ShoppingBag,
  Home,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ShieldCheck,
  Truck,
  Headphones,
  CheckCircle2
} from "lucide-react";
import "./Login.css";

export default function Login({ onBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("error");

  function handleLogin(event) {
    event.preventDefault();
    setMessage("");

    if (!email.trim()) {
      setMessage("Please enter your email address.");
      setMessageType("error");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setMessage("Please enter a valid email address.");
      setMessageType("error");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must contain at least 6 characters.");
      setMessageType("error");
      return;
    }

    setMessage(
      "Login form validated successfully! Connect a backend to authenticate your account."
    );
    setMessageType("success");
  }

  function handleForgotPassword() {
    setMessage(
      email.trim()
        ? "Password reset is a demo feature and is not connected to a server."
        : "Enter your email address first to request a password reset."
    );
    setMessageType("info");
  }

  function handleCreateAccount() {
    setMessage(
      "Account registration is not connected yet. You can add a registration page later."
    );
    setMessageType("info");
  }

  return (
    <main className="shop-login">
      <header className="shop-login-header">
        <button
          type="button"
          className="shop-brand"
          onClick={onBack}
          aria-label="Go to SHOPZONE home"
        >
          <span className="shop-brand-icon">
            <ShoppingBag size={24} />
          </span>
          <span>
            SHOP<span className="shop-brand-highlight">ZONE</span>
            <small>Everyday finds. A little more joy.</small>
          </span>
        </button>

        <button
          type="button"
          className="shop-home-link"
          onClick={onBack}
        >
          <Home size={17} />
          Back to Home
        </button>
      </header>

      <div className="shop-login-content">
        <section className="shop-promo">
          <span className="shop-promo-tag">WELCOME TO SHOPZONE</span>

          <h1>
            Your next
            <br />
            favourite find
            <br />
            is <span>waiting.</span>
          </h1>

          <p className="shop-promo-description">
            Sign in to enjoy a simple shopping experience and keep your
            favourite products together.
          </p>

          <div className="shop-promo-benefits">
            <div className="shop-promo-benefit">
              <span className="shop-benefit-icon">
                <Truck size={21} />
              </span>
              <div>
                <strong>Easy shopping</strong>
                <p>Explore products in one place</p>
              </div>
            </div>

            <div className="shop-promo-benefit">
              <span className="shop-benefit-icon">
                <ShieldCheck size={21} />
              </span>
              <div>
                <strong>Simple and clear</strong>
                <p>An easy-to-use shopping interface</p>
              </div>
            </div>

            <div className="shop-promo-benefit">
              <span className="shop-benefit-icon">
                <Headphones size={21} />
              </span>
              <div>
                <strong>Here to help</strong>
                <p>Find what you need with ease</p>
              </div>
            </div>
          </div>

          <div className="shop-promo-note">
            <CheckCircle2 size={17} />
            Your everyday shopping starts here.
          </div>
        </section>

        <section className="shop-login-card">
          <div className="shop-card-brand">
            <div className="shop-card-icon">
              <ShoppingBag size={25} />
            </div>
            <span>Welcome back!</span>
          </div>

          <h2>Sign in to your account</h2>
          <p className="shop-login-subtitle">
            Enter your details below to continue.
          </p>

          <form onSubmit={handleLogin}>
            <label htmlFor="shop-email">Email address</label>

            <div className="shop-input-wrap">
              <Mail size={19} />
              <input
                id="shop-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <div className="shop-password-heading">
              <label htmlFor="shop-password">Password</label>

              <button
                type="button"
                className="shop-forgot-button"
                onClick={handleForgotPassword}
              >
                Forgot password?
              </button>
            </div>

            <div className="shop-input-wrap">
              <LockKeyhole size={19} />

              <input
                id="shop-password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                minLength={6}
                required
              />

              <button
                type="button"
                className="shop-eye-button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>

            <label className="shop-remember">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
              />
              <span>Remember me</span>
            </label>

            <button type="submit" className="shop-submit">
              Sign In <span>→</span>
            </button>

            {message && (
              <div
                className={`shop-login-message ${messageType}`}
                role="status"
              >
                {message}
              </div>
            )}
          </form>

          <div className="shop-or">
            <span></span>
            <p>NEW TO SHOPZONE?</p>
            <span></span>
          </div>

          <button
            type="button"
            className="shop-create-account"
            onClick={handleCreateAccount}
          >
            Create an account
          </button>

          <div className="shop-card-benefits">
            <div>
              <ShieldCheck size={18} />
              <span>Safe demo form</span>
            </div>
            <div>
              <ShoppingBag size={18} />
              <span>Easy shopping</span>
            </div>
          </div>
        </section>
      </div>

      <footer className="shop-login-footer">
        <span>© 2026 SHOPZONE</span>
        <span>Made with care for a student project</span>
      </footer>
    </main>
  );
}