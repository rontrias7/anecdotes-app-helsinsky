import { useState } from 'react'
import './app.css'
import { BiUpvote } from 'react-icons/bi'

// Just because this is a practice exercise all the
// components are placed in the same jsx.
// Maybe I'll change this in a future.


function App() {

  const anecdotes = [

   'If it hurts, do it more often.',
   'Adding manpower to a late software project makes it later!',
   'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
   'Premature optimization is the root of all evil.',
   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
   'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ];

  // Setting up the selected item status
  const [selected, setSelected] = useState(0)
  // Setting up the Array which contains the votes
  const [allVotes, setAllVotes] = useState(Array(7).fill(0))

  // Function that moves to the nex quote
  // adding one to the selected status.
  const nextQuote = () => {

    selected < anecdotes.length-1 ? setSelected(selected +1) : setSelected(0);
  }

  // Function that update the vote status adding one
  // to the item with the 'selected' index.
  let voteThis = () => {

    let updatedVotes = [...allVotes];
    updatedVotes[selected] += 1;
    setAllVotes(updatedVotes);

  }

  return (

    <div className='main-container'>
      <div className="quote-container container">
      <p className="selected-anecdote">{anecdotes[selected]}</p>
      {allVotes[selected] != 0? <p className='votes'>This quote has {allVotes[selected]} votes. </p> : <p className='votes'>This quote has no votes yet.</p>}
    </div>
      <div className="buttons-container">
        <Button text="vote" icon={<BiUpvote />} onClick={voteThis} />
        <Button text="Next anecdote" onClick={nextQuote} />
      </div>
      <div className="container">
      < DisplayMostVoted  allVotes={allVotes} anecdotes={anecdotes}/>
      </div>
    </div>
  );

}

  // Input props => Text and onClick
  // Output HTMLButton
  const Button = ({text, icon, onClick}) => {

    return(
      <button className="button" onClick={onClick}>{text}{icon}</button>
    )

  }


  // Input props => allVotes & anecdotes object
  // Output => most voted quote or 'No votes yet' if no votes.
  const DisplayMostVoted = ({allVotes, anecdotes}) => {


    let mostVoted = Math.max(...allVotes)
    let mostVotedIndex = allVotes.indexOf(mostVoted)


    return (

      // Conditional rendering
      mostVoted > 0 ?
      (<div className="most-voted-container">
      <p className="secondary-text">The most voted anecdote is:</p>
      <h4>{anecdotes[mostVotedIndex]}</h4>
      <p className="secondary-text"> with {mostVoted} votes</p>
      </div>)

      : <p> No votes yet.</p>

    );
  }



export default App
