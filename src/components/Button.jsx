export default function Button({ styles, handleClick, children }) {
  return (
    <div onClick={handleClick ? handleClick : null} className={styles}>
      {children}
    </div>
  );
}
