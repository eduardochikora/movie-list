import LogoIcon from '../components/LogoIcon'

function Header() {
  return (
    <header className='flex items-center bg-slate-900 p-4 pl-7 gap-4 border-b border-white/10'>
        <LogoIcon/>
        <h1 className='text-white font-bold text-[26px] tracking-wide'>
            Movie<span className='text-blue-400'>List.</span>
        </h1>
    </header>
  )
}

export default Header

