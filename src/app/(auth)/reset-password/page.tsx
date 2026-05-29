import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password",
};

export default function ResetPasswordPage() {
  return (
    <div className="glass-card p-8 animate-[scale-in_0.3s_ease-out]">
      <div className="text-center mb-6">
        <h1 className="text-xl font-bold">Reset Password</h1>
        <p className="text-sm text-[var(--color-muted-foreground)] mt-1">
          Masukkan email untuk menerima link reset password
        </p>
      </div>

      <form className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1.5">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="nama@email.com"
            className="w-full px-3 py-2.5 rounded-xl border border-[var(--color-border)] bg-white/5 text-sm placeholder:text-[var(--color-muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-ring)] focus:border-transparent transition-all"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2.5 rounded-xl gradient-bg text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-indigo-500/20"
        >
          Kirim Link Reset
        </button>
      </form>

      <p className="text-center text-sm text-[var(--color-muted-foreground)] mt-6">
        Ingat password?{" "}
        <a
          href="/login"
          className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
        >
          Masuk
        </a>
      </p>
    </div>
  );
}
