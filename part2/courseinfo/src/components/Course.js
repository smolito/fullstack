import Header from './Header'
import Content from './Content'

const Course = (props) => {
    //console.log(props.arrayOfContents)
    //const { course } = props
    return (
      <div>
        <Header name={props.header} />
        <Content parts={props.arrayOfContents} />
      </div>
    )
  }

  export default Course