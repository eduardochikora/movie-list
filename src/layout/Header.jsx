import LogoIcon from '../components/LogoIcon'

function Header() {
  return (
    <header className='flex items-center bg-slate-900 p-4 md:pl-7 gap-3.5 border-b border-white/15'>
        <LogoIcon/>
        <h1 className='text-white font-bold text-[23px] tracking-wide'>
            Movie<span className='text-blue-400'>List.</span>
        </h1>
    </header>
  )
}

export default Header

