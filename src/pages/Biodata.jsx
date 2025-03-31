import { motion } from "framer-motion";
import { Heart } from "lucide-react";
export default function Biodata() {
  return (
    <>
      {/* Location section */}
      <section id="biodata">
        <div className="container mx-auto px-4 text-center">
          <div className="grid grid-cols-1 gap-12 max-w-4xl mx-auto">
            {/* Groom */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-gray-800"
            >
              <h3 className="text-2xl font-serif">Alenovan Wiradhika Putra</h3>
              <p className="mt-2 text-gray-600">Putra dari</p>
              <p className="mt-2 text-gray-600">
                Bapak Abdul Muhyi & Ibu Kristin
              </p>
            </motion.div>

            {/* Bride */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-gray-800"
            >
              <h3 className="text-2xl font-serif">Fulan Sab'atun Nurlaili</h3>
              <p className="mt-2 text-gray-600">Putri dari</p>
              <p className="mt-2 text-gray-600 text-bold">
                Bapak Istiyar & Ibu Supiani
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
