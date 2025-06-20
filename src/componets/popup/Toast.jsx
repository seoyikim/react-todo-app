import './Toast.scss';

const Toast = ({ message, isVisible, type = 'info' }) => {
  if (!isVisible) return null;

  return (
    <div className={`toast ${type}`}>
      {message}
    </div>
  );
};

export default Toast; 
