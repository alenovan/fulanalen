import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import Marquee from "@/components/ui/marquee"; // Assuming this path is correct
import {
  Calendar,
  Clock,
  ChevronDown,
  User,
  MessageCircle,
  Send,
  Smile,
  CheckCircle,
  XCircle,
  HelpCircle,
} from "lucide-react";
import { useState, useEffect } from "react";
// Assuming formatEventDate is correctly imported and works
// import { formatEventDate } from "@/lib/formatEventDate";

// Placeholder for formatEventDate if not available
const formatEventDate = (dateString) => {
  try {
    return new Date(dateString).toLocaleString(); // Simple fallback
  } catch (e) {
    return "Invalid Date";
  }
};

export default function Wishes() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [guestName, setGuestName] = useState(""); // State for guest name
  const [newWish, setNewWish] = useState(""); // State for the wish message
  const [attendance, setAttendance] = useState(""); // State for attendance
  const [isOpen, setIsOpen] = useState(false); // State for dropdown visibility
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(""); // Optional: State for error messages

  const options = [
    { value: "ATTENDING", label: "Ya, saya akan hadir" },
    { value: "NOT_ATTENDING", label: "Tidak, saya tidak bisa hadir" },
  ];

  // Example wishes - replace with your actual data fetching/management
  const [wishes, setWishes] = useState([
    // Add some initial dummy data if needed for the marquee
    // { id: 0, name: 'Example User', message: 'Selamat berbahagia!', attend: 'ATTENDING', timestamp: new Date(Date.now() - 3600000).toISOString() }
  ]);

  const fetchWishes = async () => {
    try {
      const response = await fetch(
        "https://x8ki-letl-twmt.n7.xano.io/api:NCs9IuT1/wish"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch wishes");
      }
      const data = await response.json();
      setWishes(data); // Assuming data is an array of wishes
    } catch (error) {
      console.error("Error fetching wishes:", error);
    }
  };
  useEffect(() => {
    fetchWishes();
  }, []);
  const handleSubmitWish = async (e) => {
    e.preventDefault();
    setSubmitError(""); // Clear previous errors

    // --- Validation ---
    if (!guestName.trim()) {
      setSubmitError("Nama tidak boleh kosong.");
      return;
    }
    if (!attendance) {
      setSubmitError("Mohon pilih status kehadiran Anda.");
      return;
    }
    if (!newWish.trim()) {
      setSubmitError("Pesan harapan tidak boleh kosong.");
      return;
    }
    // --- End Validation ---

    setIsSubmitting(true);

    // --- Prepare Data for API ---
    const newWishObj = {
      name: guestName, // Use state variable
      message: newWish, // Use state variable
      hadir: attendance, // Use state variable
      timestamp: new Date().toISOString(),
    };

    try {
      // --- Call API to Save Wish ---
      const response = await fetch(
        "https://x8ki-letl-twmt.n7.xano.io/api:NCs9IuT1/wish",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newWishObj),
        }
      );

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || "Gagal menyimpan harapan.");
      }

      // --- Update State with API Response ---
      setWishes((prev) => [newWishObj, ...prev]);

      // --- Clear Form Fields ---
      setGuestName("");
      setNewWish("");
      setAttendance("");
      fetchWishes();
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000); // Hide confetti after 3 seconds
    } catch (error) {
      setSubmitError(error.message);
    }

    setIsSubmitting(false);
  };

  // Map internal state value to display icon correctly
  const getAttendanceIcon = (status) => {
    switch (status) {
      case "ATTENDING": // Match option values
        return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case "NOT_ATTENDING": // Match option values
        return <XCircle className="w-4 h-4 text-rose-500" />;
      case "MAYBE": // Match option values
        return <HelpCircle className="w-4 h-4 text-amber-500" />;
      default:
        return null;
    }
  };

  return (
    <>
      <section id="wishes" className="min-h-screen relative overflow-hidden">
        {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
        <div className="container mx-auto px-4 py-20 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-4 mb-16"
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block text-rose-500 font-medium"
            >
              Kirimkan Doa dan Harapan Terbaik Anda
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-serif text-gray-800"
            >
              Pesan dan Doa
            </motion.h2>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-4 pt-4"
            >
              <div className="h-[1px] w-12 bg-rose-200" />
              <MessageCircle className="w-5 h-5 text-rose-400" />
              <div className="h-[1px] w-12 bg-rose-200" />
            </motion.div>
          </motion.div>

          {/* Wishes List */}
          <div className="max-w-2xl mx-auto space-y-6">
            {wishes.length > 0 ? ( // Only show Marquee if there are wishes
              <AnimatePresence>
                <Marquee
                  pauseOnHover // Good practice for marquee
                  speed={20}
                  gradient={false}
                  className="[--duration:10s] py-2"
                >
                  {wishes.map((wish, index) => (
                    <motion.div
                      key={wish.id} // Use unique ID
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.1 }} // Simple stagger effect
                      className="group relative w-[280px] mx-2" // Added margin for spacing in marquee
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-rose-100/50 to-pink-100/50 rounded-xl transform transition-transform group-hover:scale-[1.02] duration-300" />
                      <div className="relative backdrop-blur-sm bg-white/80 p-4 rounded-xl border border-rose-100/50 shadow-md h-full flex flex-col">
                        {" "}
                        {/* Ensure consistent height */}
                        <div className="flex items-start space-x-3 mb-2">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-rose-400 to-pink-400 flex items-center justify-center text-white text-sm font-medium">
                              {wish.name ? wish.name[0].toUpperCase() : "?"}{" "}
                              {/* Handle empty name */}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2">
                              <h4 className="font-medium text-gray-800 text-sm truncate">
                                {wish.name || "Anonymous"}{" "}
                                {/* Handle empty name */}
                              </h4>
                              {getAttendanceIcon(wish.attend)}{" "}
                              {/* Use correct state value */}
                            </div>
                            <div className="flex items-center space-x-1 text-gray-500 text-xs">
                              <Clock className="w-3 h-3" />
                              <time className="truncate">
                                {formatEventDate(wish.timestamp)}
                              </time>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed mb-2 line-clamp-3 flex-grow">
                          {" "}
                          {/* Allow message to grow */}
                          {wish.message}
                        </p>
                        {Date.now() - new Date(wish.timestamp).getTime() <
                          3600000 * 1 && ( // Show "New" for 1 hour
                          <div className="absolute top-2 right-2">
                            <span className="px-2 py-1 rounded-full bg-rose-100 text-rose-600 text-xs font-medium">
                              New
                            </span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </Marquee>
              </AnimatePresence>
            ) : (
              <div className="text-center text-gray-500 py-4">
                Belum ada pesan. Jadilah yang pertama!
              </div>
            )}
          </div>

          {/* Wishes Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-2xl mx-auto mt-12"
          >
            <form onSubmit={handleSubmitWish} className="relative">
              <div className="backdrop-blur-sm bg-white/80 p-6 rounded-2xl border border-rose-100/50 shadow-lg">
                <div className="space-y-4">
                  {" "}
                  {/* Increased spacing */}
                  {/* Name Input - Controlled */}
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-gray-500 text-sm mb-1">
                      <User className="w-4 h-4" />
                      <span>Nama Kamu</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Masukan nama kamu..."
                      className="w-full px-4 py-2.5 rounded-xl bg-white/50 border border-rose-100 focus:border-rose-300 focus:ring focus:ring-rose-200 focus:ring-opacity-50 transition-all duration-200 text-gray-700 placeholder-gray-400"
                      value={guestName} // Bind value to state
                      onChange={(e) => setGuestName(e.target.value)} // Update state on change
                      required // Keep HTML5 validation
                    />
                  </div>
                  {/* Attendance Dropdown */}
                  <motion.div
                    initial={{ opacity: 0 }} // Simplified animation
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="space-y-1 relative" // Reduced vertical space needed
                  >
                    <div className="flex items-center space-x-2 text-gray-500 text-sm mb-1">
                      <Calendar className="w-4 h-4" />
                      <span>Apakah kamu akan hadir?</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsOpen(!isOpen)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/50 border border-rose-100 focus:border-rose-300 focus:ring focus:ring-rose-200 focus:ring-opacity-50 transition-all duration-200 text-left flex items-center justify-between"
                    >
                      <span
                        className={
                          attendance ? "text-gray-700" : "text-gray-400"
                        }
                      >
                        {attendance
                          ? options.find((opt) => opt.value === attendance)
                              ?.label
                          : "Pilih kehadiran..."}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                          isOpen ? "transform rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }} // Animate height
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="absolute z-20 w-full mt-1 bg-white rounded-xl shadow-lg border border-rose-100 overflow-hidden" // Higher z-index
                        >
                          {options.map((option) => (
                            <motion.button
                              key={option.value}
                              type="button"
                              onClick={() => {
                                setAttendance(option.value);
                                setIsOpen(false);
                              }}
                              whileHover={{
                                backgroundColor: "rgb(255, 241, 242)",
                              }} // Use framer motion hover
                              className={`w-full px-4 py-2.5 text-left transition-colors duration-150
                                ${
                                  attendance === option.value
                                    ? "bg-rose-50 text-rose-600 font-medium"
                                    : "text-gray-700 hover:bg-rose-50"
                                }`}
                            >
                              {option.label}
                            </motion.button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                  {/* Wish Textarea - Controlled */}
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-gray-500 text-sm mb-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>Harapan kamu</span>
                    </div>
                    <textarea
                      placeholder="Kirimkan harapan dan doa untuk kedua mempelai..."
                      className="w-full h-32 p-4 rounded-xl bg-white/50 border border-rose-100 focus:border-rose-300 focus:ring focus:ring-rose-200 focus:ring-opacity-50 resize-none transition-all duration-200 text-gray-700 placeholder-gray-400" // Added text color
                      value={newWish} // Bind value to state
                      onChange={(e) => setNewWish(e.target.value)} // Update state on change
                      required // Keep HTML5 validation
                    />
                  </div>
                </div>

                {/* Submit Error Message */}
                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 text-center text-sm text-red-600"
                  >
                    {submitError}
                  </motion.div>
                )}

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-2 text-gray-500">
                    <Smile className="w-5 h-5" />
                    <span className="text-sm">Berikan Doa Anda</span>
                  </div>
                  <motion.button
                    type="submit" // Explicitly set type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting} // Disable button when submitting
                    className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl text-white font-medium transition-all duration-200 outline-none focus:ring-2 focus:ring-rose-300 focus:ring-offset-1
                    ${
                      isSubmitting
                        ? "bg-gray-400 cursor-not-allowed" // Use gray for disabled state
                        : "bg-rose-500 hover:bg-rose-600"
                    }`}
                  >
                    <Send className="w-4 h-4" />
                    <span>
                      {isSubmitting ? "Mengirim..." : "Kirim Doa"}{" "}
                      {/* Slightly adjusted text */}
                    </span>
                  </motion.button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
}
