const Label = ({ ar, en, children }) => {
  return (
    <div className="label_container">
      <label>{en}</label>
      <label>{ar}</label>
      {children}
    </div>
  );
};

export default Label;
