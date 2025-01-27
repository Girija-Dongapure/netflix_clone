import React from 'react'

function Footer() {
  return (
    <footer className='py-6 md:px-8 md:py-0 bg-black text-white border-t border-gray-800'>
        <div className='flex flex-col items-center justify-between gap-4 md:h-14 md:flex-row'>
            <p className='text-center text-balance leading-loose text-sm text-muted-foreground md:text-left'>
                Built by{" "}
                <a href="https://github.com/Girija-Dongapure" className='font-medium underline underline-offset-4' target="_blank">
                    Girija
                </a>
                . The source code is available on{" "}
                <a href="https://github.com/Girija-Dongapure/netflix_clone/tree/master" className='font-medium underline underline-offset-4' target="_blank">
                    Github
                </a>
                .
            </p>
        </div>
    </footer>
  )
}

export default Footer
