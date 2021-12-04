import { ImageProps } from './Images';

interface MemberProps {
  name: string;
  login: string;
  avatar: string | null;
}

interface WorksMemberProps {
  responsibility:
    | 'Coordenador'
    | 'Colaborador'
    | 'Orientador'
    | 'Membro/Líder'
    | 'Membro';
  memberData: MemberProps;
}

interface CategoryProps {
  router: string;
  name: string;
  description: string | null;
}

interface PartnerProps {
  id: number;
  name: string;
  logoUrl: string | null;
  linkPage: string | null;
}

interface IWorksFilters {
  id: string;
  name: string;
  description?: string;
}

export interface WorkListProps {
  slug: string;
  id: number;
  title: string;
  objective: string;
  abstractCard: string | null;
  categories: CategoryProps[];
  types: IWorksFilters[];
  areaExpertise: IWorksFilters[];
  worksMember: WorksMemberProps[];
  partners: PartnerProps[];
  startDate: Date;
  endDate: Date;
  pictures: ImageProps[];
  urlGithub?: string;
}
