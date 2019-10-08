import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Navbar from "./components/Navbar";
import cards from "./cards.json";

class App extends Component {
  // Setting this.state.cards to the cards json array
  state = {
    cards,
    score: 0,
    highScore: 0,
    alreadyClickedNames: [],
    message: ""
  };

  //array that randomly shuffles the cards, takes name
  //of each character as a parameter sent from FriendCard component.
  shuffleArray = (charName) => {

    console.log(charName);
    console.log(cards);
    let alreadyClickedNames = this.state.alreadyClickedNames;

    this.setState({ cards, alreadyClickedNames});

    //shuffles array
    cards.sort(() => Math.random() - 0.5);


    if(alreadyClickedNames.includes(charName)){
      this.newHighScore();
      this.gameOver();
      return;
    }else{
      alreadyClickedNames.push(charName)
      console.log(alreadyClickedNames)
      this.setState({score: this.state.score + 1, message: ""});
      return;
    }
    };

    newHighScore = () => {
      if(this.state.score > this.state.highScore){
        this.setState({highScore: this.state.score})
        console.log(this.state.highScore);
      }
    }

    gameOver = () => {
      this.setState({ alreadyClickedNames: [], score: 0, message: "Game Over"});
    }

  // Map over this.state.cards and render a friendCard component for each card object
  render() {
    return (
      <Wrapper>
        <Navbar score={this.state.score}
          highScore={this.state.highScore}
          message={this.state.message}/>
        {this.state.cards.map(card => (
          <FriendCard
            shuffleArray={this.shuffleArray}
            id={card.id}
            key={card.id}
            name={card.name}
            image={card.image}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;
