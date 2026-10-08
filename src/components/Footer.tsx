export function Footer() {
  return (
    <footer className="px-8 md:px-16 lg:px-24 py-8 border-t border-[var(--border)] bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs text-[var(--muted)]">
        <div>
          ©2026 MOHAMED HUSSAIN N — Built from scratch. No templates.
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-[var(--accent-lime)] transition-colors">BACK TO TOP ↑</a>
        </div>
      </div>
    </footer>
  );
}