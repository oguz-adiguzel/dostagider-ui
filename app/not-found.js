import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center'>
      {/* <img className='w-96' src="dostagider-logo.png" /> */}
      <div className='flex items-center space-x-2 mt-10'>
        <img className='w-52' src="/404.svg" />
        <img className='w-52' src="/404-2.svg" />
        <img className='w-52' src="/404.svg" />
      </div>
      <p className='text-5xl font-semibold mt-6'>Aradığın Sayfayı Bulamadık :(</p>
      <a className='mt-10 bg-orange-400 px-10 py-3 text-white rounded-full font-semibold' href="/">Anasayfaya Dön</a>
    </div>
  )
}