import { motion } from 'framer-motion';
import { imageFloatingVariants } from './AnimationVariants';

const AuthImage = () => {
  return (
    <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
      <motion.div
        className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/authimg.png')" }}
        initial={{ y: 0 }}
        animate="animate"
        variants={imageFloatingVariants}
      ></motion.div>
    </div>
  );
};

export default AuthImage;
