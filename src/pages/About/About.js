//css
import { Link } from "react-router-dom";
import styles from "./About.module.css";
const About = () => {
  return (
    <div className={styles.about}>
       <h2>Sobre o mini<span>blog</span></h2>
       <p>Este projeto consiste em um blog feito com React no front-end e firebase no back-end.</p>
       <p>O projeto é totalmente funcional espero que goste do que está vendo!</p>
       <Link to="/posts/create" className="btn">Criar post</Link>
    </div>
  )
}

export default About;