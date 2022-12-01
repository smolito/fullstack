import Part from './Part'

const Content = (content) => {
    //console.log(Object.keys(content.parts));
    const parts = content.parts

    return(
        //<Part name={parts[0].name} exercises={parts[0].exercises} />
        <ul>
            {
                parts.map(part =>
                    <li key={part.id}>
                        <Part name={part.name} exercises={part.exercises} />
                    </li>
                    )
            }
        </ul>
    )
}

export default Content