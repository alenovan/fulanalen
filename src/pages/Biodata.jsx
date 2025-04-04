import { motion } from "framer-motion";
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
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-gray-800 text-center"
            >
              <img
                src="/images/alen.jpg"
                alt="Alenovan Wiradhika Putra"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover object-top"
              />
              <h3 className="text-2xl font-serif">Alenovan Wiradhika Putra</h3>
              <p className="mt-2 text-gray-600">Putra dari</p>
              <p className="mt-2 text-gray-600 font-bold">
                Bapak Abdul Muhyi & Ibu Kristin
              </p>
            </motion.div>

            {/* Bride */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-gray-800 text-center"
            >
              <img
                src="/images/fulan.png"
                alt="Fulan Sab'atun Nurlaili"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover object-top"
              />

              <h3 className="text-2xl font-serif">
                Fulan Sab&apos;atun Nurlaili
              </h3>
              <p className="mt-2 text-gray-600">Putri dari</p>
              <p className="mt-2 text-gray-600 font-bold">
                Bapak Istiyar & Ibu Supiani
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
