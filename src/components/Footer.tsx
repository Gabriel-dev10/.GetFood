import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-white text-white text-sm mt-30 py-3 px-4 rounded-xl">
      <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="text-center sm:text-left mb-2 sm:mb-0">
          <p className="text-black">&copy; {new Date().getFullYear()}. GetFood</p>
          <p className="text-black text-xs">Solução rápida para seu restaurante</p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex space-x-4 text-black text-xs">
            <a href="#" className="hover:text-gray-600">Política de Privacidade</a>
            <a href="#" className="hover:text-gray-600">Termos de Uso</a>
            <a href="#" className="hover:text-gray-600">Contato</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
