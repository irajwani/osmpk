import React, { Component } from 'react'

export default class DivWithTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: 
            [
               {
                  "id":1,
                  "name":"Foo",
                  "age":"20"
               },
               {
                  "id":2,
                  "name":"Bar",
                  "age":"30"
               },
               {
                  "id":3,
                  "name":"Baz",
                  "age":"40"
               }
            ]
         }
    }
  render() {
    return (
      <div style={{flex: 1, backgroundColor: 'red'}}>
        <p>Hello Table</p>
        <table>
            <tbody>
                {this.state.data.map((person, i) => 
                <TableRow key = {i} data = {person} />)}
            </tbody>
        </table>
      </div>
    )
  }
}

class TableRow extends React.Component {
    render() {
       return (
          <tr>
             <td>{this.props.data.id}</td>
             <td>{this.props.data.name}</td>
             <td>{this.props.data.age}</td>
          </tr>
       );
    }
 }

 //Might be helpful for sizes view
