
import { useAuth } from '../store/AuthContext';

import Footer from '../components/Footer';
import Carousal from '../components/Carousal';
import HeroSection from '../components/HeroSection.jsx';
import { Shoes } from '../components/Shoes';





function Home() {



  const {user}=useAuth()

  return (
    <>
  
    {/* hero seection */}
    <HeroSection/>
    <Shoes/>
    <header className='px-5 py-5  '>
   
    <main>

    {
        user?<h1 className='text-white'>Welcome {user.username}</h1>:<h1 className='text-white'>Guest login</h1>
      }
      <h1>Welcome to the Home Page</h1>

      <section>

      {/* Carousal Section */}
      <section className='my-3 mx-5'>
        <Carousal/>
        </section>
      
      </section>



  </main>
  {/* main-end */}
  </header>
    {/* Footer section */}
      <footer >
        <Footer/>
      </footer>

    </>
  );
}

export default Home;
