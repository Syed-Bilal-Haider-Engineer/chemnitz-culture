// import { createContext, useState, useContext } from 'react';

// const FavoritesContext = createContext();

// export const FavoritesProvider = ({ children }) => {
//   const [favorites, setFavorites] = useState([]);

//   const addFavorite = (site) => setFavorites((prev) => [...prev, site]);
//   const removeFavorite = (id) => setFavorites((prev) => prev.filter(s => s.id !== id));

//   return (
//     <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
//       {children}
//     </FavoritesContext.Provider>
//   );
// };

// export const useFavorites = () => useContext(FavoritesContext);
