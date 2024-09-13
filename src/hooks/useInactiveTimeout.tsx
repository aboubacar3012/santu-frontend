import { useState, useEffect } from "react";

// Hook personnalisé pour détecter l'inactivité de l'utilisateur
function useInactiveTimeout(inactiveTime = 15 * 60 * 1000) { // 15 minutes par défaut
  const [isInactive, setIsInactive] = useState(false);

  useEffect(() => {
    let timeoutId: string | number | NodeJS.Timeout | undefined;

    // Fonction pour définir l'utilisateur comme inactif après une période définie
    function setInactive() {
      setIsInactive(true);
    }

    // Réinitialiser le délai d'inactivité
    function resetTimer() {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(setInactive, inactiveTime);
    }

    // Réinitialiser le délai d'inactivité chaque fois qu'il y a une interaction utilisateur
    function handleAccountActivity() {
      setIsInactive(false);
      resetTimer();
    }

    // Débuter la détection de l'inactivité
    resetTimer();

    // Écouter les événements d'interaction utilisateur pour réinitialiser le délai d'inactivité
    window.addEventListener('mousemove', handleAccountActivity);
    window.addEventListener('keydown', handleAccountActivity);

    // Nettoyer les écouteurs d'événements lors du démontage du composant
    return () => {
      window.removeEventListener('mousemove', handleAccountActivity);
      window.removeEventListener('keydown', handleAccountActivity);
      clearTimeout(timeoutId);
    };
  }, [inactiveTime]);

  return isInactive;
}

export default useInactiveTimeout;