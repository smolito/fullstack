import Part from './Part'

const Content = (content) => {
    //console.log(Object.keys(content.parts));
    const parts = content.parts

    const sumOfExercises = parts
    .map(part => part.exercises)
    .reduce((a, b) => a + b, 0)

    //console.log(sumOfExercises);

    return (
        //<Part name={parts[0].name} exercises={parts[0].exercises} />
        <div>
            <ul>
                {
                    parts
                    .map(part =>
                        <li key={part.id}>
                            <Part name={part.name} exercises={part.exercises} />
                        </li>
                    )
                }
            </ul>
        <p><strong>total of {sumOfExercises} exercises</strong></p>
        </div>
        
    )
}

export default Content