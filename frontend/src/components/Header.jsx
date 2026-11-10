import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowRight, Menu, X } from 'lucide-react'
export default function Header(){
 const [open,setOpen]=useState(false)
 const location=useLocation()
 const links=[['#planos','Planos'],['#operadoras','Operadoras'],['#diferenciais','Diferenciais'],['#como-funciona','Como funciona']]
 return <header className="header"><div className="container nav-inner"><Link to="/" className="brand" aria-label="IW Corretora - início" onClick={()=>setOpen(false)}><img src="/assets/logo-iw-white.svg" alt="IW Corretora Planos de Saúde"/></Link>
  <nav className={`main-nav ${open?'is-open':''}`} aria-label="Navegação principal"><Link to="/" onClick={()=>setOpen(false)}>Início</Link>{links.map(([anchor,label])=><a key={anchor} href={`${location.pathname==='/'?'': '/'}${anchor}`} onClick={()=>setOpen(false)}>{label}</a>)}<a className="nav-mobile-cta" href="/#cotacao" onClick={()=>setOpen(false)}>Solicitar cotação</a></nav>
  <a className="btn btn-gold nav-cta" href="/#cotacao">Solicitar cotação <ArrowRight size={16}/></a><button className="nav-toggle" aria-label={open?'Fechar menu':'Abrir menu'} aria-expanded={open} onClick={()=>setOpen(v=>!v)}>{open?<X/>:<Menu/>}</button>
 </div></header>
}
