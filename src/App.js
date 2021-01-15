import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import firebase from 'firebase'
import 'firebase/database'

import { firebaseConfig } from './database';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

class App extends Component {

  constructor() {
    super();
    this.state = {
      listaFolios: []
    }
  }

  componentDidMount() {
    this.getFolios()
  }

  async getFolios() {
    let obj;
    let lista = []
    const querySnapshot = await db.collection("folio").get();
    querySnapshot.forEach((doc) => {
      obj = doc.data() 
      obj.id = doc.id 
      lista.push(obj)
    });
    this.setState({
      listaFolios: lista
    })
  }


  render() {
    const { listaFolios } =  this.state
    return (
      <div className="App">

        

        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col"><img src={logo} className="App-logo" alt="logo" /></th>
              <th scope="col">Codigo</th>
              <th scope="col">Ciudad</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
            {listaFolios.map((folio, index) => (
               <tr key={folio.id}>
                 <td>{index+1}</td>
                 <td>{folio.codigo}</td>
                 <td>{folio.ciudad}</td>
                 <td>{folio.email}</td>
              </tr> 
            )) }
             
          </tbody>
        </table>

      </div>
    );
  }

}

export default App;
