import React from 'react';
import Answer from './Answer';

class Question extends React.Component{
    state = {
        selected: '',
        disable: false
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.submitAnswer(true)
        if(this.state.selected === this.props.data.correct){
            this.props.updateScore(100)
        } else {
            if(this.props.score === 0){
                this.props.updateScore(0)
            } else {
                this.props.updateScore(-100)
            }
        }
        this.setState({disable: true})
    }
    handleClick = (choice) => {
        this.setState({selected: choice})
        this.props.submitAnswer(false)
    }

    render(){
        const q = this.props.data;
        return (
            <div>
                {this.props.currentQuestion === this.props.questionNumber &&
                    <div className='questions-container'>
                        <h2>{q.question}</h2>
                        <form onSubmit={(e) => this.handleSubmit(e)}>
                            {this.props.choices.map(choice => {
                                return (
                                    <div key={choice} className='choice'>
                                        <input type='radio' name='question choice' id={choice} onClick={() => this.handleClick(choice)} disabled={this.state.disable} />
                                        <label htmlFor={choice}>{choice}</label>
                                    </div>
                                )
                            })}
                            <button type='submit'>Check your answer!</button>
                        </form>
                        {this.state.selected === q.correct && this.props.submitted &&
                        <h3>Correct</h3>
                        }
                        {this.state.selected !== q.correct && this.props.submitted &&
                        <Answer answer={q.correct}/>
                        }
                    </div>
                }
            </div>
        )
    }
}

export default Question;