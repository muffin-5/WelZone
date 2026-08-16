import PropTypes from "prop-types";

const PageShell = ({ eyebrow, title, subtitle, action, children }) => {
  return (
    <div className="min-h-screen bg-cream-100">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="mb-8 animate-fadeUp">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              {eyebrow && (
                <p className="text-sm font-bold text-peach-400 uppercase tracking-widest mb-1">
                  {eyebrow}
                </p>
              )}
              <h1 className="text-3xl md:text-4xl font-extrabold text-cocoa">
                {title}
              </h1>
              {subtitle && (
                <p className="text-stone mt-2 max-w-xl">{subtitle}</p>
              )}
            </div>
            {action && <div className="shrink-0">{action}</div>}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

PageShell.propTypes = {
  eyebrow: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  action: PropTypes.node,
  children: PropTypes.node,
};

export default PageShell;