import React, { Component } from 'react';
import logo from './logo.svg';
import foods from './foods.json'
import FoodBox from './FoodBox'
import Search from "./Search"
import 'bulma/css/bulma.css';
import './App.css';

class App extends Component {
  state = {
    myFoods : [...foods],
    open: false
  }

  addFood = (e) => {

    console.log(e.target.getAttribute('calories'))
    console.log(e.target.name)

  }

  searchInput = (e) => {
    console.log(e.target.value) // THIS IS MUY IMPORTANTE
    let search  = e.target.value
    let filteredFoods = foods.filter(food => {
      if (food.name.toLowerCase().includes(search.toLowerCase())) {
        return food
      }
    })

    this.setState({
      myFoods: filteredFoods
    })
  }

  closeForm = () => {
    let updatedFoods = [...this.state.myFoods]
    let newFood = {
      name: this.state.name,
      calories: this.state.calories,
      image: this.state.image,
      quantity: 0
    }

    updatedFoods.push(newFood)


    this.setState({
      myFoods: updatedFoods,
      open: !this.state.open
    })
  }
  
  createForm = (e) => {
    if (this.state.open) {
      this.setState({
        [e.target.name]: e.target.value
      })
    }
    else {
      this.setState({
        open: !this.state.open
      })
    }
  }
  showForm = () => {

    if(this.state.open){
      return (
        <div>
      <form>
        <div class="field" onSubmit={this.closeForm}>
          <div class="control">
            <input class="input is-primary" type="text" name="name" placeholder="Food Name" onChange={this.createForm} />
          </div>
        </div>
        <div class="field">
          <div class="control">
            <input class="input is-primary" type="text" name="calories" placeholder="Food Calories" onChange={this.createForm}/>
          </div>
        </div>
        <div class="field">
          <div class="control">
            <input class="input is-primary" type="text" name="image" placeholder="Food Image" onChange={this.createForm} />
          </div>
        </div>
      </form>
       <button onClick={this.closeForm}>Submit New Food</button>
       </div>
      )
    } else {
      return (
      <div>
        <button onClick={this.createForm}>Add New Food</button>
        </div>
      )
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">IronNutrition</h1>

        </header>
          <Search searchInput={(e) => this.searchInput(e)} searchIt={() => this.searchIt(this.state.search)}/>
          {this.showForm()}
          
        <div>
        <div className="flexy">
          <div className="foodOptions">
            {this.state.myFoods.map((food, index) => {
                return <FoodBox food={food} key={index} addFood={()=> this.addFood} />
              })}
          </div>
          <div className="todaysFoods">
              <ul>
                <li>Today's foods</li>
                <li>total: <span>0</span> cals</li>
              </ul>
              

          </div>
        </div>


      </div>
      </div>
    );
  }
}

export default App;