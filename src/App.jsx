// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

// Home Page Component
function Home() {
  return (
    <div style={sectionStyle}>
      <h1>Bienvenue dans mon Portfolio!</h1>
      <p>Explorez mes projets et compétences en 3D interactives.</p>
      <Canvas style={{ height: "50vh" }}>
        <ambientLight intensity={10} />
        <pointLight position={[10, 20, 10]} />
        <mesh rotation={[0.5, 0.5, 0]} scale={[0.5, 0.5, 0.5]}> {/* Smaller cube */}
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color="red" />
        </mesh>
        <OrbitControls />
      </Canvas>
    </div>
  );
}

// Projects Page Component
function Projects() {
  const projects = [
    { id: 1, name: "Model 1", model: "/models/myModel1.gltf", scale: 0.5 },
    { id: 2, name: "Model 2", model: "/models/myModel2.gltf", scale: 0.3 },
    { id: 3, name: "Model 3", model: "/models/myModel3.gltf", scale: 1.5 },
  ];

  return (
    <div style={sectionStyle}>
      <h1>Mes Projets</h1>
      <div style={projectGalleryStyle}>
        {projects.map((proj) => (
          <div key={proj.id} style={projectCardStyle}>
            <Canvas style={{ height: "20vh" }}>
              <ambientLight intensity={0.8} />
              <Model path={proj.model} scale={proj.scale} />
              <OrbitControls />
            </Canvas>
            <p>{proj.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Model({ path, scale = 1 }) {
  const { scene } = useGLTF(path);
  scene.scale.set(scale, scale, scale); // Adjust the scale of the model
  return <primitive object={scene} />;
}

// About Page Component
function About() {
  return (
    <div style={sectionStyle}>
      <h1>À Propos de Moi</h1>
      <p>Je suis un développeur passionné par la conception 3D et les expériences interactives.</p>
      <Canvas style={{ height: "50vh" }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 10, 10]} />
        <mesh scale={[0.8, 0.8, 0.8]}> {/* Smaller sphere */}
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="skyblue" />
        </mesh>
        <OrbitControls />
      </Canvas>
    </div>
  );
}

// Contact Page Component
function Contact() {
  return (
    <div style={sectionStyle}>
      <h1>Contactez-moi</h1>
      <form style={formStyle}>
        <input type="text" placeholder="Nom" style={inputStyle} required />
        <input type="email" placeholder="Adresse Email" style={inputStyle} required />
        <textarea placeholder="Message" style={textareaStyle} required />
        <button type="submit" style={buttonStyle}>Envoyer</button>
      </form>
    </div>
  );
}

// Navbar Component
function Navbar() {
  return (
    <nav style={navStyle}>
      <div style={logoStyle}></div>
      <div style={navLinksStyle}>
        <Link to="/" style={linkStyle}>Accueil</Link>
        <Link to="/projets" style={linkStyle}>Projets</Link>
        <Link to="/a-propos" style={linkStyle}>À Propos</Link>
        <Link to="/contact" style={linkStyle}>Contact</Link>
      </div>
    </nav>
  );
}

// App Component
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projets" element={<Projects />} />
        <Route path="/a-propos" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

// Styles
const sectionStyle = {
  textAlign: "center",
  padding: "50px 20px",
  background: "#f4f4f4",
  minHeight: "100vh",
};

const navStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "10px 20px",
  background: "#333",
};

const logoStyle = {
  width: "40px",
  height: "40px",
  backgroundColor: "white",
};

const navLinksStyle = {
  display: "flex",
  gap: "100px",
  
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "18px",
};

const projectGalleryStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "20px",
};

const projectCardStyle = {
  background: "white",
  border: "1px solid #ddd",
  borderRadius: "10px",
  padding: "10px",
  textAlign: "center",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  maxWidth: "400px",
  margin: "0 auto",
};

const inputStyle = {
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const textareaStyle = {
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  height: "100px",
};

const buttonStyle = {
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  background: "#333",
  color: "white",
  cursor: "pointer",
};

export default App;
