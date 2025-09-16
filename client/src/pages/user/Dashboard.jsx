import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import coffeeBg from "../../assets/coffee-bg.jpg";
import TargetCursor from "../../components/TargetCursor";
import Menu from "../Menu";

const coffeeItems = [
];

// Sidebar icons as JSX components
const icons = {
  home: (
    <svg
      className="w-8 h-8"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-4H9v4a2 2 0 0 1-2 2H3z" />
    </svg>
  ),
  clock: (
      <svg
      className="w-8 h-8"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  wallet: (
      <svg
      className="w-8 h-8"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      >
      <path d="M16 3H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a4 4 0 0 0-4-4z" />
      <line x1="12" y1="11" x2="12" y2="17" />
      <line x1="16" y1="11" x2="16" y2="17" />
    </svg>
  ),
  settings: (
      <svg
      className="w-8 h-8"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  logout: (
      <svg
      className="w-8 h-8"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  ),
};

// Reusable Modal component
function Modal({ title, onClose, children }) {
  // Close modal on ESC key
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  // Prevent click inside modal content from closing modal
  const onContentClick = (e) => e.stopPropagation();

  return (
    <div
    onClick={onClose}
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div
        onClick={onContentClick}
        className="bg-[#f9f6f2] rounded-lg shadow-lg max-w-lg w-full p-6 relative font-serif"
        >
        <header className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-[#9b6a53]">{title}</h3>
          <button
            onClick={onClose}
            aria-label="Close Modal"
            className="text-[#9b6a53] hover:text-[#6e3a1f] text-3xl font-bold leading-none"
            >
            &times;
          </button>
        </header>
        <div>{children}</div>
      </div>
    </div>
  );
}

export default function UserDashboard() {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // For modal popup: { type: 'profile' | 'history' | null }
  const [modal, setModal] = useState(null);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-gray-300">
        <h1 className="text-xl font-semibold">Please login to access dashboard.</h1>
      </div>
    );
  }

  // Handle clicks on sidebar or settings options to open modals
  const openModal = (type) => {
    setModal(type);
    setSettingsOpen(false); // Close settings panel if open
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen flex cursor-none">
      <TargetCursor />

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-16 bg-[#9b6a53] flex flex-col items-center py-10 space-y-10 text-white z-30">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle Sidebar"
          className="absolute top-10 -right-4 w-8 h-8 bg-[#9b6a53] border border-white rounded-full flex items-center justify-center text-white shadow-lg hover:bg-[#7a4f3f] transition-transform"
          style={{ transform: sidebarOpen ? "rotate(0deg)" : "rotate(180deg)" }}
          type="button"
          >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-5 h-5"
            >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <a href="/" title="Home" className="hover:text-[#d8bfa3]">
          {icons.home}
        </a>

        {/* History opens modal */}
        <button
          onClick={() => openModal("history")}
          title="History"
          className="hover:text-[#d8bfa3] focus:outline-none"
          type="button"
          aria-label="Open History"
          >
          {icons.clock}
        </button>

        <a href="/Cart" title="Cart" className="hover:text-[#d8bfa3]">
          {icons.wallet}
        </a>

        {/* Settings Icon triggers settings panel */}
        <button
          onClick={() => setSettingsOpen(!settingsOpen)}
          aria-label="Open Settings"
          className="hover:text-[#d8bfa3] focus:outline-none"
          title="Settings"
          type="button"
          >
          {icons.settings}
        </button>

        <button
          onClick={handleLogout}
          title="Logout"
          className="hover:text-[#d8bfa3] focus:outline-none"
          type="button"
          aria-label="Logout"
          >
          {icons.logout}
        </button>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 relative transition-all duration-300 ease-in-out ${
            sidebarOpen ? "ml-16" : "ml-16"
        }`}
        style={{
            backgroundImage: `url(${coffeeBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            filter: "brightness(0.85)",
            padding: "4rem 3rem",
            color: "#9b6a53",
            fontWeight: "700",
            minHeight: "100vh",
            fontFamily: "'Times New Roman', serif",
        }}
        >
        <header className="mb-14 text-4xl tracking-wide">WELCOME, {user.name.toUpperCase()}</header>

        <section className="flex justify-center gap-12 flex-wrap">
          {coffeeItems.map(({ name, imgSrc }) => (
              <div
              key={name}
              className="relative w-48 cursor-pointer text-center shadow-lg bg-white rounded-lg overflow-hidden"
              >
              {/* Folded corner */}
              <div
                style={{
                    width: 40,
                    height: 40,
                    background: "linear-gradient(135deg, #6b4755 0%, #8a5f73 100%)",
                    position: "absolute",
                    top: 0,
                    right: 0,
                    clipPath: "polygon(100% 0, 0 100%, 100% 100%)",
                    zIndex: 10,
                }}
                />
              <img src={imgSrc} alt={name} className="mx-auto mt-6 mb-4 h-44 object-contain" loading="lazy" />
              <div className="mb-6 px-4 py-1 mx-auto rounded-md text-black font-bold text-lg bg-white select-none">
                {name}
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* Settings Popup Panel */}
      {settingsOpen && (
          <div
          className="fixed top-0 right-0 h-full w-72 bg-[#f9f6f2] shadow-lg z-40 flex flex-col"
          style={{ fontFamily: "'Times New Roman', serif" }}
          >
          <header className="flex items-center justify-between px-6 py-4 border-b border-[#9b6a53]">
            <h2 className="text-2xl font-bold text-[#9b6a53]">Settings</h2>
            <button
              onClick={() => setSettingsOpen(false)}
              aria-label="Close Settings"
              className="text-[#9b6a53] hover:text-[#6e3a1f] transition-colors"
              >
              &#10005;
            </button>
          </header>

          <nav className="flex-grow px-6 py-4 space-y-4">
            {[
                { label: "Profile", key: "profile" },
              { label: "Notification", key: "notification" },
              { label: "Permission", key: "permission" },
              { label: "Default Purchase Setting", key: "purchase" },
              { label: "Legal & About", key: "legal" },
            ].map(({ label, key }) => (
              <button
              key={key}
                onClick={() => {
                  openModal(key);
                }}
                className="w-full text-left text-[#6e3a1f] font-semibold hover:bg-[#d8bfa3] rounded-md px-3 py-2 transition-colors"
                >
                {label}
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* Modal Popups */}
      {modal === "profile" && (
          <Modal title="User Profile" onClose={() => setModal(null)}>
          <div className="space-y-3 text-[#6e3a1f]">
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            {/* Add more user info if available */}
          </div>
        </Modal>
      )}

      {modal === "history" && (
          <Modal title="History" onClose={() => setModal(null)}>
          <div className="text-[#6e3a1f]">
            <p>No recent history available.</p>
            {/* You can replace this with actual history data */}
          </div>
        </Modal>
      )}

      {/* Placeholder modals for other settings */}
      {modal === "notification" && (
          <Modal title="Notification Settings" onClose={() => setModal(null)}>
          <p className="text-[#6e3a1f]">Notification settings content goes here.</p>
        </Modal>
      )}
      {modal === "permission" && (
          <Modal title="Permission Settings" onClose={() => setModal(null)}>
          <p className="text-[#6e3a1f]">Permission settings content goes here.</p>
        </Modal>
      )}
      {modal === "purchase" && (
          <Modal title="Default Purchase Settings" onClose={() => setModal(null)}>
          <p className="text-[#6e3a1f]">Default purchase settings content goes here.</p>
        </Modal>
      )}
      {modal === "legal" && (
          <Modal title="Legal & About" onClose={() => setModal(null)}>
          <p className="text-[#6e3a1f]">Legal and about information content goes here.</p>
        </Modal>
      )}
    </div>
  );
}
