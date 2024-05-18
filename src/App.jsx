import { useState,useEffect } from 'react'
import './App.css'
import { Navbar } from './navbar/navbar'
import { db } from './firebase';
import { collection, addDoc,getDocs,deleteDoc,doc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

function App() {

  const [showPopUp,setShowPopUp] = useState(false)
  const [sites, setSites] = useState([]);
  const [activeMenu, setActiveMenu] = useState(null); // Para controlar el menú activo
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda


   const addSite = () => {
    setShowPopUp(prevState => !prevState);
  };
//funcion para cerrar el popup
  const closetPopUp = () =>{
    setShowPopUp(false)
  }

   // Función para obtener los datos de Firestore
   const fetchSites = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'sites'));
      const sitesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSites(sitesData);
    } catch (error) {
      console.error("Error fetching sites: ", error);
    }
  };

  // Obtener los datos cuando el componente se monta
  useEffect(() => {
    fetchSites();
  }, []);

  const handleMenuClick = (id) => {
    setActiveMenu(activeMenu === id ? null : id);
  };

  //funcion para eliminar 
  const handleDelete = async (id) => { 
    // Lógica para eliminar el sitio
    try {
      await deleteDoc(doc(db, 'sites', id));
      // Actualiza el estado local para reflejar el cambio
      setSites(prevSites => prevSites.filter(site => site.id !== id));
      console.log(`Document with ID ${id} has been deleted`);
    } catch (error) {
      console.error("Error deleting site: ", error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredSites = sites.filter(site =>
    site.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
  <div>
    <Navbar handleSearch={handleSearch}/>
    
<div className='dashboard'>

<h1>My apps dashboard</h1>
 

<button className='btn-add-site' onClick={addSite}>Add site</button>
</div>
{showPopUp && <PopUp closetPopUp={closetPopUp}/>}
<hr />


<div className='site-list'>
        {filteredSites.map(site => (
          <div key={site.id} className='site-container'>
            <a href={site.url} target="_blank" rel="noopener noreferrer">
              <div className='site'>
                <div className='iniciales'>
                  <p>{site.name.slice(0, 2)}</p>
                </div>
                <p>{site.name}</p>
              </div>
            </a>
            <div className='menu'>
              <button onClick={() => handleMenuClick(site.id)} className='menu-button'>
                &#x22EE; {/* Tres puntos verticales */}
              </button>
              {activeMenu === site.id && (
                <div className='menu-options'>
                  <button onClick={() => handleDelete(site.id)}>delete</button>
                
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


// pop up login

const PopUp = ({ closetPopUp }) => {
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    option: ''
  });

  const handleSubmit = async(event) => {
    event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada
    try {
      const docRef = await addDoc(collection(db, "sites"), formData);
      console.log("Document written with ID: ", docRef.id);
      
      // Puedes agregar aquí cualquier acción adicional después de guardar los datos, como cerrar el popup
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "tu web hacido guardada",
        showConfirmButton: false,
        timer: 1500
      });
      
    
      closetPopUp()
    
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
    
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })

  };



  return (
    <div className='form-container'>
      <form className='form' onSubmit={handleSubmit}>
        <button className='btn-closet-Pop' type='button' onClick={closetPopUp}>X</button>
        <h2>Add a site</h2>
        <label>
          Name <br />
          <input
            type="text"
            className='inputs'
            name='name'
            placeholder='Nombre del sitio'
            value={formData.name}
            onChange={handleChange}
            required

          />
        </label><br />
        <label>
          Add URL <br />
          <input
            type="url"
            className='inputs'
            name='url'
            placeholder='https://example.com'
            value={formData.url}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Add to collection (optional) <br />
          <select
            id="options"
            name="option"
            value={formData.option}
            onChange={handleChange}
          >
            <option value="">Selecciona una opción</option>
            <option value="option1">Opción 1</option>
            <option value="option2">Opción 2</option>
            <option value="option3">Opción 3</option>
            <option value="option4">Opción 4</option>
          </select>
        </label>
        <br />
        <button className='btn-add-site' type='submit'>Enviar</button>
      </form>
    </div>
  );
}

export default App
