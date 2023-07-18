import React from 'react'
import './App.css'

const rowStyles = {
  greenSquare: {
    color: 'green',
    fontWeight: 'bold'
  },
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstRow: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      secondRow: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    };
  }

  render() {
    const firstRowNumbers = this.state.firstRow.map((number) => (
      <th key={number} className='horizontalRow'>{number}</th>
    ));

    const multiplicationTable = this.state.firstRow.map((rowMultiplier) => {
      const rowValues = this.state.secondRow.map((columnMultiplier) => {
        const product = rowMultiplier * columnMultiplier;
        const isSquare = rowMultiplier === columnMultiplier;

        return (
          <td key={columnMultiplier} style={isSquare ? rowStyles.greenSquare : {}}>
            {product}
          </td>
        );
      });
      return (
        <tr key={rowMultiplier} className='border-bottom'>
          <th>{rowMultiplier}</th>
          {rowValues}
        </tr>
      );
    });

    return (
      <table>
        <thead>
          <tr className='border-bottom'>
            <th className='multiplicationSign'>X</th>
            {firstRowNumbers}
          </tr>
        </thead>
        <tbody>
          {multiplicationTable}
        </tbody>
      </table>
    );
  }
}
