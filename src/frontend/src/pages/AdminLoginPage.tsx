import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { Loader2, Lock, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export default function AdminLoginPage() {
  const {
    login,
    identity,
    isLoggingIn,
    isInitializing,
    isLoginError,
    loginError,
  } = useInternetIdentity();
  const navigate = useNavigate();

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (identity) {
      void navigate({ to: "/admin/dashboard" });
    }
  }, [identity, navigate]);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse at 30% 20%, oklch(0.42 0.14 12 / 0.15) 0%, transparent 55%),
          radial-gradient(ellipse at 70% 80%, oklch(0.82 0.12 65 / 0.12) 0%, transparent 55%),
          oklch(var(--brand-parchment))
        `,
      }}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "oklch(0.42 0.14 12 / 0.08)" }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "oklch(0.82 0.12 65 / 0.1)" }}
        />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.42 0.14 12) 1px, transparent 1px), linear-gradient(90deg, oklch(0.42 0.14 12) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative"
      >
        {/* Card */}
        <div
          className="rounded-3xl p-10"
          style={{
            background: "oklch(var(--brand-cream))",
            border: "1px solid oklch(0.82 0.12 65 / 0.3)",
            boxShadow:
              "0 24px 80px oklch(0.42 0.14 12 / 0.14), 0 4px 16px oklch(0.42 0.14 12 / 0.08)",
          }}
        >
          {/* Brand header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="flex items-center justify-center gap-2 mb-5"
            >
              <span className="text-brand-gold text-3xl">✦</span>
              <div>
                <p className="font-display font-bold text-xl text-brand-burgundy tracking-wide leading-none">
                  JOMAS
                </p>
                <p className="font-display text-[0.6rem] tracking-[0.35em] text-brand-rose uppercase">
                  CRUNCH CRAFT
                </p>
              </div>
            </motion.div>

            {/* Admin badge */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
              style={{
                background: "oklch(0.42 0.14 12 / 0.08)",
                border: "1px solid oklch(0.42 0.14 12 / 0.15)",
              }}
            >
              <ShieldCheck size={13} className="text-brand-burgundy" />
              <span className="font-body text-xs font-semibold uppercase tracking-widest text-brand-burgundy">
                Admin Panel
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="font-display font-bold text-3xl text-brand-burgundy leading-tight mb-2"
            >
              Welcome Back
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="font-body text-sm text-muted-foreground"
            >
              Sign in to view and manage your orders
            </motion.p>
          </div>

          {/* Divider */}
          <div className="section-divider mb-8">✦</div>

          {/* Login info box */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="rounded-2xl p-4 mb-6 flex items-start gap-3"
            style={{
              background: "oklch(0.42 0.14 12 / 0.05)",
              border: "1px solid oklch(0.42 0.14 12 / 0.1)",
            }}
          >
            <Lock size={15} className="text-brand-burgundy mt-0.5 shrink-0" />
            <div>
              <p className="font-body text-xs font-semibold text-brand-burgundy mb-0.5">
                Secure Admin Access
              </p>
              <p className="font-body text-xs text-muted-foreground leading-relaxed">
                This area is restricted to authorized administrators only. Log
                in with your identity to access the orders dashboard.
              </p>
            </div>
          </motion.div>

          {/* Login button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Button
              data-ocid="admin_login.primary_button"
              onClick={login}
              disabled={isLoggingIn || isInitializing}
              className="btn-burgundy w-full h-12 rounded-xl text-sm"
            >
              {isLoggingIn || isInitializing ? (
                <>
                  <Loader2
                    className="mr-2 h-4 w-4 animate-spin"
                    data-ocid="admin_login.loading_state"
                  />
                  {isInitializing ? "Initializing..." : "Connecting..."}
                </>
              ) : (
                <>
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  Login with Internet Identity
                </>
              )}
            </Button>
          </motion.div>

          {/* Error state */}
          {isLoginError && loginError && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              data-ocid="admin_login.error_state"
              className="mt-4 flex items-center gap-2 text-destructive text-xs font-body bg-destructive/10 rounded-xl px-4 py-3"
            >
              <ShieldCheck size={14} className="shrink-0" />
              {loginError.message || "Login failed. Please try again."}
            </motion.div>
          )}

          {/* Back to site */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-6 text-center"
          >
            <a
              href="/"
              data-ocid="admin_login.link"
              className="font-body text-xs text-muted-foreground hover:text-brand-burgundy transition-colors duration-200 inline-flex items-center gap-1.5"
            >
              ← Back to JOMAS CRUNCH CRAFT
            </a>
          </motion.div>
        </div>

        {/* Footer note */}
        <p className="font-body text-center text-xs text-muted-foreground/60 mt-6">
          © {new Date().getFullYear()} JOMAS CRUNCH CRAFT · Admin Access Only
        </p>
      </motion.div>
    </div>
  );
}
