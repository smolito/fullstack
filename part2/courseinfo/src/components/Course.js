import Header from './Header'
import Content from './Content'

const Course = (props) => {
    //console.log(props.arrayOfContents)
    //const { course } = props
    return (
      <div>
        <h1>Web Development Curriculum</h1>
        <Header name={props.header} />
        <Content parts={props.arrayOfContents} />
      </div>
    )
  }

  export default Course