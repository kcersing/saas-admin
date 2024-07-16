import defaultSettings from '@/settings.json';
import { IRoute, routes } from './routes';

export interface GlobalState {
  settings?: typeof defaultSettings;
  userInfo?: {
    id?: number;
    name?: string;
    avatar?: string;
    job?: number;
    jobName?: string;
    organization?: number;
    organizationName?: string;
    location?: string;
    email?: string;
    roleID?: number;
    roleName?: string;
    roleValue?: string;
    defaultVenueId?: number;
    permissions: Record<string, string[]>;
  };
  userLoading?: boolean;
  userMenu?:IRoute[];
}

export const initialState: GlobalState = {
  settings: defaultSettings,
  userInfo: {
    permissions: {},
  },
  userMenu: routes ,
};