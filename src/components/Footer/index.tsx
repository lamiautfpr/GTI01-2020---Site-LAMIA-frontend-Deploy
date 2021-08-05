import React from 'react';

import {
  FaGithubAlt,
  FaFacebook,
  FaStreetView,
  FaPhoneAlt,
  FaMailBulk,
  FaCopyright,
  FaQuoteLeft,
  FaInstagram,
  FaTwitter,
} from 'react-icons/fa';

import { Contact } from './style';

const Footer: React.FC = () => {
  return (
    <Contact>
      <div>
        <section className="quote">
          <FaQuoteLeft color="#f8f8ff" size={20} />
          <p>
            A imaginação é mais importante que a ciência, porque a ciência é
            limitada, ao passo que a imaginação abrange o mundo inteiro.
            <strong>Albert Einstein</strong>
          </p>
          <p>
            Se você não está fazendo da vida de alguém algo melhor, você está
            desperdiçando o seu tempo. Sua vida será melhor quando você fazer da
            vida de outras pessoas algo melhor.
            <strong>Will Smith</strong>
          </p>
        </section>
        <section>
          <h2>Contato</h2>
          <span>
            <FaPhoneAlt size={16} />
            <strong>Telefone: </strong>
              (45) 99835-7976</span>
            <span>
            <FaStreetView size={24} />
            <strong>Endereço: </strong>
            Prolongamento da Rua Cerejeira, s/n Bairro - São Luiz, Santa Helena
            - PR, 85892-000
          </span>
          <span>
            <FaMailBulk size={16} />
            <strong>Email: </strong>
            <a href="mailto:lamia-sh@utfpr.edu.br">lamia-sh@utfpr.edu.br</a>
          </span>
          <ul>
            <li>
              <a href="https://www.instagram.com/lamiautfpr/" target="blank">
                <FaInstagram size={32} />
              </a>
            </li>
            <li>
              <a href="https://twitter.com/lamiautfpr" target="blank">
                <FaTwitter size={32} />
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/lamiautfpr2" target="blank">
                <FaFacebook size={32} />
              </a>
            </li>
            <li>
              <a href="https://github.com/lamiautfpr" target="blank">
                <FaGithubAlt size={32} />
              </a>
            </li>
          </ul>
        </section>
      </div>
      <p>
        Jecé Xavier & Rafael Lechensque
        <FaCopyright size={20} />
        LAMIA 2020
      </p>
    </Contact>
  );
};

export default Footer;
