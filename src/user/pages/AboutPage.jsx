import React from 'react';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'Актуальные данные',
    desc: 'Наша база регулярно обновляется, чтобы вы получали только свежую информацию.',
    img: 'https://images.unsplash.com/photo-1617791160514-6b676e0e3063?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Удобный интерфейс',
    desc: 'Современный дизайн и интуитивный поиск — всё для вашего удобства.',
    img: 'https://images.unsplash.com/photo-1612831455543-e39fa3a64fba?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Надёжность и поддержка',
    desc: 'Наша команда всегда готова помочь вам на каждом этапе выбора автомобиля.',
    img: 'https://images.unsplash.com/photo-1621260091830-e6e2c983b81d?auto=format&fit=crop&w=800&q=80',
  }
];

const AboutPage = () => {
  return (
    <div className="p-6 pt-28 bg-gradient-to-b from-white to-gray-100 min-h-screen">
      {/* Заголовок и описание */}
      <motion.div
        className="max-w-5xl mx-auto text-center mb-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-4">О компании</h1>
        <p className="text-gray-600 text-lg">
          Добро пожаловать в CarCatalog — платформу, где вы можете исследовать, сравнивать и находить автомобили своей мечты.
        </p>
      </motion.div>

      {/* Миссия и команда */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20 max-w-6xl mx-auto">
        <motion.div
          className="rounded-2xl overflow-hidden shadow-xl bg-white"
          whileHover={{ scale: 1.02 }}
        >
          <img
            src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80"
            alt="Office"
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Наша миссия</h2>
            <p className="text-gray-600">
              Обеспечить удобный и интуитивный доступ к информации о машинах, помогая пользователям принимать обоснованные решения при покупке.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="rounded-2xl overflow-hidden shadow-xl bg-white"
          whileHover={{ scale: 1.02 }}
        >
          <img
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80"
            alt="Team"
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Наша команда</h2>
            <p className="text-gray-600">
              Мы — команда разработчиков и автоэнтузиастов, объединённых одной целью: сделать поиск и выбор автомобиля легким, быстрым и приятным.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Почему выбирают нас */}
      <div className="text-center max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Почему выбирают нас?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 120 }}
            >
              <img
                src={feature.img}
                alt={feature.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
