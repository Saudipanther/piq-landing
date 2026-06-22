import piqWhite from "../assets/piq-white.png";
import piqMark from "../assets/piq-mark.png";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/8 bg-forest-deep">
      {/* oversized background mark, editorial texture */}
      <img
        src={piqMark}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -right-10 w-[40vw] max-w-md opacity-[0.06]"
      />
      <div className="relative mx-auto max-w-editorial px-6 py-16 lg:px-10">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <img src={piqWhite} alt="Panther IQ" className="h-8 w-auto" />
            <p className="mt-5 max-w-sm text-sm leading-7 text-paper/55">
              The research, engineering, and internal IP studio of Saudi Panther.
              Built in Riyadh, deployed in eu-west-1, governed under Saudi law.
            </p>
          </div>
          <nav className="flex gap-8 text-sm text-paper/65" aria-label="Footer">
            <a href="#capabilities" className="transition-colors hover:text-paper">
              Capabilities
            </a>
            <a href="#ip" className="transition-colors hover:text-paper">
              Technical IP
            </a>
            <a href="#contact" className="transition-colors hover:text-paper">
              Contact
            </a>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/8 pt-6 text-xs text-paper/40 sm:flex-row sm:items-center sm:justify-between">
          <span>Saudi Panther · Panther IQ</span>
          <span dir="rtl" className="text-paper/55">
            نحن نرصد. نحلل. ننقل لك الحقيقة.
          </span>
        </div>
      </div>
    </footer>
  );
}
