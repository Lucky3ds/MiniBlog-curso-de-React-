import styles from "./CreatePost.module.css"
import {useState} from "react"
import {useNavigate} from "react-router-dom"
import {useAuthValue} from "../../context/AuthContext"
import { useInsertDocument } from "../../hooks/useInsertDocument"


const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = useState("");

    const {user} = useAuthValue();

    const {insertDocument, response} = useInsertDocument("posts");
 
    const navigate = useNavigate();

    const handleSubmit = (e) =>{
      e.preventDefault();

      setFormError("");

      //validate image URL
      try {
        new URL(image);
      } catch (error) {
        setFormError("A imagem precisa ser uma URL... ಠ_ಠ")
      }
      //criar o array de tags
      const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase())

      //checar todos os valores
      if(!title || !image|| !tags|| !body){
       setFormError("Por favor, prencha todos os campos...  (◉ω◉)");
      }
      if(formError){
        return;
      }

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    })
    //redirected to home page
    navigate("/");
    }

  return (
    <div className={styles.create_post}>
        <h2>Crie seu post!</h2>
        <p>Crie seu post e começe a interagir agora mesmo!</p>
        <form onSubmit={handleSubmit}>
          <label>
              <span>Titulo:</span>
              <input type="text" name="title" required placeholder="Crie em bom titulo para seu post..." onChange={(e) => setTitle(e.target.value)}
              value={title}
              />
          </label>
          <label>
              <span>URL da imagem:</span>
              <input type="text" name="image" required placeholder="Encontre uma boa imagem e copie seu URL e cole aqui, para adcionar uma imagem:)" onChange={(e) => setImage(e.target.value)}
              value={image}
              />
          </label>
          <label>
              <span>Conteúdo do post:</span>

              <textarea name="body" required placeholder="Digite o qualquer comentário que quiser sobre o post..."  onChange={(e) => setBody(e.target.value)}
              value={body}
              ></textarea>

          </label>
          <label>
              <span>Tags do Post:</span>
              <input type="text" name="title" required placeholder="Insira as tags separadas virgulas (,) para que tudo ocorra bem :)" onChange={(e) => setTags(e.target.value)}
              value={tags}
              />
          </label>

          {!response.loading && <button className="btn">Criar post!</button>}
        {response.loading && (
          <button className="btn" disabled>
            Aguarde.. .
          </button>
        )}
        {(response.error || formError) && (
          <p className="error">{response.error || formError}</p>
        )}
        </form>
    </div>
  )
}

export default CreatePost;