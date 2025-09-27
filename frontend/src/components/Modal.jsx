import { useEffect } from 'react';
import { X } from 'lucide-react';

// Composant Modal moderne React remplaçant jQuery modal
// Utilise les portals React et gestion d'état moderne
const Modal = ({ 
  isOpen, 
  onClose, 
  title = '', 
  children,
  size = 'medium',
  showCloseButton = true 
}) => {
  // Fermeture avec Échap (amélioration UX vs jQuery)
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Empêche le scroll
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    small: 'max-w-sm',
    medium: 'max-w-md',
    large: 'max-w-2xl',
    full: 'max-w-4xl'
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className={`modal-content ${sizeClasses[size]}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* En-tête avec titre et bouton fermer */}
        {(title || showCloseButton) && (
          <div className="modal-header">
            {title && <h2 className="modal-title">{title}</h2>}
            {showCloseButton && (
              <button 
                className="modal-close-btn"
                onClick={onClose}
                aria-label="Fermer"
              >
                <X size={20} />
              </button>
            )}
          </div>
        )}
        
        {/* Contenu principal */}
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
