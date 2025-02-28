export default function Button({ btnStyle, children,...props }) {
  return (
      <button
      {...props}
        className={`${
          btnStyle ? btnStyle : "h-10 rounded-md px-2 flex-1 justify-self-center w-full"
        } h-10`}
      >
        {children ? children : "submit"}
      </button>
  );
}
