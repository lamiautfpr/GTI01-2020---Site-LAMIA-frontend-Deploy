import React, { useCallback, useEffect, useState } from 'react';
import { FaChevronRight, FaListUl, FaRegClipboard } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { WorkListProps } from '../../../../myTypes/WorkListProps';
import imgWorkDefault from '../../../assets/imgDefault/work1.png';
import emojiSad from '../../../assets/imgWarning/emojiSad.png';
import Footer from '../../../components/Footer';
import Header from '../../../components/Header';
import NavBar from '../../../components/NavBar';
import SelectBox from '../../../components/SelectBox';
import Separator from '../../../components/Separator';
import { newApi } from '../../../services/api';
import { CardWarning } from '../../Home/style';
import { Main, Projects, SectionFilters } from '../style';

interface ISelectItem {
  value: string;
  label: string;
  description: string | null;
}

interface IWorksFilters {
  id: string;
  name: string;
  description?: string;
}

interface ICategoryProps extends IWorksFilters {
  types: ISelectItem[];
}

const page = 'Produtos';

const List: React.FC = () => {
  // database
  const [allWorks, setAllWorks] = useState<WorkListProps[]>([]);
  const [works, setWorks] = useState<WorkListProps[]>([]);

  const [category, setCategory] = useState<ICategoryProps>(
    {} as ICategoryProps,
  );
  const [areas, setAreas] = useState<ISelectItem[]>([
    {
      value: 'all',
      label: 'Todas',
      description: null,
    },
  ]);

  // filters
  const [areaSelected, setAreaSelected] = useState<ISelectItem>(
    {} as ISelectItem,
  );
  const [typeSelected, setTypeSelected] = useState<ISelectItem[]>([]);

  // Functions for list works
  const changeWorkList = useCallback(
    (area: ISelectItem, types: ISelectItem[]): void => {
      if (!area.value) {
        const defaultArea: ISelectItem = {
          value: 'all',
          label: 'Todas',
          description: null,
        };
        // eslint-disable-next-line no-param-reassign
        area = defaultArea;
        setAreaSelected(area);
      }

      if (area.value === 'all' && types.length < 1) {
        // there is no filter
        setWorks(allWorks);
      } else if (area.value === 'all' && types) {
        // only type filter exists
        setWorks(
          allWorks.filter((work) => {
            return work.types.some((t) =>
              types.some((tSelected) => tSelected.value === t.id),
            );
          }),
        );
      } else if (area.value !== 'all' && types.length < 1) {
        // only area filter exists
        setWorks(
          allWorks.filter((work) => {
            return work.areaExpertise.some((a) => a.id === area.value);
          }),
        );
      } else {
        // All filter exists
        setWorks(
          allWorks
            .filter((work) => {
              // Filter Area
              return work.areaExpertise.some((a) => a.id === area.value);
            })
            .filter((work) => {
              // Filter TypesWorks
              return work.types.some((t) =>
                types.some((tSelected) => tSelected.value === t.id),
              );
            }),
        );
      }
    },
    [allWorks],
  );

  const setTypeWorks = useCallback(
    (itemsSelected: ISelectItem[]): void => {
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
    (item: ISelectItem): void => {
      setAreaSelected(item);
      changeWorkList(item, typeSelected);
    },
    [changeWorkList, typeSelected],
  );

  // Functions for get list works
  useEffect(() => {
    newApi.get(`works/categories/${page}`).then((response) => {
      setCategory(response.data);
      setAllWorks(response.data.works);
      setWorks(response.data.works);
    });

    newApi.get(`works/types`).then((response) => {
      setCategory((oldCategory) => {
        const newCategory = {
          ...oldCategory,
          types: response.data.map((type) => ({
            value: type.id,
            label: type.name,
            description: type?.description,
          })),
        };

        return newCategory;
      });
    });

    newApi.get(`works/areas-expertise`).then((response) => {
      const defaultArea: ISelectItem = {
        value: 'all',
        label: 'Todas',
        description: null,
      };

      setAreas([
        ...response.data.map((expertiseArea) => ({
          value: expertiseArea.id,
          label: expertiseArea.name,
          description: expertiseArea.description,
        })),
        defaultArea,
      ]);
    });
  }, []);

  return (
    <>
      <Header title={`LAMIA - ${page}`} />

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
          {works.length === 0 && (
            <CardWarning>
              <h1>Nenhum {page} foi encontrado</h1>
              <img src={emojiSad} alt="Nós estamos tristes" />
            </CardWarning>
          )}
          {works.map((work) => (
            <Link key={work.id} to={`/work/${work.slug}`}>
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
                  <span>{work.startDate}</span>
                </strong>
                <div>
                  <div>
                    <span>
                      <FaRegClipboard size={14} />
                      {work.types.map((type) => (
                        <span key={type.id}>{`${type.name}; `}</span>
                      ))}
                    </span>
                    <span>
                      <FaListUl size={14} />
                      {work.areaExpertise.map((ae) => (
                        <span key={ae.id}>{`${ae.name}; `}</span>
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
