import './App.css';

function MyButton() {
  return (
    <button>
      Click next
    </button>
  );
}

export default function MyApp() {
  return (
    <div>
      <h1>Welcome to shoppist.com</h1>
      <MyButton />
    </div>
  )
}