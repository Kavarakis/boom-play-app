import './App.scss';
function generateTable() {
  let arr = [];
  for (let index = 0; index < 36; index++) {
    arr.push(<div key={index}></div>);
  }
  return arr;
}
function App() {
  return (
    <div className='container'>
      <main>
        <section className='board-6x6'>{generateTable()}</section>
      </main>
    </div>
  );
}

export default App;
