import styles from "./EditPost.module.css"

import {useState, useEffect} from "react"
import {useNavigate, useParams} from "react-router-dom"
import {useAuthValue} from "../../context/AuthContext"
import {useFetchDocument} from "../../hooks/useFetchDocument"
import { useUpdateDocument } from "../../hooks/useUpdateDocument"

const EditPost = () => {
  const {id} = useParams()
  const {document: post} = useFetchDocument("posts", id)

    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = useState("");

    useEffect(() => {
      if(post){
        setTitle(post.title)
        setBody(post.body)
        setImage(post.image)
        const textTags = post.tagsArray.join(", ")
        setTags(textTags);
      }
      
    }, [post])

    const {user} = useAuthValue();

    const {updateDocument, response} = useUpdateDocument("posts");

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
      const data = {
        
          title,
          image,
          body,
          tagsArray,
          uid: user.uid,
          createdBy: user.displayName
        
      }
    updateDocument(id, data)
    //redirected to home page
    navigate("/dashboard");
    }

  return (
    
    <div className={styles.edit_post}>
       {post && (
        <>
         <h2>Editando post: {post.title}</h2>
        <p>Altere os dados do post como desejar!</p>
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
          <p className={styles.previw_title}>Preview da imagem atual:</p>
          <img className={styles.image_preview} src={post.image} alt={post.title} />
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

          {!response.loading && <button className="btn">Editar</button>}
        {response.loading && (
          <button className="btn" disabled>
            Aguarde.. .
          </button>
        )}
        {(response.error || formError) && (
          <p className="error">{response.error || formError}</p>
        )}
        </form>
        </>
       )}
    </div>
    
  )
}

export default EditPost;