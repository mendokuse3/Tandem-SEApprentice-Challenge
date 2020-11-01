import './App.css';
import React from 'react';
import Question from './components/Question';
import data from './Data/Apprentice_TandemFor400_Data.json';

class App extends React.Component {
  state = {
    currentQuestion: 0,
    questionPool: [],
    score: 0,
    submitted: false
  }

  setCurrentAnswer = (ans) => {
    this.setState({currentQuestionAnswer: ans})
  }

  updateScore = (amount) => {
    this.setState({score: this.state.score + amount})
  }
  
  goToNext = () => {
    if(this.state.currentQuestion < 9){
      this.setState({
        currentQuestion: this.state.currentQuestion + 1,
        choices: [...this.state.questionPool[this.state.currentQuestion + 1].incorrect, this.state.questionPool[this.state.currentQuestion + 1].correct]
      })
    }
    else (
      this.setState({
        currentQuestion: this.state.currentQuestion + 1
      })
    )
    this.submitAnswer(false)
  }

  goBack = () => {
    this.setState({
      currentQuestion: this.state.currentQuestion - 1,
      choices: [...this.state.questionPool[this.state.currentQuestion - 1].incorrect, this.state.questionPool[this.state.currentQuestion - 1].correct],
      submitted: false
    })
  }

  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  componentDidMount(){
    let pool = this.shuffle(data).slice(0, 10)
    // console.log(pool)
    this.setState({
      questionPool: pool,
      choices: [...pool[this.state.currentQuestion].incorrect, pool[this.state.currentQuestion].correct]
    })
  }

  restart = () => {
    let reset = this.shuffle(data).slice(0, 10)
    this.setState({
      currentQuestion: 0,
      questionPool: reset,
      score: 0
    })
    // console.log(reset)
  }

  submitAnswer= (bool) => {
    this.setState({submitted: bool})
  }

  render(){
    return (
      <div className="App">
        {/* <Question data={data[0]} setCurrentAnswer={this.setCurrentAnswer}/> */}
        {this.state.questionPool.map((question, i) => {
          return (
            <Question data={question} submitAnswer={this.submitAnswer} submitted={this.state.submitted} choices={this.state.choices} currentQuestion={this.state.currentQuestion} questionNumber={i} score={this.state.score} updateScore={this.updateScore} key={i}/>
          )
        })}
        {this.state.currentQuestion === 10 && 
          <div className='end-message'>
            <h2>Your score was: {this.state.score}</h2>
            <h3>Would you like to try another round?</h3>
            <button onClick={this.restart}>Start Another Round</button>
          </div>
        }
        <div className='navigation'>
          {this.state.currentQuestion > 0 && <button onClick={this.goBack}>Back</button>}
          {this.state.currentQuestion < 10 && <button onClick={this.goToNext}>Next</button>}
        </div>
      </div>
    );
  }
}

export default App;
