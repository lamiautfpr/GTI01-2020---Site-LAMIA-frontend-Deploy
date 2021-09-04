import React, { useCallback, useEffect, useState } from 'react';
import { FaChevronRight, FaListUl, FaRegClipboard } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { SelectItem } from '../../../../myTypes/SelectItem';
import { WorkListProps } from '../../../../myTypes/WorkListProps';
import imgWorkDefault from '../../../assets/imgDefault/work1.png';
import Footer from '../../../components/Footer';
import Header from '../../../components/Header';
import NavBar from '../../../components/NavBar';
import SelectBox from '../../../components/SelectBox';
import Separator from '../../../components/Separator';
import api from '../../../services/api';
import { Main, Projects, SectionFilters } from '../style';

interface CategoryProps {
  name: string;
  description: string | null;
  types: SelectItem[];
}

const page = 'Produtos';

const List: React.FC = () => {
  // database
  const [allWorks, setAllWorks] = useState<WorkListProps[]>([]);
  const [works, setWorks] = useState<WorkListProps[]>([]);

  const [category, setCategory] = useState<CategoryProps>({} as CategoryProps);
  const [areas, setAreas] = useState<SelectItem[]>([
    {
      value: 0,
      label: 'Todas',
      description: null,
    },
  ]);

  // filters
  const [areaSelected, setAreaSelected] = useState<SelectItem>(
    {} as SelectItem,
  );
  const [typeSelected, setTypeSelected] = useState<SelectItem[]>([]);

  // Functions for list works
  const changeWorkList = useCallback(
    (area: SelectItem, types: SelectItem[]): void => {
      if (!area.value) {
        const defaultArea: SelectItem = {
          value: 0,
          label: 'Todas',
          description: null,
        };
        // eslint-disable-next-line no-param-reassign
        area = defaultArea;
        setAreaSelected(area);
      }

      if (area.value === 0 && types.length < 1) {
        // there is no filter
        setWorks(allWorks);
      } else if (area.value === 0 && types) {
        // only type filter exists
        setWorks(
          allWorks.filter((work) => {
            return work.types.some((t) =>
              types.some((tSelected) => tSelected.value === t.value),
            );
          }),
        );
      } else if (area.value !== 0 && types.length < 1) {
        // only area filter exists
        setWorks(
          allWorks.filter((work) => {
            return work.areaExpertise.some((a) => a.value === area.value);
          }),
        );
      } else {
        // All filter exists
        setWorks(
          allWorks
            .filter((work) => {
              // Filter Area
              return work.areaExpertise.some((a) => a.value === area.value);
            })
            .filter((work) => {
              // Filter TypesWorks
              return work.types.some((t) =>
                types.some((tSelected) => tSelected.value === t.value),
              );
            }),
        );
      }
    },
    [allWorks],
  );

  const setTypeWorks = useCallback(
    (itemsSelected: SelectItem[]): void => {
      if (!itemsSelected || itemsSelected.length < 1) {
        setTypeSelected([]);
        changeWorkList(areaSelected, []);
      } else {
        setTypeSelected(itemsSelected);
        changeWorkList(areaSelected, itemsSelected);
      }
    },
    [areaSelected, changeWorkList],
  );

  const setAreaExpensive = useCallback(
    (item: SelectItem): void => {
      setAreaSelected(item);
      changeWorkList(item, typeSelected);
    },
    [changeWorkList, typeSelected],
  );

  // Functions for get list works
  useEffect(() => {
    api.get(`category-works/${page}`).then((response) => {
      setCategory(response.data);
      setAllWorks(response.data.works);
      setWorks(response.data.works);
    });

    api.get(`area-expertises`).then((response) => {
      const defaultArea: SelectItem = {
        value: 0,
        label: 'Todas',
        description: null,
      };

      setAreas([...response.data.concat(defaultArea)]);
    });
  }, []);

  return (
    <>
      <Header title="LAMIA - Projetos" />

      <NavBar page="products" />

      <Main>
        <SectionFilters name="">
          <div className="areaExpensive">
            <SelectBox
              label="Áreas de Pesquisa"
              options={areas}
              placeholder="Selecione..."
              width={250}
              onChange={setAreaExpensive}
              defaultValue={areas[0]}
            />
          </div>
          <div className="typeWorks">
            <SelectBox
              label={`${page}`}
              options={category.types}
              placeholder="Selecione..."
              width={550}
              isMulti
              onChange={setTypeWorks}
              defaultValue={null}
            />
          </div>
        </SectionFilters>

        <Separator />

        <Projects>
          {works.map((work) => (
            <Link key={work.id} to={`/work/${work.id}`}>
              <img
                src={
                  work.pictures?.length > 0
                    ? work.pictures[0].src
                    : imgWorkDefault
                }
                alt={
                  work.pictures?.length > 0
                    ? work.pictures[0].name
                    : 'Capa do Projeto'
                }
              />
              <div>
                <strong>
                  {work.title}
                  <span>{work.dateBegin}</span>
                </strong>
                <div>
                  <div>
                    <span>
                      <FaRegClipboard size={14} />
                      {work.types.map((type) => (
                        <span key={type.value}>{`${type.label}; `}</span>
                      ))}
                    </span>
                    <span>
                      <FaListUl size={14} />
                      {work.areaExpertise.map((ae) => (
                        <span key={ae.value}>{`${ae.label}; `}</span>
                      ))}
                    </span>
                  </div>
                  <p>
                    {work?.objective?.length <= 160
                      ? work?.objective
                      : `${work?.objective?.substr(0, 160)}...`}
                  </p>
                  <FaChevronRight size={20} />
                </div>
              </div>
            </Link>
          ))}
        </Projects>
      </Main>

      <Footer />
    </>
  );
};

export default List;
