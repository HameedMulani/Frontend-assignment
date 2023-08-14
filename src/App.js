import React from 'react';
import Card from './Card';
import DropDown from './DropDown';
import './App.css';
import Filter from './Filter';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tickets: [],
      DataisLoaded: false,
      groupOption: 'status', 
      orderOption: 'priority', 
    };
   
  }

  componentDidMount() {
    fetch('https://apimocha.com/quicksell/data')
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          tickets: json.tickets,
          DataisLoaded: true,
        });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  render() {
    const { DataisLoaded, tickets, groupOption, orderOption } = this.state;

    if (!DataisLoaded) return <div>Loading...</div>;

    return (
      <div className="App">
        {/* <h1>Kanban Board</h1> */}
        <DropDown className='nav'
          groupOption={groupOption}
          setGroupOption={(option) => this.setState({ groupOption: option })}
          orderOption={orderOption}
          setOrderOption={(option) => this.setState({ orderOption: option })}
        />
        <Filter
          tickets={tickets}
          groupOption={groupOption}
          orderOption={orderOption}
        />
      </div>
    );
  }
}

export default App;
