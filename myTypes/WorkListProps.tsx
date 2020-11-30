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
  partners: PartnerProps[];
  dateBegin: Date;
  pictures: ImageProps[];
  urlGithub?: string;
}
