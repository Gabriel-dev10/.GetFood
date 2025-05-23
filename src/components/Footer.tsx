import React from 'react'

const Footer = () => {
  return (
        <footer className="bg-blue-500 text-white text-sm mt-8 py-3 px-4 rounded-t-xl">
            <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row justify-between items-center">
            <div className="text-center sm:text-left mb-2 sm:mb-0">
                <p>&copy; {new Date().getFullYear()}.GetFood</p>
                <p className="text-gray-400 text-xs">Solução rápida para seu restaurante</p>
            </div>
            <div className="flex space-x-4 text-gray-400 text-xs">
                <a href="#" className="hover:text-white">Política de Privacidade</a>
                <a href="#" className="hover:text-white">Termos de Uso</a>
                <a href="#" className="hover:text-white">Contato</a>
            </div>
            </div>
        </footer>
  )
}

export default Footer