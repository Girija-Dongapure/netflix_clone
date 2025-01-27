import { LogOut, Menu, Search } from 'lucide-react';
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/authUser';
import { useContentStore } from '../store/content';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuthStore()
  const { setContentType } = useContentStore()

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)
  return (
    <header className='max-w-6xl mx-auto flex flex-wrap items-center justify-between h-20 p-4'>
      <div className='flex items-center gap-10 z-50'>
        <Link to="/">
          <img src="/netflix-logo.png" alt="Logo" className='w-32 sm:w-40' />
        </Link>

        {/* desktop navbar items */}
        <div className='hidden sm:flex gap-2 items-center'>
          <Link to="/" className='hover:underline' onClick={() => setContentType("movie")}>Movies</Link>
          <Link to="/" className='hover:underline' onClick={() => setContentType("tv")}>Tv Shows</Link>
          <Link to="/history" className='hover:underline'>Seach History</Link>
        </div>

      </div>
      <div className='flex items-center z-50 gap-2'>
        <Link to={"/search"}>
          <Search className='size-6 cursor-pointer' />
        </Link>
        <img src={user.image} alt="avatar" className='h-8 rounded cursor-pointer' />
        <LogOut className='size-6 cursor-pointer' onClick={logout} />
        <div className='sm:hidden'>
          <Menu className='size-6 cursor-pointer' onClick={toggleMobileMenu} />
        </div>
      </div>
      {/* mobile navbar items */}
      {isMobileMenuOpen &&
        <div className='block flex flex-col sm:hidden w-full mt-4 z-50 bg-black rounded border border-gray-800 p-2'>
          <Link to="/" className='hover:underline w-auto' onClick={toggleMobileMenu}>Movies</Link>
          <Link to="/" className='hover:underline' onClick={toggleMobileMenu}>Tv Shows</Link>
          <Link to="/history" className='hover:underline' onClick={toggleMobileMenu}>Seach History</Link>
        </div>}

    </header>
  )
}

export default Navbar
