
import { useState } from "react";  

function App() {

  // Je crée une variable question (le texte tapé)
  // et une fonction setQuestion pour la modifier
  const [question, setQuestion] = useState("");  

  // Je crée une variable réponse
  // et une fonction setAnswer pour la modifier
  const [answer, setAnswer] = useState("");  

  // Je crée une variable language
  // et une fonction setLanguage pour la modifier
  const [language, setLanguage] = useState("fr");  


  // Quand j’appelle cette fonction, j’envoie la question à l’API
  const sendQuestion = async () => {
    const response = await fetch("http://localhost:8000/chain/invoke", {
      // J’envoie une requête HTTP au backend
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: {
          language: language,   // Langue choisie par l’utilisateur
          text: question        // Texte tapé par l’utilisateur
        }
      }) 
    });

    // Je récupère la réponse et je la mets dans answer
    const data = await response.json();  
    setAnswer(data.output);
  };

  // Tout ce qu’il y a ici est affiché dans le navigateur
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>🌍 Traducteur IA</h2>

        <label style={styles.label}>Langue</label>
        <select
          style={styles.select}
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="fr">Français</option>
          <option value="en">Anglais</option>
          <option value="es">Espagnol</option>
        </select>

        <label style={styles.label}>Texte</label>
        <textarea
          rows="4"
          style={styles.textarea}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Écris ton texte ici..."
        />

        <button style={styles.button} onClick={sendQuestion}>
          Traduire
        </button>

        {answer && (
          <div style={styles.answerBox}>
            <strong>Traduction :</strong>
            <p>{answer}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;


// 🎨 Styles (EN DEHORS du composant)
const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f4f6f8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "10px",
    width: "400px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  label: {
    fontWeight: "bold",
    marginTop: "15px",
    display: "block",
  },
  select: {
    width: "100%",
    padding: "8px",
    marginTop: "5px",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    marginTop: "5px",
    resize: "none",
  },
  button: {
    width: "100%",
    marginTop: "20px",
    padding: "12px",
    backgroundColor: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
  },
  answerBox: {
    marginTop: "20px",
    padding: "15px",
    backgroundColor: "#eef2ff",
    borderRadius: "6px",
  },
};


