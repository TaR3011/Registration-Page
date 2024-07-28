const Dialog = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog-content">
        <h2>Submission Successful</h2>
        <p>Let's go, we will see your profile.</p>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

export default Dialog;
