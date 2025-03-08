import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FilterSection = () => {
  const [selectedPaymentFilterBtn, setSelectPaymentFilterBtn] = useState<
    'all' | 'draft' | 'paid' | 'cancelled' | 'pending'
  >('all');
  const [selectedDateFilterBtn, setSelectedDateFilterBtn] = useState<
    'today' | 'week' | 'month' | 'year'
  >('today');

  const getSelectedPaymentFilterBtn = (
    btn: 'all' | 'draft' | 'paid' | 'cancelled' | 'pending'
  ) => {
    if (selectedPaymentFilterBtn === btn) {
      return 'bg-gradient-to-tr from-blue-500 to-indigo-600 text-white';
    }
    return 'bg-white text-gray-700 hover:bg-gray-100';
  };

  const getSelectedDateFilterBtn = (
    btn: 'today' | 'week' | 'month' | 'year'
  ) => {
    if (selectedDateFilterBtn === btn) {
      return 'bg-gradient-to-tr from-my-raspberry to-my-eggplant text-white';
    }
    return 'bg-white text-gray-700 hover:bg-gray-100';
  };

  const handleDateFilterChange = (
    period: 'today' | 'week' | 'month' | 'year'
  ) => {
    setSelectedDateFilterBtn(period);
    // // Recharger les données avec le nouveau filtre
    // setLoading(true);
    // getDashboard(
    //   auth.loggedAccountInfos?._id!,
    //   auth.token!,
    //   period,
    //   selectedPaymentFilterBtn
    // )
    //   .then(data => {
    //     if (data.success) {
    //       setDashboardData(data.dashboardData);
    //       setLoading(false);
    //     } else {
    //       setError("Une erreur s'est produite lors du filtrage des données");
    //       setLoading(false);
    //     }
    //   })
    //   .catch(error => {
    //     setError("Une erreur s'est produite lors du filtrage des données");
    //     setLoading(false);
    //   });
  };

  const handlePaymentFilterChange = (
    status: 'all' | 'draft' | 'paid' | 'cancelled' | 'pending'
  ) => {
    setSelectPaymentFilterBtn(status);
    // // Recharger les données avec le nouveau filtre
    // setLoading(true);
    // getDashboard(
    //   auth.loggedAccountInfos?._id!,
    //   auth.token!,
    //   selectedDateFilterBtn,
    //   status
    // )
    //   .then(data => {
    //     if (data.success) {
    //       setDashboardData(data.dashboardData);
    //       setLoading(false);
    //     } else {
    //       setError("Une erreur s'est produite lors du filtrage des données");
    //       setLoading(false);
    //     }
    //   })
    //   .catch(error => {
    //     setError("Une erreur s'est produite lors du filtrage des données");
    //     setLoading(false);
    //   });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.section
      className="mb-6 mt-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="bg-white rounded-lg shadow p-4 overflow-hidden"
        whileHover={{ boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.05)' }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-start flex-wrap gap-4 relative">
          <motion.div variants={itemVariants}>
            <motion.h3
              className="text-sm font-medium text-gray-700 mb-3"
              whileHover={{ x: 3 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Filtrer par période
            </motion.h3>
            <div className="flex gap-2">
              <AnimatePresence mode="wait">
                {['today', 'week', 'month', 'year'].map(period => (
                  <motion.button
                    key={period}
                    onClick={() => handleDateFilterChange(period as any)}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all shadow-sm ${getSelectedDateFilterBtn(
                      period as any
                    )}`}
                    whileHover={{
                      scale: 1.05,
                      transition: {
                        type: 'spring',
                        stiffness: 400,
                        damping: 10,
                      },
                    }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0.8 }}
                    animate={{
                      opacity: 1,
                      scale: selectedDateFilterBtn === period ? 1.03 : 1,
                    }}
                    layout
                  >
                    {period === 'today' && 'Aujourdhui'}
                    {period === 'week' && 'Cette semaine'}
                    {period === 'month' && 'Ce mois'}
                    {period === 'year' && 'Cette année'}

                    {selectedDateFilterBtn === period && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full"
                        layoutId="dateUnderline"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.h3
              className="text-sm font-medium text-gray-700 mb-3"
              whileHover={{ x: 3 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Filtrer par statut
            </motion.h3>
            <div className="flex gap-2 flex-wrap">
              <AnimatePresence mode="wait">
                {['all', 'draft', 'pending', 'paid', 'cancelled'].map(
                  status => (
                    <motion.button
                      key={status}
                      onClick={() => handlePaymentFilterChange(status as any)}
                      className={`px-4 py-2 text-sm font-medium rounded-md transition-all shadow-sm ${getSelectedPaymentFilterBtn(
                        status as any
                      )}`}
                      whileHover={{
                        scale: 1.05,
                        transition: {
                          type: 'spring',
                          stiffness: 400,
                          damping: 10,
                        },
                      }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0.8 }}
                      animate={{
                        opacity: 1,
                        scale: selectedPaymentFilterBtn === status ? 1.03 : 1,
                      }}
                      layout
                    >
                      {status === 'all' && 'Toutes'}
                      {status === 'draft' && 'Brouillons'}
                      {status === 'pending' && 'En attente'}
                      {status === 'paid' && 'Payées'}
                      {status === 'cancelled' && 'Annulées'}

                      {selectedPaymentFilterBtn === status && (
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full"
                          layoutId="paymentUnderline"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </motion.button>
                  )
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default FilterSection;
