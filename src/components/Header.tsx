import Image from 'next/image';

import logo from '../../public/logo.svg';

import '@/styles/_header.scss';

const Header = () => {
  return (
    <header className="header">
      <Image src={logo} alt="FocalPoint" width={150} height={0} sizes="" />
      <h1>Bem-vindo de volta, Marcus</h1>
      <p>Segunda, 01 de dezembro de 2025</p>
    </header>
  );
};

export default Header;
