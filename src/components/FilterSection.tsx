import { useState } from 'react';
import { motion } from 'framer-motion';

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
            <div className="flex gap-2 relative">
              {['today', 'week', 'month', 'year'].map(period => (
                <motion.div key={period} className="relative">
                  {selectedDateFilterBtn === period && (
                    <motion.div
                      className="absolute inset-0 rounded-md bg-gradient-to-tr from-my-raspberry to-my-eggplant"
                      layoutId="dateIndicator"
                      initial={{ borderRadius: 6 }}
                      animate={{ borderRadius: 6 }}
                      transition={{
                        type: 'spring',
                        stiffness: 600,
                        damping: 35,
                      }}
                    />
                  )}
                  <motion.button
                    onClick={() => handleDateFilterChange(period as any)}
                    className={`px-4 py-2 text-sm font-medium rounded-md shadow-sm relative z-10 ${
                      selectedDateFilterBtn === period
                        ? 'text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                    whileHover={{
                      scale: 1.05,
                      transition: {
                        type: 'spring',
                        stiffness: 400,
                        damping: 10,
                      },
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {period === 'today' && 'Aujourdhui'}
                    {period === 'week' && 'Cette semaine'}
                    {period === 'month' && 'Ce mois'}
                    {period === 'year' && 'Cette année'}
                  </motion.button>
                </motion.div>
              ))}
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
            <div className="flex gap-2 flex-wrap relative">
              {['all', 'draft', 'pending', 'paid', 'cancelled'].map(status => (
                <motion.div key={status} className="relative">
                  {selectedPaymentFilterBtn === status && (
                    <motion.div
                      className="absolute inset-0 rounded-md bg-gradient-to-tr from-blue-500 to-indigo-600"
                      layoutId="paymentIndicator"
                      initial={{ borderRadius: 6 }}
                      animate={{ borderRadius: 6 }}
                      transition={{
                        type: 'spring',
                        stiffness: 600,
                        damping: 35,
                      }}
                    />
                  )}
                  <motion.button
                    onClick={() => handlePaymentFilterChange(status as any)}
                    className={`px-4 py-2 text-sm font-medium rounded-md shadow-sm relative z-10 ${
                      selectedPaymentFilterBtn === status
                        ? 'text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                    whileHover={{
                      scale: 1.05,
                      transition: {
                        type: 'spring',
                        stiffness: 400,
                        damping: 10,
                      },
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {status === 'all' && 'Toutes'}
                    {status === 'draft' && 'Brouillons'}
                    {status === 'pending' && 'En attente'}
                    {status === 'paid' && 'Payées'}
                    {status === 'cancelled' && 'Annulées'}
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default FilterSection;
