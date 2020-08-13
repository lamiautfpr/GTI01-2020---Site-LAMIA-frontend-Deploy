import { SelectItem } from './SelectItem';
import { ImageProps } from './Images';

interface MemberProps {
  name: string;
  login: string;
  avatar: ImageProps | null;
}

interface WorksMemberProps {
  responsibility:
    | 'Coordenador'
    | 'Colaborador'
    | 'Orientador'
    | 'Membro Líder'
    | 'Membro';
  memberData: MemberProps;
}

interface CategoryProps {
  router: string;
  name: string;
  description: string | null;
}

interface PatnerProps {
  id: number;
  name: string;
  logo: string;
  link_page: string;
}

export interface WorkListProps {
  id: number;
  title: string;
  objective: string | null;
  abstract: string | null;
  abstractCard: string | null;
  categories: CategoryProps[];
  types: SelectItem[];
  areaExpertise: SelectItem[];
  worksMember: WorksMemberProps[];
  partner: PatnerProps | null;
  dateBegin: Date;
  pictures: ImageProps[];
  urlGithub?: string;
}
