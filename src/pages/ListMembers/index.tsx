import React, { useState, useEffect, useCallback } from 'react';

import { Link } from 'react-router-dom';
import { FaMedal, FaChevronRight, FaMailBulk } from 'react-icons/fa';

import { OptionTypeBase } from 'react-select';
import { MdKeyboardArrowDown, MdKeyboardArrowLeft } from 'react-icons/md';
import api from '../../services/api';

import imgMemberDefault from '../../assets/imgDefault/member.jpg';
//
import { ImageProps } from '../../../myTypes/Images';
import {} from '../../utils/orderArray';

import { Main, Projects, Section } from './style';
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';

export const listOrder = [
  { value: 0, description: null, label: 'A-Z' },
  { value: 1, description: null, label: 'Z-A' },
  { value: 2, description: null, label: 'Recentes' },
  { value: 3, description: null, label: 'Antigas' },
];

interface MembersListProps {
  id: number;
  login: string;
  name: string;
  email: string;
  description: string;
  avatar?: ImageProps;
}

interface OfficesProps extends OptionTypeBase {
  isOpen?: boolean;
  description: string | null;
  members: MembersListProps[];
}

const ListProjects: React.FC = () => {
  const [offices, setOffices] = useState<OfficesProps[]>([]);

  const handleOffice = useCallback(
    (index) => {
      const office = offices[index];

      office.isOpen = !office.isOpen;
      setOffices([...offices, (offices[index] = office)]);
      setOffices(offices.filter((_, i) => i !== offices.length));
    },
    [offices],
  );

  // Functions for get list works
  useEffect(() => {
    api.get(`members/`).then((response) => {
      setOffices(response.data);
    });
  }, []);

  return (
    <>
      <Header title="LAMIA - Projetos" />

      <NavBar page="members" />

      <Main>
        {offices.map((office, index) => (
          <Section
            key={office.value}
            isOpen={!!office.isOpen}
            height={office.members.length}
          >
            <header onClick={() => handleOffice(index)}>
              <div>
                <FaMedal size={28} />
                <h2>{office.label}</h2>
                <div className="bar" />
                {office.isOpen ? (
                  <MdKeyboardArrowDown size={28} />
                ) : (
                  <MdKeyboardArrowLeft size={28} />
                )}
              </div>
              <p>{office.description}</p>
            </header>
            <Projects>
              {office.members.map((member) => (
                <Link to={`/${member.login}`}>
                  <img
                    src={member.avatar ? member.avatar.src : imgMemberDefault}
                    alt={member.name}
                  />

                  <strong>
                    {member.name}
                    <span>
                      <FaMailBulk size={14} />
                      {member.email}
                    </span>
                  </strong>
                  <p>{member.description}</p>
                  <div>
                    <FaChevronRight size={20} />
                  </div>
                </Link>
              ))}
            </Projects>
          </Section>
        ))}
      </Main>

      <Footer />
    </>
  );
};

export default ListProjects;
