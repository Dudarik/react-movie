import Movies from "../components/Movies"

export default function Main(props){
  return (
    <main className="container content">
      <Movies movies={props.movies}/>
    </main>
  )
}